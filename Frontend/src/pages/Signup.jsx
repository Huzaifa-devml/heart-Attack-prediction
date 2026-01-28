import React from 'react'
import "./styles/Auth.css"
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react';
import BASE_URL from '../config';

function Signup() {
  const navigate=useNavigate();
  const[formdata,setformdata]=useState({
    email:"",
    password:"",
    name:"",
    username:"",
  })
  const handlechange=function(e){
    const{name,value}=e.target;
    setformdata({
      ...formdata,
      [name]:value
    })
  }
  const handleSignup=async function(){
    try{
      const response=await fetch(`${BASE_URL}/api/auth/register`,{
        method:"post",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(formdata)


      });
      const data=await response.json()
      if(data.success){
        alert("signup sucessful please login")
        navigate("/")
      }
      else{
        alert(data.message)
      }

    }
    catch(error){
      alert("something went wrong")
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        
        <input type="email" placeholder="Email" name="email" onChange={handlechange} />
        <input type="password" placeholder="Password" name="password" onChange={handlechange} />
        <input type="text" placeholder="name" name="name" onChange={handlechange} />
        <input type="text" placeholder="username" name="username" onChange={handlechange} />

        <button onClick={handleSignup}>Sign Up</button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
