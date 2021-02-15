import axios from 'axios';

axios.defaults.headers.common.Accept = 'application/json';

// End Points
const API_URL = `http://localhost:5001/api/locations/`;
const GEOCODE_API = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode';

const fetch = (endpoint) => {
return axios
    .get(endpoint)
    .then((res) => res)
    .catch((err) => {
    console.error(
        'Error catch in Apiutils at fetch method. It will be thrown...');
    throw err;
    });
}

export const getAllPoints = (user = '', apiKey = '', table = '') => {
    const query = API_URL;
    // const query = `https://${user}.carto.com/api/v2/sql?api_key=${apiKey}&q=SELECT latitude, longitude FROM ${table}`;
    return fetch(query)
        .then(res=> {
            const data = [];
            res.data.forEach(point=>{
                data.push({lat: point.latitude, lng: point.longitude})
            });
            return data;
        });
};

export const getAddress = (lat, lng) => {
    // Get coordinates direction from the esri reverse-geocoder
    const geocode_api_url = `${GEOCODE_API}?location=${lng},${lat}&forStorage=false&f=json&countryCode=MEX&langCode=ES`;
    return fetch(geocode_api_url)
        .then(res => {
            console.log(res);
            return res.data.address;
        });
}
