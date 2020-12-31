import axios from 'axios'

const API_URL_ADMIN = 'http://localhost8080/admin/users/'
const API_URL_DASHBOARD = 'http://localhost8080/dashboard/'
const API_URL_SEARCH = 'http://localhost8080/search/'

// --- ADMIN ROUTES --- //
export const getAllUsers = () => {
    axios.get(API_URL_ADMIN + 'all')
    .then(response => {return response})
    .catch(err => console.log(err))
}

export const getOneUser = () => {
    return axios.get(API_URL_ADMIN + ':id')
}

export const updateUser = (id,username,email,password,roles) => {
    return axios.put(API_URL_ADMIN + ':id', {
        id,
        username,
        email,
        password,
        roles
    })
}

export const deleteUser = (id) => {
    return axios.delete(API_URL_ADMIN + ':id', {
        id
    })
}

// --- USER DASHBOARD ROUTES --- //
export const getFavorites = () => {
    return axios.get(API_URL_DASHBOARD + 'favorites')
}

export const getHistory = () => {
    return axios.get(API_URL_DASHBOARD + 'history')
}

export const editPrimary = (id,city,state,country,county) => {
    return axios.put(API_URL_DASHBOARD + 'edit', {
        id,
        city,
        state,
        country,
        county
    })
 }

export const removeFavorite = (id) => {
    return axios.delete(API_URL_DASHBOARD + 'favorites/remove/:id', {
        id
    })
}

export const addFavorite = (id,city,state,country,county) => {
    return axios.post(API_URL_SEARCH + ':id', {
        id,
        city,
        state,
        country,
        county
    })
}

// export default {
//     getAllUsers,
//     getOneUser,
//     updateUser,
//     deleteUser,
//     getFavorites,
//     getHistory,
//     editPrimary,
//     removeFavorite,
//     addFavorite
// }
