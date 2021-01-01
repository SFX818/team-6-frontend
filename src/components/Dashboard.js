import React from 'react'
import { getAllUsers, getFavorites } from '../services/user.service'
import Statistics from './Statistics'

const Dashboard = () => {
    const favorites = getFavorites()
    return(
        <div>
            Dashboard

            <Statistics />
        </div>
    )
}

export default Dashboard