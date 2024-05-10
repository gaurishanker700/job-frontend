import React,{useEffect,useContext} from 'react';
import './App.css'
import { Context } from './main';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import JobDetails from './components/Job/JobDetails'
import MyJobs from './components/Job/MyJobs'
import PostJob from './components/Job/PostJob'
import Application from './components/Application/Application'
import MyApplications from './components/Application/MyApplications'
import NotFound from './components/NotFound/NotFound'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import Ahome from './components/Admin/Ahome';
import MaybeNavbar from './components/MaybeNavbar/MaybeNavbar';
import AllJobs from './components/Admin/jobs/AllJobs';
import AllEmployer from './components/Admin/Employer/AllEmployer';
import Alllapplication from './components/Admin/applications/Alllapplication';
import Jobseeker from './components/Admin/job seeker/Jobseeker';
import AdminLogin from './components/Auth/AdminLogin';








function App() {
  const {isAuthenticated,setIsAuthenticated, setUser}=useContext(Context)
  useEffect(()=>{
    const fetchUser=async()=>{
      try {
        const res= await axios.get("http://localhost:4000/api/user/getuser",{withCredentials:true})
        setUser(res.data.user)
        setIsAuthenticated(true)
        
      } catch (error) {
        setIsAuthenticated(false)
      }

    }
    fetchUser()



  } ,[isAuthenticated]);
  



  return (
    <>
    <Router>
     <MaybeNavbar>
     <Navbar/>
     </MaybeNavbar>
      <Routes>


        <Route path="/login"element={<Login />}/>
        <Route path="/register"element={<Register />}/>
        <Route path="/"element={<Home />}/>
        <Route path="/job/getall"element={<Jobs />}/>
        <Route path="/job/:id"element={<JobDetails />}/>
        <Route path="/job/post"element={<PostJob />}/>
        <Route path="/job/me"element={<MyJobs />}/>
        <Route path="/application/:id"element={<Application />}/>
        <Route path="/application/me"element={<MyApplications />}/>
        <Route path="/admin/login"element={<AdminLogin/>}/>
        <Route path="/admin"element={<Ahome/>}/>
        <Route path="/admin/jobs"element={<AllJobs/>}/>
        <Route path="/admin/employer"element={<AllEmployer/>}/>
        <Route path="/admin/application"element={<Alllapplication/>}/>
        <Route path="/admin/jobseeker" element={<Jobseeker/>}/>

        <Route path="*"element={<NotFound />}/>


      </Routes>
      <Footer/>
      <Toaster/>
    </Router>
     
    </>
  )
}

export default App
