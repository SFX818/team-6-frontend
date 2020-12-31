import React from 'react'
import { getAllUsers } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'

const Admin = () => {
    const allUsers = getAllUsers()
    const currentUser = getCurrentUser()
    console.log(currentUser)
    return (
        <div>
            Admin page
            {console.log(allUsers)}
        </div>
    )
}

export default Admin