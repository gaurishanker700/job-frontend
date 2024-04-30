import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function AllJobs() {
  const [job, setJob] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const alljobs = async () => {
      try {
        const jobs = (
          await axios.get("http://localhost:4000/api/admin/alljobs", {
            withCredentials: true,
          })
        ).data;
        console.log("hello",jobs)
   
        if (jobs.success) {
          setJob(jobs.jobs);
        }
        
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    alljobs();
  }, []);
  // console.log(job);


  const handleDelete=async(id)=>{
   const confirm=window.confirm('Are you sure to delete this job?')
   if(confirm){
    const res=await axios.delete(`http://localhost:4000/api/admin/remove/${id}`)
    // console.log(res)
   }
    
  }
  const handleSearch = () => {
    
    if (search === "") {
      setData(job);
    } else {
      let filtered = job.filter((item) => {
        return (
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.country.toLowerCase().includes(search.toLowerCase()) ||
          item.city.toLowerCase().includes(search.toLowerCase()) 
        );
      });
      setData(filtered);
      console.log("filtered",filtered);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search]);
  
  





   
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
          <Link className="nav-link active" aria-current="page" to="/admin/employer">Employers</Link>
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
      <form className="d-flex" role="search" onSubmit={handleSearch}  >
      <input className="form-control me-2" type="search" placeholder="Search Jobs" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
        <button className="btn btn-outline-success"  type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

{
  data.length>0?(<>
  {/* Table */}
<table class="table table-striped table-hover align-middle text-center">
<colgroup>
      <col style={{ width: 'auto' }} /> 
      <col style={{ width: 'auto' }} />
      <col style={{ width: 'auto' }} />
      <col style={{ width: 'auto' }} />
      <col style={{ width: 'auto' }} />
      <col style={{ width: 'auto' }} />
      <col style={{ width: 'auto' }} />
    </colgroup>
  <thead>
  <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Category</th>
        <th>Country</th>
        <th>City</th>
        <th>Location</th>
        <th>Action</th>
      </tr>

  </thead>
  <tbody>
  {
        data.map((val) => (
          <tr key={val._id}>
            <td>{val.title}</td>
            <td>{val.description}</td>
            <td>{val.category}</td>
            <td>{val.country}</td>
            <td>{val.city}</td>
            <td>{val.location}</td>
            <td>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete(val._id)}><i className="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        ))
      }

  </tbody>
</table>
  
  
  
  </>):(<>
    <div style={{ overflowX: 'auto' }}> 
  <table className="table table-striped table-bordered table-hover" style={{ width: '100%' }}>
    <colgroup>
      <col style={{ width: 'auto' }} /> 
      <col style={{ width: 'auto' }} />
      <col style={{ width: 'auto' }} />
      <col style={{ width: 'auto' }} />
      <col style={{ width: 'auto' }} />
      <col style={{ width: 'auto' }} />
      <col style={{ width: 'auto' }} />
    </colgroup>
    <thead className="table-dark">
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Category</th>
        <th>Country</th>
        <th>City</th>
        <th>Location</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {job.length>0?(<>
      {
        job.map((val) => (
          <tr key={val._id}>
            <td>{val.title}</td>
            <td>{val.description}</td>
            <td>{val.category}</td>
            <td>{val.country}</td>
            <td>{val.city}</td>
            <td>{val.location}</td>
            <td>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete(val._id)}><i className="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        ))
      }
      
      
      
      </>):(<>
      <div class="text-center mt-5">
        <h1><i class='bx bxs-error'></i></h1>
        <h4>No Jobs Found!</h4>
      </div>
      
      
      </>)}
    </tbody>
  </table>
</div>
  
  
  </>)
}





  



    
     
    </>
  );
}

export default AllJobs;
