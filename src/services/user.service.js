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

// --- USER DASHBOARD ROUTES --- //
const getFavorites = () => {
    return axios.get(API_URL_DASHBOARD + 'favorites')
}

const getHistory = () => {
    return axios.get(API_URL_DASHBOARD + 'history')
}

const editPrimary = () => {
    return axios.get(API_URL_DASHBOARD + 'edit')
 }

const removeFavorite = () => {
    return axios.get(API_URL_DASHBOARD + 'favorites/remove/:id')
}

const addFavorite = () => {
    return axios.get(API_URL_SEARCH + ':id')
}

export default {
    getAllUsers,
    getOneUser,
    getFavorites,
    getHistory,
    editPrimary,
    removeFavorite,
    addFavorite
}
