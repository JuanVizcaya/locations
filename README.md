# Locations

This is a full project which has react in the *frontend*, *django/django_restframework* in the backend and It uses a *postgres/postgis* database.

<div id='id0'/>

## Index

[1.](#id1) __Instalation__
  - [Requirements](#id11)
  - [Quick start](#id12)

[2.](#id2) __Backend__
  - [Django Admin Panel](#id21)
  - [Locations Endpoint](#id22)
  - [Media Type](#id22)


[3.-](#id3) __Frontend__
  - [Url](#id31)

[4.-](#id4) __Containers__
  - [postgis_db](#id41)
  - [django_locs](#id42)
  - [react_app](#id42)


<div id='id1' />

## Instalation

<div id='id11' />

#### Requirements
- Docker

<div id='id12' />

#### Quick start

- Clone the project:

`git clone https://github.com/JuanVizcaya/locations.git`

- Enter to the "locations" path:

`cd locations`

- Build the containers:

`docker-compose up --build`

- Make the needed django migrations:

`docker exec -it django_locs sh -c "python /back-app/manage.py makemigrations"`

`docker exec -it django_locs sh -c "python /back-app/manage.py makemigrations api"`

`docker exec -it django_locs sh -c "python /back-app/manage.py migrate"`

- Create the __Superuser__ for the __Django Administration Panel__:

`docker exec -it django_locs sh -c "python /back-app/manage.py createsuperuser"`

- __Load data__ to the __Postgis Database__:

`docker exec -it django_locs sh -c "python /back-app/data/load_data.py"`

[Back to index](#id0)

<div id='id2' />

## Backend

<div id='id21' />

### Django Administration Panel
You can access to the administration panel with the __Superuser__ credentials that you have already created.
`URL: http://localhost:5001/`

<div id='id22' />

#### Locations Endpoint
You can make requests to the __Locations API__, even with your browser.

`URL: http://localhost:5001/api/locations/`

<div id='id23' />

##### Media Type
- `application/json`

<div id='id24' />

##### Methods

`GET: http://localhost:5001/api/locations/`

*Response:*
```
[
{
    "id": 1,
    "geometry": "SRID=4326;POINT (-103.40223397 25.53813876)",
    "tipo": "Sucursal",
    "latitude": "25.53813876",
    "longitude": "-103.40223397",
    "color": "11A579"
},
{
    "id": 2,
    "geometry": "SRID=4326;POINT (-103.43411379 25.55083543)",
    "tipo": "Sucursal",
    "latitude": "25.55083543",
    "longitude": "-103.43411379",
    "color": "11A579"
},

...

{
    "id": 499,
    "geometry": "SRID=4326;POINT (-100.80625621 20.53657222)",
    "tipo": "Sucursal",
    "latitude": "20.53657222",
    "longitude": "-100.80625621",
    "color": "11A579"
},
{
    "id": 500,
    "geometry": "SRID=4326;POINT (-101.42308383 20.93452578)",
    "tipo": "Sucursal",
    "latitude": "20.93452578",
    "longitude": "-101.42308383",
    "color": "11A579"
}
]
```

***

`POST: http://localhost:5001/api/locations/`

`body: JSON`
```
{
    "tipo": "Sucursal",
    "latitude": "19.420449",
    "longitude": "-99.172991",
    "color": "11A579"
}
```

*Response:*
```
{
    "id": 501,
    "geometry": "SRID=4326;POINT (-99.172991 19.420449)",
    "tipo": "Sucursal",
    "latitude": "19.420449",
    "longitude": "-99.172991",
    "color": "11A579"
}
```

[Back to index](#id0)


<div id='id3' />

## Frontend

<div id='id31' />

#### URL

`http://localhost:3000/`

[Back to index](#id0)

***

<div id='id4' />

## Containers

<div id='id41' />

#### postgis_db
- Name: `postgis_db`

- Port: `5432`

<div id='id41' />

#### django_locs
- Name: `django_locs`

- Port: `5001`

- Depends on: `postgis_db`

#### react_app
- Name: `react_app`

- Port: `3000`

- Depends on: `django_locs`