import React, { useContext } from 'react'
import { Context } from '../../main'
import {Navigate} from "react-router-dom"
import  HeroSection from "./HeroSection"
import  HowitWorks from "./HowitWorks"
import  PopularCategories from "./PopularCategories"
import  PopularCompanies from "./PopularCompanies"

function Home() {
  const {isAuthenticated}=useContext(Context)
  if(!isAuthenticated){
    return <Navigate to={'/login'} />
  }
  return (
    <section className="homePage Page">
      <HeroSection/>
      <HowitWorks/>
      <PopularCategories/>
      <PopularCompanies/>
     
    </section>
  )
}

export default Home
