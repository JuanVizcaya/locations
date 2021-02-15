import React, { useRef, useEffect } from 'react';
import * as L from 'leaflet';
import carto from '@carto/carto.js';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { getAllPoints, getAddress } from '../Utils/ApiUils';
import './Map.css';

function Map (props) {
  const {
    lat,
    lng,
    zoom,
    basemapURL,
    requestPoint,
  } = props;

  let username = '';
  let apiKey = '';
  let tableName = '';
  if (process && process.env) {
    if(process.envREACT_APP_USERNAME) {
      username = process.env.REACT_APP_USERNAME;
    }
    if(process.REACT_APP_API_KEY) {
      apiKey = process.env.REACT_APP_API_KEY;
    }
    if(process.REACT_APP_TABLE_NAME) {
      tableName = process.env.REACT_APP_TABLE_NAME;
    }
  }

  const map = useRef({});

  requestPoint.current = async () => {
    const pointsLayer = await createPointsLayer(username, apiKey, tableName);
    const popup = L.popup({ closeButton: true });
    pointsLayer.addTo(map.current);

    pointsLayer.eachLayer(point => {
      point.on('click', async (e) => {
        onLocationClick(e, popup, map);
      });
    });
  };

  useEffect(() => {
    map.current = L.map('map', {
      center: [lat, lng],
      zoom,
      zoomControl: false
    });
    const basemap = L.tileLayer(basemapURL, {
      detectRetina: true,
      retina: '@2x',
    });
    basemap.addTo(map.current)

  }, [
    lat,
    lng,
    zoom,
    basemapURL,
  ]);
  return (
    <div id="map"/>
  );
}

async function onLocationClick(e, popup, map) {
  let htmlContent;
  await getAddress(e.latlng.lat, e.latlng.lng)
    .then((res) => {
      if (res.PlaceName) {
        e.direction = res.LongLabel;
      } else if (res.ShortLabel){
        e.direction = res.ShortLabel;
      } else {
        e.direction = res.Address;
      }
      htmlContent = makeMarkupOnePoint(e.latlng.lat, e.latlng.lng, e.direction);
      popup.setContent(htmlContent);
      popup.setLatLng(e.latlng);
      map.current.flyTo([e.latlng.lat, e.latlng.lng],
        13,
        {
          animate: true,
          duration: 1.5
        });
    });
  // end block
  if (!popup.isOpen()) {
    popup.openOn(map.current);
  }
}

const createPointsLayer = async (user, key, tableName) => {
  let pointData;
  await getAllPoints(user, key, tableName).then(data=>pointData = data);

  const pointsArray = [];
  pointData.forEach(p=>{
    const circleMarker = L.circleMarker(p, {
      color: '#3388ff'
    }).setRadius(1);
    pointsArray.push(circleMarker);
  });

  return L.layerGroup(pointsArray);
};

function makeMarkupOnePoint(lat, lng, info = '') {
  return `
    <div class="widget">
    ${lat ? `
    <h3>${lat}, ${lng}</h3>
    `: ''}
    ${info ? `
    <h4>${info}</h4>
    `: '<h4>No hay dirección</h4>'}
    </div>
  `;
}

Map.propTypes = {
  basemapURL: PropTypes.string,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number,
  requestPoint: PropTypes.shape({
    current: PropTypes.func,
  })
};
Map.defaultProps = {
  zoom: 13,
  basemapURL: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png',
  requestPoint: {
    current: () => {},
  }
}

export default Map;

