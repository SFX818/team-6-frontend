import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'



const Admin = () => {
    const currentUser = getCurrentUser()
    const [allUsers, setAllUsers] = useState('')

    useEffect(() => {
        setAllUsers(getAllUsers())
    }, [])

    console.log(currentUser)
    return (
        <div>
            Admin page
            {console.log(allUsers)}
        </div>
    )
}

export default Admin