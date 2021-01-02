import React, {useState, useEffect, useRef} from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import { getFavorites, getHistory, getPrimaryLocation, editPrimary } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'
import Statistics from './Statistics'
      
const Dashboard = () => {
    const form = useRef()
    const [currentUser, setCurrentUser] = useState(undefined)
    const [userDashboard, setUserDashboard] = useState(undefined)
    const [searchHistory, setSearchHistory] = useState(undefined)
    const [primaryLocation, setPrimaryLocation] = useState(undefined)

    const [id, setId] = useState('')
    const [city, setCity] = useState('')
    const [userState, setUserState] = useState('')
    const [country, setCountry] = useState('')
    const [county, setCounty] = useState('')

    const onChangeId = e => {
        let id = e.target.value
        setId(id)
    }
    const onChangeCity = e => {
        let city = e.target.value
        setCity(city)
    }
    const onChangeUserState = e => {
        let userState = e.target.value
        setUserState(userState)
    }
    const onChangeCountry = e => {
        let country = e.target.value
        setCountry(country)
    }
    const onChangeCounty = e => {
        let county = e.target.value
        setCounty(county)
    }


    useEffect(()=> {
        const user = getCurrentUser()
        if(user) {
          setCurrentUser(user)
          getFavorites().then(favorites => setUserDashboard(favorites))
          getHistory().then(history => setSearchHistory(history))
          getPrimaryLocation().then(location => setPrimaryLocation(location))
        }
      }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        let user = currentUser.id

        editPrimary(user,id,city,userState,country,county)
        .then(response => {
            // setPrimaryLocation(response.data)
            console.log(response.data)
        },
        err => {
            console.log(err)
        }
        )
        .catch(err => console.log(err))
    }

    return(
        <>
        {currentUser ? (
        <div>
            <h1>Dashboard - {currentUser.username}</h1>
            {primaryLocation ? (
                <div>
                    <h3>My Primary Location</h3>
                    <div>
                        <h4>{primaryLocation.city}, {primaryLocation.state} - {primaryLocation.country}</h4>
                    </div>
                </div>
            ) : (
                <div>No Primary Location set</div>
            )}
        </div>
        ) : (
            <div>Loading...</div>
        )}
        {userDashboard ? (
        <div>
            {/* {console.log(userDashboard)} */}
            {userDashboard.length > 0 ? (
                <div>
                <h2>My Locations</h2>
                <div>
                    {userDashboard.map(favorite=> (
                        <div key={favorite._id}>
                            <h4>{favorite.city}, {favorite.state} - {favorite.country}</h4>
                            <Form onSubmit={handleSubmit} ref={form}>
                                <Input 
                                    type='text'
                                    value={favorite._id}
                                    name='id'
                                    onChange={onChangeId}
                                />
                                <Input 
                                    type='text'
                                    value={favorite.city}
                                    name='city'
                                    onChange={onChangeCity}
                                />
                                <Input 
                                    type='text'
                                    value={favorite.state}
                                    name='userState'
                                    onChange={onChangeUserState}
                                />
                                <Input 
                                    type='text'
                                    value={favorite.country}
                                    name='country'
                                    onChange={onChangeCountry}
                                />
                                <Input 
                                    type='text'
                                    value={favorite.county}
                                    name='county'
                                    onChange={onChangeCounty}
                                />
                                <Input 
                                    type='submit'
                                    value='Set as Primary Location'
                                    name='submit'
                                />
                            </Form>
                        </div>
                    ))}
                </div>
                </div>
            ) : (
                <div>No Favorites to Display!</div>
            )}
        </div>
        ) : (
            <div>Loading...</div>
        )}
        {searchHistory ? (
        <div>
            Search History
            {/* {console.log(searchHistory)} */}
            {searchHistory.length > 0 ? (
                <div>
                <ul>
                    {searchHistory.map((history, index)=> (
                        <li key={index}>{history.city}, {history.state}, {history.country}</li>
                    ))}
                </ul>
                </div>
            ) : (
                <div>No Search History to Display!</div>
            )}
        </div>
        ) : (
            <div>Loading...</div>
        )}
        <Statistics />

        </>

    )
}

export default Dashboard