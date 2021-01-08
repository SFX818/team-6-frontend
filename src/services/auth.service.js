import axios from 'axios'
import {setItem, getItem, removeItem} from '../utilities/localStorage.utilities'

//const API_URL =  process.env.API_URL_AUTH
const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_AUTH : process.env.REACT_APP_PRO_URL_AUTH;

//Function to register users
export const register = (username, email, password, country, region, city, county) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
        primaryLocation: {"country": country, 
                        "state": region, 
                        "city": city,
                        "county": county
                        }
    })
}

//Log in the user
export const login = (username, password) => {
    return axios.post(API_URL + "signin", {
        username,
        password
    })
    .then((response) => {
        // Check if the response of user has accessToken
        if(response.data.accessToken) {
            setItem('user', response.data)
        }
        return response.data
    })
}

// logout the user
export const logout = () => {
    removeItem('user')
}

// get the current users
export const getCurrentUser = () => {
    return getItem('user')
}