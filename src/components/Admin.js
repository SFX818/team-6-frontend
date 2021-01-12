import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getAllUsers } from '../services/user.service'
import {resMessage} from '../utilities/functions.utilities'

const Admin = () => {
    const [users, setUsers] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        getAllUsers().then(response => {
            setUsers(response.data)
            },
            (error) => {
                setMessage(resMessage(error))
                setUsers(error);
              }
        )
    },[])
    return(
        <>
            {users ? (
                <div className='container'>
                    <h2>All Users</h2>
                    {/* {console.log(users)} */}
                    {users.length > 0 ? (
                        <>
                            {users.map(user => (
                                <div key={user._id} className='row'>
                                    <div className='col s12'>
                                        <div className='card'>
                                            <div className='card-content'>
                                                <span className='card-title'>
                                                    <Link to={`/admin/users/${user._id}`}>
                                                        <h4>{user.username}</h4>
                                                    </Link>    
                                                </span>
                                                <p>{user.email}</p>
                                                {user.primaryLocation && 
                                                <p>
                                                    {user.primaryLocation.city},{' '}
                                                    {user.primaryLocation.state},{' '} 
                                                    {user.primaryLocation.county}{' '}-{' '}
                                                    {user.primaryLocation.country}
                                                </p>}
                                                {user.roles && 
                                                    user.roles.map(role => <p key={role._id}>{role.name}</p>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div>No Users to Show!</div>
                    )}
                </div>
            ) : (
                <div className='progress'>
                    <span className='indeterminate'></span>
                </div>
            )}
        </>
    )
}

export default Admin