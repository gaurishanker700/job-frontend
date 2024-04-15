import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import{Link} from "react-router-dom"
import {useNavigate} from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'
import {GiHamburgerMenu} from 'react-icons/gi'

function Navbar() {
  const [show,setShow]=useState(false)
  const {isAuthenticated,setIsAuthenticated,user}=useContext(Context)
  const navigate=useNavigate()
  const handleLogout= async ()=>{
    try {
      const res=await axios.get("http://localhost:4000/api/user/logout",{withCredentials:true})
      toast.success(res.data.message)
      setIsAuthenticated(false)
      navigate("/login");
      
    } catch (error) {
      toast.error(error.res.data.message);
      setIsAuthenticated(true)
      
    }
  }
  return (
    <>
     <nav className={isAuthenticated ?"navbarShow":"navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="JobZee-logos__white.png"/>
        </div>
        <ul className={!show?"menu":"show-menu menu"}>
          <li>
            <Link to={"/"} onClick={()=>setShow(false)}> Home</Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={()=>setShow(false)}> All Jobs</Link>
          </li>
          <li>
            <Link to={"/application/me"} onClick={()=>setShow(false)}>
              {user && user.role==="Employer"?"APPLICANT'S APPLICATION":"MY APPLICATIONS"}</Link>
          </li>
          {
            user && user.role==="Employer" ? (
            <>
            <li>
              <Link to={"/job/post"} onClick={()=>setShow(false)}> POST NEW JOB</Link>
            </li>
            <li>
              <Link to={"/job/me"} onClick={()=>setShow(false)}> VIEW YOUR JOBS</Link>
            </li>
            
            </>

            ):(<></>)
          }
          <button onClick={handleLogout}> LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={()=>setShow(!show)}/>

        </div>
      </div>
     </nav>
    </>
  )
}

export default Navbar
