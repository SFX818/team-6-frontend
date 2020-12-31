import React from 'react'
import { getCurrentUser } from '../services/auth.service'

const Profile = () => {
    const currentUser = getCurrentUser()
    console.log(currentUser)

    return(
        <div className='container'>
            <header className='jumbotron'>
                <h3>
                    <strong>{currentUser.username}</strong>
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.accessToken}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>

            <p>
                <strong>Primary City:</strong> {currentUser.city}
            </p>

            {/* if current user has roles, then map through those roles */}
            {currentUser.roles && 
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)
            }
        </div>
    )
}

export default Profile