import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getOneUser } from '../services/user.service'

const UserDetail = () => {
    const [user, setUser] = useState('')
    let { id } = useParams()

    useEffect(() => {
        getOneUser(id).then(response => {
            setUser(response.data)
            },
            (error) => {
                const _error =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                setUser(_error);
              }
        )
    },[])
    return(
        <>
            {user ? (
                <div>
                    <h1>{user.username}</h1>
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
                    {console.log(user)}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )

}

export default UserDetail