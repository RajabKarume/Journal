import './LogIn.css'
import React from 'react'

function LogIn(){

    return(
        <div className='main-div'> 
            <div className='login-container'>
                <div className='login-h1'>
                    <h1>Log in to your account</h1>
                </div>
                <div className='form-div'>
                    <form>
                        <h3>Email address</h3>
                        <input type="email" placeholder='Enter your email address' />.
                        <h3>Password</h3>
                        <input type='password' placeholder='Enter your password' />
                    </form>
                </div>
                <div className='button-div'>
                    <button>Log In</button>
                </div>
                <div className='span-div'>
                    <span>Sign Up</span>
                </div>
            </div>
        </div>
    )
}

export default LogIn