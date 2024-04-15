import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Context } from '../../main';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Jobs() {
  const [jobs,setJobs] =useState([]);
  const {isAuthenticated}=useContext(Context)
  const navigate=useNavigate()
  useEffect(()=>{
    try {
      axios.get("http://localhost:4000/api/job/getall",{withCredentials:true}).then(response =>{
        setJobs(response.data)
      })
      
    } catch (error) {
      console.log('Error', error)
      
    }


  },[])
  if(!isAuthenticated){
    navigate("/login")
  }
  return (
    <>
     <section className="jobs page">
      <div className="container">
        <h1>All Available Jobs</h1>
        <div className="banner">
          {
            jobs.jobs && jobs.jobs.map((el)=>{
              return(
                <div className="card"  key={el._id}>
                  <p>{el.title}</p>
                  <p>{el.category}</p>
                  <p>{el.country}</p>
                  <Link to={`/job/${el._id}`}>View Details</Link>


                </div>
              )
            })
          }
        </div>
      </div>

     </section>
    </>
  )
}

export default Jobs
