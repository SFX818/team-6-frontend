import React, {useState, useEffect} from 'react'
import { getFavorites } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState(undefined)
    const [userDashboard, setUserDashboard] = useState(undefined)

    useEffect(()=> {
        const user = getCurrentUser()
        if(user) {
          setCurrentUser(user)
          getFavorites().then(favorites => setUserDashboard(favorites))
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
                        <li key={favorite._id}>{favorite.city}, {favorite.state}</li>
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
        </>
    )
}

export default Dashboard