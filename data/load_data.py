from sqlalchemy import create_engine
from geoalchemy2 import Geometry, WKTElement
import pandas as pd
import geopandas as gpd


def load_data_to_postgis():
    srid = 4326

    gdf = gpd.GeoDataFrame(pd.read_csv('puntos_examen_fullstack.csv'))

    gdf['geometry'] = gpd.points_from_xy(gdf.longitude, gdf.latitide, crs='EPSG:4326')
    gdf = gdf.set_crs(epsg=srid)
    gdf.pop('the_geom')

    gdf['id'] = gdf['cartodb_id']
    gdf.pop('cartodb_id')


    engine = create_engine('postgresql://postgres:postgres@localhost:5432/postgres')
    gdf.to_postgis('locations_location', engine, if_exists='append', index=False)
    print('====== DATA LOADED ======')


if __name__ == '__main__':
    load_data_to_postgis()