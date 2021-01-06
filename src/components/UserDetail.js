import React, {useState, useEffect, useRef} from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import { useParams } from 'react-router-dom'
import { getOneUser, getRoles, addUserRoles, removeUserRoles, deleteUser } from '../services/user.service'

const UserDetail = (props) => {
    const form = useRef()
    const [user, setUser] = useState('')
    const [roles, setRoles] = useState('')
    const [message, setMessage] = useState('')
    let { id } = useParams()

    const handleAddRole = (event) => {
        event.preventDefault()
        let roleId = event.target.roleId.value
        let roleName = event.target.roleName.value
        const newRole =
            {
                _id: roleId, 
                name: roleName
            }
        // console.log(newRole)
        addUserRoles(id,newRole)
        .then(response => {
            setMessage(response.data)
            window.location.reload()
        })
        .catch(err => setMessage(err))
    }

    const handleRemoveRole = (event) => {
        event.preventDefault()
        let roleId = event.target.roleId.value
        let roleName = event.target.roleName.value
        const newRole =
            {
                _id: roleId, 
                name: roleName
            }
        // console.log(newRole)
        removeUserRoles(id,newRole)
        .then(response => {
            setMessage(response.data)
            window.location.reload()
        })
        .catch(err => setMessage(err))
    }

    const handleDelete = e => {
        e.preventDefault()
        deleteUser(id)
        .then(
            ()=> {
                props.history.push('/admin')
                window.location.reload()
            }
        )
        .catch(err => {setMessage(err)})
        // console.log(id)
    }

    useEffect(() => {
        getOneUser(id).then(response => {
            setUser(response.data)
            },
            (error) => {
                setMessage(error)
                setUser(error)
              }
        )
        getRoles().then(response => {
            setRoles(response.data)
            },
            (error) => {
                setMessage(error)
                setRoles(error);
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
                    <Form onSubmit={handleDelete} ref={form}>
                        <Input type='submit' value='Delete User' />
                    </Form>
                    {user.roles && 
                        user.roles.map(role => 
                        <div key={role._id}>
                            <p>{role.name}</p>
                            <Form onSubmit={handleRemoveRole} ref={form}>
                                <Input type='hidden' value={role._id} name='roleId'/>
                                <Input type='hidden' value={role.name} name='roleName'/>
                                <Input type='submit'  value='Remove Role'/>
                            </Form>
                        </div>)
                    }
                    {/* {console.log(user)} */}
                </div>
            ) : (
                <div className='progress'>
                    <span className='indeterminate'></span>
                </div>
            )}
            {roles ? (
                <div>
                    <h4>Add Roles</h4>
                {/* {console.log(roles)} */}
                {roles.length > 0 ? (
                    <div>
                        {/* {console.log(user.roles)} */}
                            {roles.map(role => (
                                <>
                                    {(user.roles && user.roles.some(existing => existing._id === role._id)) ? (
                                        <></>
                                    ) : (
                                        <div key={role._id}>
                                            <p>{role.name}</p>
                                            <Form onSubmit={handleAddRole} ref={form}>
                                                <Input type='hidden' value={role._id} name='roleId'/>
                                                <Input type='hidden' value={role.name} name='roleName'/>
                                                <Input type='submit'  value='Add Role'/>
                                            </Form>
                                        </div>
                                    )}
                                </>
                            )
                        )}
                    </div>
                ) : (
                    <div>No roles to display!</div>
                )
            }
                </div>
            ) : (
                <div className='progress'>
                    <span className='indeterminate'></span>
                </div>
            )}
        </>
    )

}

export default UserDetail