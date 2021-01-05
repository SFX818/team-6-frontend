import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'

const API_URL_ADMIN = 'http://localhost:8080/admin/users/'
const API_URL_DASHBOARD = 'http://localhost:8080/dashboard/'
const API_URL_SEARCH = 'http://localhost:8080/search/'

// --- TEST --- //
export const testRoute = userToken => {
    axios.get('http://localhost:8080/profile', {
        headers: authHeader()
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => console.log(err))
}

// --- ADMIN ROUTES --- //
export const getAllUsers = () => {
    return axios.get(API_URL_ADMIN + 'all', {headers: authHeader()})
}

export const getOneUser = id => {
    return axios.get(API_URL_ADMIN + id, {headers: authHeader()})
}

export const getRoles = () => {
    return axios.get('http://localhost:8080/admin/roles', {headers: authHeader()})
}

export const addUserRoles = (id,roles) => {
    return axios.put(API_URL_ADMIN + id, {
        roles: roles
    },
        {headers: authHeader()}
    )
}

export const removeUserRoles = (id,roles) => {
    return axios.put(API_URL_ADMIN + id + '/remove', {
        roles: roles
    },
        {headers: authHeader()}
    )
}

// export const deleteUser = id => {
//     return axios.delete(API_URL_ADMIN + id +'/delete', {
//         _id: id
//     },
//         {headers: authHeader()}
//     )
// }

export const deleteUser = id => {
    return axios({
        method: 'DELETE',
        url: API_URL_ADMIN + id +'/delete',
        headers: authHeader()
    },
    {_id: id}
    )
}


// --- USER DASHBOARD ROUTES --- //
export const getFavorites = () => {
    return axios.get(API_URL_DASHBOARD + 'favorites',{headers: authHeader()})
    .then(response => {
        return(response.data)
    })
    .catch(err => console.log(err))
}

export const getPrimaryLocation = () => {
    return axios.get(API_URL_DASHBOARD + 'primary-location',{headers: authHeader()})
    .then(response => {
        return response.data
    })
    .catch(err => console.log(err))
}

export const getHistory = () => {
    return axios.get(API_URL_DASHBOARD + 'history',{headers: authHeader()})
    .then(response => {
        return(response.data)
    })
    .catch(err => console.log(err))
}

export const editPrimary = (user,id,city,state,country,county) => {
    return axios.put(API_URL_DASHBOARD + 'edit/' + user, {
        id: id,
        city: city,
        state: state,
        country: country,
        county: county
    },
        {headers: authHeader()}
    )
}

export const removeFavorite = (id) => {
    return axios.delete(API_URL_DASHBOARD + 'favorites/remove/' + id, {headers: authHeader()}
    )
}

export const addFavorite = (id,city,state,country,county) => {
    return axios.post(API_URL_SEARCH + id, {
        id,
        city,
        state,
        country,
        county
    },
        {headers: authHeader()}
    )
}

