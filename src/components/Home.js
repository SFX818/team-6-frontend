import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
      <div>
       <section class="banner">
        <div class="container">
            <div class="banner-description">
                <div class="banner-content">
                    <span class="semi-title">Stay Home, Be Safe</span>
                    <h2>
                    Check up on other communities affected by COVID-19
                    </h2>
                    {/* <a href="/register" class="filbtn">Register</a> */}
                    <Link to='/register' className='fillBtn'>Register</Link>
                </div>
            </div>
        </div>
    </section>
        
          
      </div>
      
    )

  };
  
export default Home
  