import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneLocation } from '../services/location.services'

const SearchDetail = () => {
    const [location, setLocation] = useState('')
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
    })


    return(
        <>
            {location ? (
                <div>
                    <h3>{location.city}, {location.state} - {location.country}</h3>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}

export default SearchDetail