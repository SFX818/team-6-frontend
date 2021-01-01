import React, {useState, useEffect} from 'react'
import { getFavorites, getHistory } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState(undefined)
    const [userDashboard, setUserDashboard] = useState(undefined)
    const [searchHistory, setSearchHistory] = useState(undefined)

    useEffect(()=> {
        const user = getCurrentUser()
        if(user) {
          setCurrentUser(user)
          getFavorites().then(favorites => setUserDashboard(favorites))
          getHistory().then(history => setSearchHistory(history))
        }
      }, [])

    return(
        <>
        {userDashboard ? (
        <div>
            Dashboard
            {/* {console.log(userDashboard)} */}
            {userDashboard.length > 0 ? (
                <div>
                <h2>My Locations</h2>
                <ul>
                    {userDashboard.map(favorite=> (
                        <li key={favorite._id}>{favorite.city}, {favorite.state}, {favorite.country}</li>
                    ))}
                </ul>
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
            {console.log(searchHistory)}
            {searchHistory.length > 0 ? (
                <div>
                <ul>
                    {searchHistory.map(history=> (
                        <li key={history._id}>{history.city}, {history.state}, {history.country}</li>
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

        </>
    )
}

export default Dashboard