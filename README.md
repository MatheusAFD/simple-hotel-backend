# simple-hotel-backend

## Entities

### City

- id
- name
- bannerUrl
- createdAt

### User

- id
- name
- phone
- bannerUrl
- createdAt

### Hotels -> User -> cities

- id
- userId
- cityId
- bannerUrl
- latitude
- longitude
- createdAt

### Tours -> cities

- id
- cityId
- title
- bannerUrl
- createdAt

### Restaurants -> city

- id
- cityId
- name
- bannerUrl
- latitude
- longitude
- createdAt

## Casos de uso

- Select cities
- Select hotels by city
- Select restaurants by city
- Create Hotel
- Connect to Hotel
