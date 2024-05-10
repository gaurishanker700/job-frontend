import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



function Jobseeker() {
    const [jobseeker,setJobseeker] =useState([])
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const isadmin=JSON.parse(localStorage.getItem("admin"));
    const navigate=useNavigate()
    let adminName = isadmin?.username
    console.log(adminName)
    useEffect(()=>{
      if(!adminName) navigate("/admin/login")
    },[isadmin,adminName])
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
      }, [jobseeker]);
      console.log(jobseeker)
       // search function
  const handleSearch = () => {
    
    if (search === "") {
      setData(jobseeker);
    } else {
      let filtered = jobseeker.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
        );
      });
      setData(filtered);
      console.log(filtered);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search]);

  const deleteHandler=async(id)=>{
    const confirm = window.confirm('Are you sure to delete this user?');
    if(confirm){
      try {
        const res = await axios.delete(`http://localhost:4000/api/admin//deletejobseeker/${id}`,{withCredentials:true})
        console.log(res)
        
      } catch (error) {
        alert(error);
        
      }
    }
  }

  return (
    



    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/admin">Home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form className="d-flex" role="search"  onSubmit={handleSearch}>
        <input className="form-control me-2" type="search" placeholder="Search Employer" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>


      <h1 className="text-center">Job Seekers</h1>
      {jobseeker.length>0?(<>
      <table class="table table-striped" style={{margin:"20px auto"}}>
        <thead>
            <tr>
                
                <th scope="col">Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {
                jobseeker.map((el)=>{
                    return(
                        <>
                        <tr key={el._id}>
                            <td>{el.name}</td>
                            <td>{el.email}</td>
                            <td>{el.phone}</td>
                            <td>{el.role}</td>
                            <td><button class="btn btn-danger" onClick={() => deleteHandler(el._id)}> <i className="fa-solid fa-trash"></i> </button></td>
                        </tr>
                        
                        
                        </>
                    )
                })
            }
        </tbody>



      </table>
      
      
      
      </>):(<>
      <div class="d-flex justify-content-center align-items-center vh-100 "  >
       
        <p class="text-muted mt-3 fs-4 fw-bold text-center">No Job Seekers Yet!</p>
      </div>
      
      
      
      </>)}












    </>
  )
}

export default Jobseeker
