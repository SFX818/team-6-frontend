import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from "validator"
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

//Helper
import { register, login } from '../services/auth.service'
import { resMessage } from '../utilities/functions.utilities'

const axios = require('axios')
const GOOGLE_API_KEY = 'AIzaSyDbjklIejS9yn5KhRaEWen72vYpBu_0BZo'

//Function given to react-validator
const required = (value) => {
    if(!value){
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

//Function that validates username
const vusername = (value) => {
    if(value.length < 3 || value.length >= 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Your username must be between 3 and 20 characters
            </div>
        )
    }
}

//Function that validates passwords
const vpassword = (value) => {
    if(value.length < 6 || value.length >= 40) {
        return (
            <div className="alert alert-danger" role="alert">
                Your password must be between 6 and 40 characters
            </div>
        )
    }
}

const validEmail = (value) => {
    if(!isEmail) {
        return (
            <div className="alert alert-danger" role="alert">
                Submitted e-mail not valid
            </div>
        )
    }
}

const Register = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [successful, setSuccessful] = useState(false)
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [city, setCity] = useState('')
    const [loading, setLoading] = useState(false)
    
    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    const onChangeEmail = (e) => {
        const email = e.target.value
        setEmail(email)
    }

    const onChangeCountry = (val) => {
        console.log(val)
        setCountry(val)
    }

    const onChangeRegion = (val) => {
        console.log(val)
        setRegion(val)
    }

    const onChangeCity = (e) => {
        const city = e.target.value
        console.log(city)
        setCity(city)
    }

    const handleSignup = async (e) => {
        //Prevent reload of pressing the button
        e.preventDefault()
        //Prevent message clear them out
        setMessage("")
        setSuccessful(false)
        //delay for 2 seconds then switch to the login page
        
        
        // validtes all the fields in your form
        form.current.validateAll()
        
        // Validator stores errors and we can check if errors exist
        
        if(checkBtn.current.context._errors.length === 0) {
            //Google API request
            const apiResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city},${region}&key=${GOOGLE_API_KEY}`)
            //Parses over API and pulls out "____ County", replace removes county for disease API
            const county = Object.values(apiResponse.data.results[0])[0][1].long_name.replace(/County/g, '')
            register(username, email, password, country, region, city, county).then(
                (response) => {
                    setMessage(response.data.message)
                    setSuccessful(true)
                    // console.log("COUNTY AFTER REGISTER", county)
                    login(username, password).then(
                        ()=> {
                            props.history.push("/dashboard")
                            window.location.reload()
                        },
                        (error) => {
                            // Checking all the data received from our backend
                            
                            // Setting loading to false and return the error
                            setLoading(false)
                            setMessage(resMessage(error))
                        }
                    )
                },
                (error) => {
                    setMessage(resMessage(error))
                    setSuccessful(false)
                }
            )

        } else {
            successful(false)
        }


    }


    return(
        <div className="container">
            <div className="row">
                <div className="input-field img-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                </div>
                <Form onSubmit={handleSignup} ref={form} className="form">
                        <label for='username'>Username</label>
                        <div className='input-field'>
                            <Input
                                type="text"
                                name="username"
                                value={username}
                                placeholder="Username"
                                onChange={onChangeUsername}
                                validations={[required, vusername]}
                            />
                            
                        </div>

                        <label for="email">Email</label>
                        <div className='input-field'>
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={onChangeEmail}
                                validations={[required, validEmail]}
                            />
                        </div>

                        <label for='password'>Password</label>
                        <div className='input-field'>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={onChangePassword}
                                validations={[required, vpassword]}
                            />
                        </div>
                        <div className="input-field">
                            <CountryDropdown
                                className="browser-default"
                                value={country}
                                onChange={(val) => onChangeCountry(val)} />
                        </div>

                        <div className="input-field">
                            <RegionDropdown
                                className="browser-default"
                                country={country}
                                value={region}
                                onChange={(val) => onChangeRegion(val)} />
                        </div>

                        <label for='city'>City</label>
                        <div className='input-field'>
                            <Input
                                type="text"
                                name="city"
                                value={city}
                                placeholder="City"
                                onChange={onChangeCity}
                                validations={[required]}
                            />
                        </div>
                        

                        <div className="input-field">
                            <button className="btn waves-effect waves-light">
                                <span>Sign Up</span>
                                <i class="material-icons right">send</i>
                            </button>   
                        </div>


                        {message && (
                            <div className="input-field">
                                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <CheckButton style={{display: "none"}} ref={checkBtn}/>

                        <div className="input-field">
                            <p>Already a member? <Link to="/login">Log In</Link></p>          
                        </div>
                </Form>
            </div>
        </div>
    )
}

export default Register