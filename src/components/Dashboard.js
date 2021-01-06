import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'

import Statistics from './Statistics'
import Loading from './common/Loading'

import { getFavorites, getHistory, getPrimaryLocation, editPrimary, removeFavorite } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'
      
const Dashboard = () => {
    const form = useRef()
    const [currentUser, setCurrentUser] = useState(undefined)
    const [userDashboard, setUserDashboard] = useState(undefined)
    const [searchHistory, setSearchHistory] = useState(undefined)
    const [primaryLocation, setPrimaryLocation] = useState(undefined)

    const [primaryCountry, setPrimaryCountry] = useState(undefined)
    const [primaryCounty, setPrimaryCounty] = useState(undefined)
    const [primaryState, setPrimaryState] = useState(undefined)
    
    
    useEffect(()=> {
        const user = getCurrentUser()
        if(user) {
          setCurrentUser(user)
          getFavorites().then(favorites => setUserDashboard(favorites))
          getHistory().then(history => setSearchHistory(history))
        }
      }, [])

      useEffect(()=> {
        getPrimaryLocation().then(location => {
            setPrimaryLocation(location)
            setPrimaryCountry(location.country)
            setPrimaryCounty(location.county)
            setPrimaryState(location.state)
          })
      }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        let user = currentUser.id
        
        let id = (event.target.id.value)
        let city = (event.target.city.value)
        let userState = (event.target.userState.value)
        let country = (event.target.country.value)
        let county = (event.target.county.value)

        editPrimary(user,id,city,userState,country,county)
        .then(response => {
            console.log(response.data)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleRemove = event => {
        event.preventDefault()
        let user = currentUser.id
        let id = (event.target.id.value)

        removeFavorite(user, id)
        .then(response => {
            console.log(response.data)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    return(
        <>
        {currentUser ? (
        <div className='container'>
            <h1>Dashboard - {currentUser.username}</h1>
            {primaryLocation ? (
                <div>
                    <h3>My Primary Location</h3>
                    <div>
                        <h4>{primaryLocation.city}, {primaryLocation.state} - {primaryLocation.country}</h4>
                        <Statistics
                            newCountry={primaryCountry}
                            newCounty={primaryCounty}
                            newRegion={primaryState}
                        />
                    </div>
                </div>
            ) : (
                <div>No Primary Location set</div>
            )}
        </div>
        ) : (
            <div>Please <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link> to add to view this page</div>
        )}
        {userDashboard ? (
        <div>
            {/* {setLoading(false)} */}
            {/* {console.log(userDashboard)} */}
            {userDashboard.length > 0 ? (
                <div>
                <h2>My Locations</h2>
                <div>
                    {userDashboard.map(favorite=> (
                        <div key={favorite._id}>
                            <h4>{favorite.city}, {favorite.state} - {favorite.country}</h4>
                            <Form onSubmit={handleSubmit} ref={form}>
                                <Input type='hidden' value={favorite._id} name='id' />
                                <Input type='hidden' value={favorite.city} name='city' />
                                <Input type='hidden' value={favorite.state} name='userState' />
                                <Input type='hidden' value={favorite.country} name='country' />
                                <Input type='hidden' value={favorite.county} name='county' />
                                <Input type='submit' value='Set as Primary Location' name='submit' />
                            </Form>
                            <Form onSubmit={handleRemove} ref={form}>
                                <Input type='hidden' value={favorite._id} name='id' />
                                <Input type='submit' value='Remove from My Locations' name='submit' />
                            </Form>
                        </div>
                    ))}
                </div>
                </div>
            ) : (
                <div>No Locations to Display!</div>
            )}
        </div>
        ) : (
            <div>
                <div className='progress'>
                    <span className='indeterminate'></span>
                </div>
            </div>
        )}
        {searchHistory ? (
        <div>
            Search History
            {/* {setLoading(false)} */}
            {/* {console.log(searchHistory)} */}
            {searchHistory.length > 0 ? (
                <div>
                <ul>
                    {searchHistory.map((history, index)=> (
                        <li key={index}><Link to= {`/search/${history._id}`}>{history.city}, {history.state}, {history.country}</Link></li>
                    ))}
                </ul>
                </div>
            ) : (
                <div>No Search History to Display! Get started <Link to='/search'>here</Link></div>
            )}
        </div>
        ) : (
            <div>
                <div className='progress'>
                    <span className='indeterminate'></span>
                </div>
            </div>
        )}
        </>

    )
}

export default Dashboard