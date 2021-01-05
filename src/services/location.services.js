import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'


//const API_URL =  process.env.API_URL_Search
const API_URL_SEARCH = 'http://localhost:8080/api/location/'
const DASHBOARD_URL_FAVORITES = 'http://localhost:8080/dashboard/favorites/remove/'

//Find Or Create location
export const locationSearch = (city,region,country,county) => {
    return axios.post(API_URL_SEARCH,{
        city: city,
        state: region,
        country: country,
        county: county
    })
}

//Find location by id
export const getOneLocation = id => {
    return axios.get(API_URL_SEARCH + id, {headers: authHeader()})
    .then(response => {
        return(response.data)
    })
    .catch(err => console.log(err))
}

export const updateLocation = (id,city,state,country,county, roles) => {
    return axios.put(API_URL_SEARCH + id, {
        id,
        city,
        state,
        country,
        county,
        roles
    })
}

export const removeFavorite = (id) => {
    return axios.delete(DASHBOARD_URL_FAVORITES + id, {headers: authHeader()})
    .then(response => {
        return(response)
    })
    .catch(err => console.log(err))
}