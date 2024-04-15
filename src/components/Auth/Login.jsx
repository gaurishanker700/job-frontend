import React, { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Link, Navigate} from "react-router-dom"
import { FaPencilAlt, FaRegUser, } from 'react-icons/fa'
import { MdOutlineMailOutline } from 'react-icons/md'
import {FaPhoneFlip} from 'react-icons/fa6'
import { RiLock2Fill } from 'react-icons/ri'


function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [role,setRole]=useState("")
  const {isAuthenticated,setIsAuthenticated,user,setUser}=useContext(Context)
  const handleLogin=async(e)=>{
    e.preventDefault()
    try {
      const {data}= await axios.post("http://localhost:4000/api/user/login",{email,password,role},{withCredentials:true,
       
      
      })
      toast.success(data.message)
      
      setEmail("")
    
      setPassword("")
      setRole("")
      setIsAuthenticated(true)
      
      
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
      
    }

  }
  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }

  return (
    <>
     <div className="authPage">
      <div className="container">
        <div className="header">
          <img src="/JobZeelogo.png"alt="logo"/>
          <h3>Login </h3>
        </div>
        <form>
          <div className="inputTag">
            <label>Login as</label>
            <div>
              <select value={role} onChange={(e)=>setRole(e.target.value)}>
                <option value="" disabled selected >Select your role..</option>
                <option value='Employer'>Employer</option>
                <option value='Job Seeker'>Job Seeker</option>
              </select>
              <FaRegUser/>
            </div>
          </div>
          
          <div className="inputTag">
            <label>Email</label>
            <div>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your Email"/>
              <MdOutlineMailOutline/>
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Your password"/>
              <RiLock2Fill/>
            </div>
          </div>
          <button onClick={handleLogin} type="submit">Login</button>
          <Link to={"/register"}>Register Now</Link>




        </form>
        
      </div>
      <div className="banner">
        <img src="/login.png" alt="login" />
      </div>

     </div>
    </>
  )
}

export default Login
