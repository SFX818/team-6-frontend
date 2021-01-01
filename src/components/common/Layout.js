import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getCurrentUser} from '../../services/auth.service'

const Layout = (props) => {
    const [showAdmin, setShowAdmin] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(()=> {
      const user = getCurrentUser()

      if(user) {
        setCurrentUser(user)
        setShowAdmin(user.roles.includes('ROLE_ADMIN'))
      }
    }, [])

    // --- NEED TO ADD LOGOUT --- //

    return (
        <>
        <nav>
          <Link to='/'>LOGO/APP NAME HERE</Link>
          <div>
            <Link to='/home'>Home</Link>
            {showAdmin && (
              <Link to={'/admin'}>Admin</Link>
            )}
            {currentUser && (
              <Link to={'/dashboard'}>Dashboard</Link>
            )}
          </div>
            {currentUser ? (
          <div>
              <Link to={'/profile'}>{currentUser.username}</Link>
          </div>)
          : (
            <div>
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>Register</Link>
            </div>
          )}
        </nav>

        <div>{props.children}</div>
        </>
    )
  };
  
export default Layout
  