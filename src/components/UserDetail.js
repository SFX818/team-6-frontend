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
        <div className='container'>
            {user ? (
                <div className='row'>
                    <div className='col s12'>
                        <div className='card'>
                            <div className='card-content'>
                            <span className='card-title'><h3>{user.username}</h3></span>
                                <p>{user.email}</p>
                                {user.primaryLocation && 
                                <p>
                                    {user.primaryLocation.city},{' '}
                                    {user.primaryLocation.state},{' '} 
                                    {user.primaryLocation.county}{' '}-{' '}
                                    {user.primaryLocation.country}
                                </p>}
                                <Form onSubmit={handleDelete} ref={form}>
                                    <Input type='submit' value='Delete User' className='card-action'/>
                                </Form>
                                {user.roles && 
                                    user.roles.map(role => 
                                    <div key={role._id}>
                                        {/* <p>{role.name}</p> */}
                                        <Form onSubmit={handleRemoveRole} ref={form}>
                                            <Input type='hidden' value={role._id} name='roleId'/>
                                            <Input type='hidden' value={role.name} name='roleName'/>
                                            <Input 
                                                type='submit'  
                                                value={`Remove ${role.name.slice(0,1).toUpperCase()+ role.name.slice(1,role.name.length)} Role`} 
                                                className='card-action'
                                            />
                                        </Form>
                                    </div>)
                                }
                                {/* {console.log(user)} */}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='progress'>
                    <span className='indeterminate'></span>
                </div>
            )}
            {roles ? (
                <div>
                    <div className='row'>
                        <div className='col s12'>
                            <div className='card'>
                                <div className='card-content'>
                                    <span className='card-title'><h4>Add Roles</h4></span>
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
                                                                    {/* <p>{role.name}</p> */}
                                                                    <Form onSubmit={handleAddRole} ref={form}>
                                                                        <Input type='hidden' value={role._id} name='roleId'/>
                                                                        <Input type='hidden' value={role.name} name='roleName'/>
                                                                        <Input 
                                                                            type='submit'  
                                                                            value={`Add ${role.name.slice(0,1).toUpperCase()+ role.name.slice(1,role.name.length)} Role`} 
                                                                            className='card-action'
                                                                        />
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
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='progress'>
                    <span className='indeterminate'></span>
                </div>
            )}
        </div>
    )

}

export default UserDetail