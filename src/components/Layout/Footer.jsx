import React, { useContext } from 'react'
import { Context } from '../../main'
import { Link } from 'react-router-dom'
import {FaFacebook,FaYoutube,FaLinkedin} from 'react-icons/fa'
import {RiInstagramFill,} from 'react-icons/ri'
function Footer() {
  const {isAuthenticated}=useContext(Context)
  return (
    <footer className={isAuthenticated ?"footerShow":"footerHide"}>
      <div>&copy; All rights reserved BY Gaurishanker</div>
      <div>
        <Link to={"/"} target="_blank"><FaFacebook/></Link>
        <Link to={"/"} target="_blank"><RiInstagramFill/></Link> 
        <Link to={"/"} target="_blank"> <FaLinkedin/></Link> 

      </div>
    
      
    </footer>
  )
}

export default Footer
