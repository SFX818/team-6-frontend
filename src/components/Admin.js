import React from 'react'
import { getAllUsers } from '../services/user.service'

const Admin = () => {
    const allUsers = getAllUsers()
    return (
        <div>
            Admin page
            {console.log(allUsers)}
        </div>
    )
}

export default Admin