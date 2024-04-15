import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast'


function Application() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [coverLetter,setCoverLetter]=useState("")
  const [phone,setPhone]=useState("")
  const [address,setAddress]=useState("")
  const [resume,setResume]=useState(null)
  const {isAuthenticated,user}=useContext(Context)
  const navigate=useNavigate()
  // file input change
  function handleFileInputChange(e){
    const resume=e.target.files[0]
    setResume(resume)
  }
  const {id}=useParams()
  const handleApplication=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('coverLetter', coverLetter);
    formData.append('resume', resume);
    formData.append('jobId', id);
    try {
      const {data}=await axios.post('http://localhost:4000/api/application/post',formData,{withCredentials:true,
        headers:{
          'Content-Type':'multipart/form-data'
        }
      
      })
      setName("")
      setEmail("")
      setPhone("")
      setAddress("")
      setCoverLetter("")
      setResume(null)
      toast.success(data.message)
      navigate("/job/getall")
      
      
    } catch (error) {
      toast.error(error.response.data.message)
      
    }
  }
  if (!isAuthenticated || user && user.role ==="Employer") {
    navigate("/")

  }
  return (
    <>
     <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input type='text' placeholder='your name' value={name} onChange={(e)=>setName(e.target.value)}/>
          <input type='text' placeholder='your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type='number' placeholder='your phone' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          <input type='text' placeholder='your address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
          <textarea value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)} placeholder='your cover letter'/>
          <div>
            <label style={{ textAlign:"start",display:"block", fontSize:"20px"}}> Select Resume</label>
            <input type='file' accept='.jpg, .png, .webp, ' onChange={handleFileInputChange} style={{width:"100%"}}/>
          </div>
          <button type='submit'> Send Application</button>

        </form>
      </div>

     </section>
    </>
  )
}

export default Application
