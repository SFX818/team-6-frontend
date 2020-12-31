import React from 'react'
import { getFavorites } from '../services/user.service'

const Dashboard = () => {
    const favorites = getFavorites()
    console.log(favorites)
    return(
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard