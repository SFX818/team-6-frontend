import React from 'react'
import { Link } from "react-router-dom";
export const About = () => {
    return (
        <div>
            
            <h1>Meet the Covid Engineering Team</h1>
            
            <div class="row">
                <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                    <span class="card-title">Elizabeth Guerra</span>
                    <h5>Full Stack Developer</h5>
                    <p>I am a very simple card. I am good at containing small bits of information.
                    I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div class="card-action">
                    <Link to="/">This is a link</Link>              
                    </div>
                </div>

                

                </div>
            </div> 
            <div class="row">
                <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                    <span class="card-title">Cameron Moreno</span>
                    <h5>Full Stack Developer</h5>
                    <p>I am a very simple card. I am good at containing small bits of information.
                    I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div class="card-action">
                    <Link to="/">This is a link</Link>
                    </div>
                </div>
                </div>
            </div> 
            <div class="row">
                <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                    <span class="card-title">Kishon StClair</span>
                    <h5>Full Stack Developer</h5>
                    <p>I am a very simple card. I am good at containing small bits of information.
                    I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div class="card-action">
                    <Link to="/">This is a link</Link>
                    </div>
                </div>
                </div>
            </div> 
            
        </div>
    )
}

export default About