# Locations

This is a full project which has *react* in the *frontend*, *django/django_restframework* in the backend and It uses a *postgres/postgis* database.

<div id='id0'/>

## Index

[1.](#id1) __Installation__
  - [Requirements](#id11)
  - [Quick start](#id12)

[2.](#id2) __Backend__
  - [Django Admin Panel](#id21)
  - [Locations Endpoint](#id22)
  - [Media Type](#id23)
  - [Methods](#id24)


[3.-](#id3) __Frontend__
  - [Url](#id31)

[4.-](#id4) __Containers__
  - [postgis_db](#id41)
  - [django_locs](#id42)
  - [react_app](#id42)


<div id='id1' />

## Installation

<div id='id11' />

#### Requirements
- Docker

<div id='id12' />

#### Quick start

- Clone the project:

`git clone https://github.com/JuanVizcaya/locations.git`

- Enter to the "locations" path:

`cd locations`

- Build the containers (Wait for django_locs):

`docker-compose up --build`

```
django_locs    | Run 'python manage.py migrate' to apply them.
django_locs    | February 15, 2021 - 07:46:59
django_locs    | Django version 3.1.6, using settings 'prj.settings'
django_locs    | Starting development server at http://0:5001/
django_locs    | Quit the server with CONTROL-C.
```

- Make needed django migrations:

`docker exec -it django_locs sh -c "python /back-app/manage.py makemigrations"`

`docker exec -it django_locs sh -c "python /back-app/manage.py makemigrations locations"`

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
You can access to the administration panel with the __Superuser__ credentials you have already created.

`URL: http://localhost:5001/admin`

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

- Port: `5434`

<div id='id41' />

#### django_locs
- Name: `django_locs`

- Port: `5001`

- Depends on: `postgis_db`

#### react_app
- Name: `react_app`

- Port: `3000`

- Depends on: `django_locs`
