import { useState } from "react"
import React from 'react'
import "./signup.css"
import Config from "../../Config/config.json"
import axios from "axios"

const serverURL = Config.ServerURL

const Signup = () => {
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

    const handleSignup = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${serverURL}/api/auth/signup`, {
                email:email,
                password:password
            })

             alert(`Signup Successfull: ${response.data}`)
            setEmail("");
            setPassword("");
        } catch (err) {
            console.log(err)
            alert(`Err: ${err.response.data}`)
        }

    }
  return (
      <div className='signup-container'>
          <div className="inner-signup-container">
              <input className='signup-input' placeholder='Email' value={ email} onChange={handleEmailChange} />
              <input className='signup-input' placeholder='Password' value={password } onChange={handlePasswordChange} />
              <button className='signup-btn' onClick={handleSignup}>Signup</button>
          </div>
    </div>
  )
}

export default Signup