import './LogIn.css'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';
// import MainPage from '../Mainpage/Display/MainPage';

function LogIn(){
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(false)
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try{
            await signInWithEmailAndPassword(auth, email, password)
            console.log("login successful")
            navigate("/home")
            setLogin(!login)
            
            
        } catch(err){
            console.log("login error")
            setErr(true)
        }
         
    }

    // if (login === true){
    //     return(
    //     <MainPage/>
    // )}

    return(
        <div className='main-div'> 
            <div className='login-container'>
                <div className='login-h1'>
                    <h1>Log in to your account</h1>
                </div>
                <div className='form-div'>
                    <form onSubmit={handleSubmit}> 
                        <h3>Email address</h3>
                        <input type="email" placeholder='Enter your email address' className='login-input' value={email} onChange={(e)=>setEmail(e.target.value)} />.
                        <h3>Password</h3>
                        <input type='password' placeholder='Enter your password' className='login-input' value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <br/>
                        <button className='login-button'>Log In</button>
                    </form>
                </div>
                <div>
                    {err? <p>Invalid email or password</p>:<span></span>}
                </div>
                <div className='span-div'>
                <span > <Link to='/signup'>SignUp for an account</Link> </span>
                </div>
            
            </div>
        </div>
    )
}

export default LogIn