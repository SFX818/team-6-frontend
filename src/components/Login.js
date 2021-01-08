import React, { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

// Components
import FormGroup from './common/FormGroup'
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
        <div className="row login">
            <div className="col s7">
                <div class="card">
                <img
                    src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027365_960_720.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>
                    <FormGroup text='username'>
                        <Input
                            type="text"
                            // className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </FormGroup>

                    <FormGroup text='password'>
                        <Input
                            type="password"
                            // className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </FormGroup>
                    
                    <div className="form-group">
                        <button className="btn red white-text">
                            <span>Login</span>
                        </button>   
                    </div >
                    <div classsName="col s8">
                     
                    <h5>Not a member? <a href="/register">SignUp</a></h5>          
                    </div>

                    {message && (
                        <div className='input-field'>
                            <div className='alert alert-danger' role='alert'>
                                {message}
                            </div>
                        </div>
                    )}

                    <CheckButton style={{display: 'none'}} ref={checkBtn}/>
                </Form>
                </div>
            </div>
        </div>
    )
}

export default Login