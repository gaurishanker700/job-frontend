import React, { useEffect, useState } from "react";
import "./ahome.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast'

function Ahome() {
  const [emp, setEmp] = useState([]);
  const [job, setJob] = useState([]);
  const [jobseeker, setJobseeker] = useState([]);
  const [application, setApplication] = useState([]);
  const [category, setCategory] = useState([]);
  const[cats,setCats]=useState([]);
  const isadmin=JSON.parse(localStorage.getItem("admin"));
  const navigate=useNavigate()
  let adminName = isadmin?.username
  console.log(adminName)
  useEffect(()=>{
    if(!adminName) navigate("/admin/login")
  },[isadmin,adminName])
const handlelogout=()=>{
  localStorage.removeItem('admin')
  navigate("/admin/login");
}

  useEffect(() => {
    const allEmployer = async () => {
      try {
        const employer = (
          await axios.get("http://localhost:4000/api/admin/employer", {
            withCredentials: true,
          })
        ).data;
        // console.log(employer)
        if (employer.success) {
          setEmp(employer.employer);
        }
      } catch (error) {}
    };
    allEmployer();
  }, []);
  useEffect(() => {
    const alljobs = async () => {
      try {
        const jobs = (
          await axios.get("http://localhost:4000/api/admin/alljobs", {
            withCredentials: true,
          })
        ).data;
        // console.log(employer)
        if (jobs.success) {
          setJob(jobs.jobs);
        }
      } catch (error) {}
    };
    alljobs();
  }, []);
  useEffect(() => {
    const alljobseeker = async () => {
      try {
        const jobseeker = (
          await axios.get("http://localhost:4000/api/admin/jobseekers", {
            withCredentials: true,
          })
        ).data;
        // console.log(employer)
        if (jobseeker.success) {
          setJobseeker(jobseeker.jobseeker);
        }
      } catch (error) {}
    };
    alljobseeker();
  }, []);
  useEffect(() => {
    const allApplications = async () => {
      try {
        const appli = (
          await axios.get("http://localhost:4000/api/admin/allApplications", {
            withCredentials: true,
          })
        ).data;
        // console.log(employer)
        if (appli.success) {
          setApplication(appli.applications);
        }
      } catch (error) {}
    };
    allApplications();
  }, []);
  
  // console.log(application)
  console.log(("categorrrr",category))
  const handlecat=async(e) => {
    e.preventDefault();
   try {
    const res= await axios.post("http://localhost:4000/api/admin/addcategory",{name:category},{withCredentials:true})
    console.log(res.data)

    setCategory("")
    toast.success(res.data.message)
    
   } catch (error) {
    console.log("category error",error)
    
   }
    
  }
  const fetchallcategories =async()=>{
    try {
      let res=(await axios.get("http://localhost:4000/api/admin/allcategories",{withCredentials:true})).data;
      // console.log(res)
      setCats(res.cats)

      
    } catch (error) {
      console.log("category errors",error)
    }
  }
  useEffect(()=>{
    fetchallcategories()
  },[])
  console.log(cats)

  
  return (
    <>
    <h1 className="text-center">Admin Dashboard</h1>
    <div className="admin-dashboard">
     
     <div className="sidebar">
       <ul>
         <li>
           <Link>Home</Link>
         </li>
         <li>
           <Link to="/admin/jobs">All Jobs</Link>
         </li>
         <li>
           <Link to="/admin/jobseeker">All Job Seekers</Link>
         </li>
         <li>
           <Link to="/admin/employer">All Employers</Link>
         </li>
         <li>
           <Link to="/admin/application">All Applications</Link>
         </li>
         
       </ul>
       <form onSubmit={handlecat}>
  <div className="mb-3">
    
    <input type="text" className=" w-100 form-control" id="cat" value={category} placeholder="add job category" onChange={(e)=>setCategory(e.target.value)}  />
  </div>
  <button type="submit" className="btn btn-outline-info btn-lg w-100  ">Submit</button>
</form>



       <div><button class="btn btn-outline-danger btn-lg w-100 mt-5" onClick={handlelogout}>logout</button></div>
     </div>
     <div className="main-content">
       <div className="container">
         <div className="row">
           <div className="col-md-4">
             <div className="card">
               <div className="card-body">
                 <h5 className="card-title">Jobs</h5>
                 <h6 className="card-subtitle mb-2 text-muted">
                   Total: <sup>{job.length}</sup>
                 </h6>
                 <p className="card-text">Here you can manage jobs.</p>
                 <Link to="/admin/jobs">All Jobs</Link>
               </div>
             </div>
           </div>
           <div className="col-md-4">
             <div className="card">
               <div className="card-body">
                 <h5 className="card-title">Job Seekers</h5>
                 <h6 className="card-subtitle mb-2 text-muted">
                   Total: <sup>{jobseeker.length}</sup>
                 </h6>
                 <p className="card-text">Here you can manage Job Seekers.</p>
                 <Link to="/admin/jobseeker">View Job Seekers</Link>
               </div>
             </div>
           </div>
           <div className="col-md-4">
             <div className="card">
               <div className="card-body">
                 <h5 className="card-title">Employers</h5>
                 <h6 className="card-subtitle mb-2 text-muted">
                   Total: <sup>{emp.length}</sup>
                 </h6>
                 <p className="card-text">Here you can manage Employer.</p>
                 <Link to="/admin/employer">View Employer</Link>
               </div>
             </div>
           </div>
           <div className="col-md-4">
             <div className="card">
               <div className="card-body">
                 <h5 className="card-title">AppliCations</h5>
                 <h6 className="card-subtitle mb-2 text-muted">
                   Total: <sup>{application.length}</sup>
                 </h6>
                 <p className="card-text">Here you can manage Applications.</p>
                 <Link to="/admin/application">View Application</Link>
               </div>
             </div>
           </div>
           <div className="col-md-4">
             <div className="card">
               <div className="card-body">
                 <h5 className="card-title">All Categories</h5>
                 <h6 className="card-subtitle mb-2 text-muted">
                   Total: <sup>{cats.length}</sup>
                 </h6>
                 <p className="card-text">Here you can manage Categories.</p>
                 <Link to="/admin/category">View Categories</Link>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
    
    
    </>
    
  );
}

export default Ahome;
