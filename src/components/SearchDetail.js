import React, {useState, useEffect, useRef} from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import { useParams, Link } from 'react-router-dom'
import { getOneLocation } from '../services/location.services'
import { addFavorite } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'

const SearchDetail = () => {
    const form = useRef()
    const [location, setLocation] = useState('')
    const [currentUser, setCurrentUser] = useState(undefined)
    let { id } = useParams()

    useEffect(() => {
        getOneLocation(id).then(response => {
            setLocation(response.data)
            },
            (error) => {
                const _error =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLocation(_error);
              }
        )
        const user = getCurrentUser()
        if(user) {
            setCurrentUser(user)
        }
    },[])

    const handleAddFavorite = e => {
        e.preventDefault()
        let user = currentUser.id
        let id = e.target.id.value

        addFavorite(user,id)
        .then(response => {
            console.log(response.data)
        })
        .catch(err => console.log(err))
    }


    return(
        <>
            {location ? (
                <div>
                    <h3>{location.city}, {location.state} - {location.country}</h3>
                    {currentUser ? (
                    <Form ref={form} onSubmit={handleAddFavorite}>
                        <Input type='hidden' value={location._id} name='id'/>
                        <Input type='submit' value='Add to Favorite Locations' name='submit'/>
                    </Form>
                    ) : (
                        <div><Link to='/login'>Login</Link> or <Link to='/register'>Register</Link> to add to favorite locations!</div>
                    )}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}

export default SearchDetail