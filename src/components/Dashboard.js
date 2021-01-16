import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'

import Statistics from './Statistics'
import StatisticsTable from './StatisticsTable'
import '../css/Dashboard.css'

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
    
    const onChangeStatistics = (county, region, country) => {
        console.log(county)
        console.log(region)
        console.log(country)
        setPrimaryCounty(county)
        setPrimaryState(region)
        setPrimaryCountry(country)
        console.log(primaryCounty)
        console.log(primaryState)
        console.log(primaryCountry)
    }

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
        <div className='container'>
        {currentUser ? (
        <div className='row charts-container'>
            <h1>Dashboard - {currentUser.username}</h1>
            {primaryLocation ? (
                <>
                    <div className='row'>
                        <h4>{primaryLocation.city}, {primaryLocation.state} - {primaryLocation.country}</h4>
                        <Statistics
                            newCountry={primaryCountry}
                            newCounty={primaryCounty}
                            newRegion={primaryState}
                        />
                    </div>
                    {/* <div className='row stats-container'> */}
                        <StatisticsTable onChangeStatistics={onChangeStatistics}/>
                    {/* </div> */}
                </>
            ) : (
                <div className='row'>No Primary Location set</div>
            )}
        </div>
        ) : (
            <div>Please <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link> to view this page</div>
        )}
        {userDashboard ? (
        <div className='row'>
            {/* {setLoading(false)} */}
            {/* {console.log(userDashboard)} */}
            {userDashboard.length > 0 ? (
                <div className='container'>
                    {userDashboard.map(favorite=> (
                        <div key={favorite._id} className='row'>
                            <div className='col s12'>
                                <div className='card'>
                                    <div className='card-content'>
                                        <span className='card-title'>{favorite.city}, {favorite.state} - {favorite.country}</span>
                                        <Form onSubmit={handleSubmit} ref={form}>
                                            <Input type='hidden' value={favorite._id} name='id' />
                                            <Input type='hidden' value={favorite.city} name='city' />
                                            <Input type='hidden' value={favorite.state} name='userState' />
                                            <Input type='hidden' value={favorite.country} name='country' />
                                            <Input type='hidden' value={favorite.county} name='county' />
                                            <Input type='submit' value='Set as Primary Location' name='submit' className='card-action' />
                                        </Form>
                                        <Form onSubmit={handleRemove} ref={form}>
                                            <Input type='hidden' value={favorite._id} name='id' />
                                            <Input type='submit' value='Remove from My Locations' name='submit' className='card-action' />
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            ) : (
                <div className='row'>No Locations to Display!</div>
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
        <>
            Search History
            {/* {setLoading(false)} */}
            {/* {console.log(searchHistory)} */}
            {searchHistory.length > 0 ? (
                <>
                <ul id='slide-out' class='sidenav sidenav-fixed'>
                <h6 className='search-header'>Search History</h6>
                    {searchHistory.map((history, index)=> (
                        <li key={index}><Link to= {`/search/${history._id}`}>{history.city}, {history.state}, {history.country}</Link></li>
                    ))}
                </ul>
                </>
            ) : (
                <ul id='slide-out' class='sidenav sidenav-fixed'>
                    <li>No Search History to Display! Get started <Link to='/search'>here</Link></li>
                </ul>
            )}
        </>
        ) : (
            <div>
                <div className='progress'>
                    <span className='indeterminate'></span>
                </div>
            </div>
        )}
        </div>

    )
}

export default Dashboard