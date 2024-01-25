import { useState } from "react"
import React from 'react'
import "./login.css"
import Config from "../../Config/config.json"
import axios from "axios"

const serverURL = Config.ServerURL
const Login = ({onLogin}) => {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${serverURL}/api/auth/login`, {
                email:email,
                password:password
            })

            onLogin(response.data.user, response.data.token);
            setEmail("");
            setPassword("");
            alert(`Login Successfull: ${response.data}`)
          
        } catch (err) {
            console.log(err)
            alert(`Err: ${err.response.data}`)
        }

    }
  return (
    <div className='login-container'>
      <div className="login-inner-container">
        <input className='signup-input' placeholder='Email' value={ email} onChange={handleEmailChange} />
        <input className='signup-input' placeholder='Password' value={password } onChange={handlePasswordChange} />
        <button className='signup-btn' onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Login