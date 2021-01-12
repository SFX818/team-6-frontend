import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

// Components
import Loading from './common/Loading'

// Helper
import { login } from '../services/auth.service'
import { resMessage } from '../utilities/functions.utilities'

//Function given to react-validator
const required = (value) => {
    if(!value){
        return (
            <div className='alert'>
                This field is required!
            </div>
        )
    }
}

const Login = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    const handleLogin = (e) => {
        //Prevent reload of pressing the button
        e.preventDefault()
        //Prevent message clear them out
        setMessage('')
        setLoading(true)

        // validtes all the fields in your form
        form.current.validateAll()
        
        // Validator stores errors and we can check if errors exist
        if(checkBtn.current.context._errors.length === 0) {
            login(username, password).then(
                ()=> {
                    props.history.push('/dashboard')
                    window.location.reload()
                },
                (error) => {                    
                    // Setting loading to false and return the error
                    setLoading(false)
                    setMessage(resMessage(error))
                }
            )
        } else {
            loading(false)
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

                <Form onSubmit={handleLogin} ref={form}>
                    <label for='username'>Username</label>
                    <div className='input-field'>
                        <Input
                            type="text"
                            // className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>

                    <label for='password'>Password</label>
                    <div className='input-field'>
                        <Input
                            type="password"
                            // className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>
                    
                    <div className="input-field">
                        <button className="btn waves-effect waves-light">
                            <span>Login</span>
                            <i class="material-icons right">send</i>
                        </button>   
                    </div>

                    {message && (
                        <div className='input-field'>
                            <div className='alert alert-danger' role='alert'>
                                {message}
                            </div>
                        </div>
                    )}

                    <CheckButton style={{display: 'none'}} ref={checkBtn}/>
                    
                    <div className="input-field">
                        <p>Not a member? <Link to="/register">Sign Up</Link></p>           
                    </div>
                </Form>
                </div>
            </div>
        </div>
    )
}

export default Login