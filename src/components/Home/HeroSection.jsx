import React from 'react'
import { FaSuitcase } from 'react-icons/fa'

function HeroSection() {
  const details=[
    {
      id:1,
      title:"Explore the world of  digital marketing",
      subTitle: "Discover our expertise and services",
      icon:<FaSuitcase/>
    },
    {
      id:2,
      title:"Explore the world of  digital marketing",
      subTitle: "Discover our expertise and services",
      icon:<FaSuitcase/>
    },
    {
      id:3,
      title:"Explore the world of  digital marketing",
      subTitle: "Discover our expertise and services",
      icon:<FaSuitcase/>
    },
    {
      id:4,
      title:"Explore the world of  digital marketing",
      subTitle: "Discover our expertise and services",
      icon:<FaSuitcase/>
    },
  ]
  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Finds a job that suits </h1>
          <h1>Your Profile</h1>
          <p>Unlocking potential with precision and passion. Dynamic problem-solver adept in diverse environments. Seeking a role to innovate and collaborate within a forward-thinking team.</p>
        </div>
        <div className="image">
          <img src="/heroS.jpg" alt="hero" />
        </div>
      </div>
      <div className="details">
        {
          details.map(el=>{
            return(
              <div className="card" key={el.id}>
                <div className="icon">{el.icon}</div>
                <div className="content">
                  <p>{el.title}</p>
                  <p>{el.subTitle}</p>
                </div>
              </div>
            )
          })
        }

      </div>
    </div>
    
  )
}

export default HeroSection
