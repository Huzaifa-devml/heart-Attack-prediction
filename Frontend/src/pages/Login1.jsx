
import React, { useState } from 'react'
import "./styles/Auth.css"
import { Link, useNavigate } from 'react-router-dom'
import BASE_URL from '../config'

function Login1() {
    const[email,setEmail]=useState("")
      const[password,setPassword]=useState("")
      const[error,setError]=useState("")
      const navigate=useNavigate()
      const handlelogin=async function(){
        console.log("button clicked")
        const response=await fetch(`${BASE_URL}/api/auth/login`,{
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            email,
            password,
          })
    
        });
        const data=await response.json()
        console.log("login response",data)
        
        if(data.success){
          console.log("login sucessful navigating")
          navigate("/dashboard")
        }
        else{
          setError(data.message)
        }
        console.log(data)
    
    
      }
  return (
    <div className="auth-container">
          <div className="auth-card">
            <h2>Login</h2>
    
            <input type="email" placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)} />
    
            <button onClick={handlelogin}>Login</button>
    
            <p>
              New user? <Link to="/signup">Create account</Link>
            </p>
          </div>
        </div>
  )
}

export default Login1
