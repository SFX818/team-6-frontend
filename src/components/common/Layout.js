import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getCurrentUser, logout} from '../../services/auth.service'

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

    const logOut = () => {
      logout()
    }

    return (
        <>
        <nav>
          <div className='nav-wrapper'>
          <Link to='/' className='brand-logo'>APP NAME HERE</Link>
            <ul id='nav-mobile' class='right hide-on-med-and-down'>
              <li><Link to='/home'>Home</Link></li>
              <li><Link to='/search'>Search</Link></li>
              <li><Link to='/about'>About</Link></li>
            {showAdmin && (
              <li><Link to={'/admin'}>Admin</Link></li>
            )}
            {currentUser ? (
            <>
              <li><Link to={'/dashboard'}>Dashboard</Link></li>
              <li><a href='/' onClick={logOut}>Logout</a></li>
            </>
            ) : (
            <>
            <li><Link to={'/login'}>Login</Link></li>
            <li><Link to={'/register'}>Register</Link></li>
            </>
          )}
            </ul>
          </div>
        </nav>

        <div>{props.children}</div>

        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Footer</h5>
                <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">More Info</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2020 Binary Beasts
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div>
        </footer>
        </>
    )
  };
  
export default Layout