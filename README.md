# COV-ID
## Binary Beasts

![Landing Page](/cov-id_landingpage.png)


FRONTEND
- [x] Screenshot of landing page
- [] link to deployed frontend app
- [x] link to backend repo
- [x] wireframes
- [x] user stories
- [x] explanation of frontend tech used
- [] general approach (a couple paragraphs)
- [x] installation instructions
- [] unsolved problems / major hurdles

[Backend Repo](https://github.com/SFX818/Team-6-backend)

# Wireframes
![Home](/Wireframes/Home.png)
![SignUp](/Wireframes/signup.png)
![LogIn](/Wireframes/login.png)
![Dashboard](/Wireframes/Dashboard.png)
![Search](/Wireframes/search.png)
![Results](/Wireframes/results.png)
![Details](/Wireframes/details.png)
![Admin](/Wireframes/Admin.png)
![UserDetail](/Wireframes/UserDetail.png)
![About](/Wireframes/about.png)
![NavBar](/Wireframes/NavBar.png)

## User Stories
- As a user, I would like to be able to search and save location searches to my dashboard
- As a user, I would like to see infection rates and number of cases
- As a user, I would like to see historical as well as current data
- As a user, I would like my search history to be preserved so I can reference it later
- As a user, I would like to see locations’ past history as well as their current information when I search

## Technology used
- React
- Materialize
- React Router
- Material Table
- Chart.js
- Mapbox
- disease.sh
- Google API
- axios
- swr

## Installation Instructions
- download and install backend repo
- create an admin user in the backend
- download frontend repo and run npm i to install all dependencies
- with backend running, npm start the app
- create an account (or login as your admin), and start searching locations

## General Approach
We wanted to create an app that would be simple to navigate and would provide users with Covid-19 trends in their selected areas. There were already Covid-19 APIs available, and we discussed how we as users would want that information displayed. We decided charts to show historical data and maps to show global data and a dashboard to save the locations that are most relevant to the user.

## Stretch Goals
- [] International/Non-US Locations
- [] Mapbox zooming in when a search term is provided
- [] Formatting the Mapbox points (by color and/or size) based on the infection/death rates

## Major Hurdles
Mapbox. Mapbox was our biggest hurdle. The biggest challenge was probably because the Covid-19 API has different endpoints depending on the level of data you're looking for, so the endpoint has to dynamically change depending on the search terms.

## Acknowledgements
We used the following tutorials to troubleshoot our Mapbox problems:
    - https://dev.to/alemesa/how-to-create-a-covid-19-map-with-mapbox-and-react-3jgf
    - https://dev.to/laney/react-mapbox-beginner-tutorial-2e35
    - https://dev.to/laney/mapbox-how-to-conditionally-style-features-based-on-covid-19-data-h78

And of course, thank you to our General Assembly instructors and IAs for the help and support (and many many office hours): Billie, Mateen, Khoury, and Fatima.
