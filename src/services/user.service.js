import axios from 'axios'

const API_URL_ADMIN = 'http://localhost8080/admin/users/'
const API_URL_DASHBOARD = 'http://localhost8080/dashboard/'
const API_URL_SEARCH = 'http://localhost8080/search/'

// --- ADMIN ROUTES --- //
const getAllUsers = () => {
    return axios.get(API_URL_ADMIN + 'all')
}

const getOneUser = () => {
    return axios.get(API_URL_ADMIN + ':id')
}

const updateUser = () => {
    return axios.put(API_URL_ADMIN + ':id', {
        id,
        username,
        email,
        password,
        roles
    })
}

const deleteUser = () => {
    return axios.delete(API_URL_ADMIN + ':id', {
        id
    })
}

// --- USER DASHBOARD ROUTES --- //
const getFavorites = () => {
    return axios.get(API_URL_DASHBOARD + 'favorites')
}

const getHistory = () => {
    return axios.get(API_URL_DASHBOARD + 'history')
}

const editPrimary = () => {
    return axios.put(API_URL_DASHBOARD + 'edit', {
        id,
        city,
        state,
        country,
        county
    })
 }

const removeFavorite = () => {
    return axios.delete(API_URL_DASHBOARD + 'favorites/remove/:id', {
        id
    })
}

const addFavorite = () => {
    return axios.post(API_URL_SEARCH + ':id', {
        id,
        city,
        state,
        country,
        county
    })
}

export default {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    getFavorites,
    getHistory,
    editPrimary,
    removeFavorite,
    addFavorite
}
