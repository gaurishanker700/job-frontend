import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { IoMdSend } from 'react-icons/io'

function HowitWorks() {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>How It Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus/>
            <p>create a account</p>
            <p>Create a new account by filling the required information and role</p> 
          </div>
          <div className="card">
            <MdFindInPage/>
            <p>Find a job or post a job</p>
            <p>After creating your account you can find or post a job based on your role</p> 
          </div>
          <div className="card">
            <IoMdSend/>
            <p>create a account</p>
            <p>Create a new account by filling the required information and role</p> 
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default HowitWorks
