import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'


//const API_URL =  process.env.API_URL_Search
const API_URL_SEARCH = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_SEARCH : process.env.REACT_APP_PRO_URL_SEARCH;

//Find Or Create location
export const locationSearch = (country,region,city,county) => {
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
}

// --- Do we need this one?
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

// Adds search to user's search history
export const addToSearchHistory = id => {
    return axios.post(API_URL_SEARCH + 'search/' + id, {
        id
    },
        {headers: authHeader()}
    )
}