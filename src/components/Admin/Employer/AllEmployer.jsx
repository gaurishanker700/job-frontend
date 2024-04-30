import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllEmployer() {
  const [emp, setEmp] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  // get all employer data
  useEffect(() => {
    const allEmployer = async () => {
      try {
        const employer = (
          await axios.get("http://localhost:4000/api/admin/employer", {
            withCredentials: true,
          })
        ).data;
        const em = employer.employer;
        setEmp(em);
      } catch (error) {
        alert(error);
      }
    };
    allEmployer();
  }, [emp]);

  // search function
  const handleSearch = () => {
    
    if (search === "") {
      setData(emp);
    } else {
      let filtered = emp.filter((item) => {
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
        const res = await axios.delete(`http://localhost:4000/api/admin/deleteemployer/${id}`,{withCredentials:true})
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




      <h1 className="text-center">All Employers</h1>
     
      {/* <form onSubmit={handleSearch}>
        <input
          className="form-control"
          type="search"
          placeholder="Search employer by name and email"
          onChange={(e) => setSearch(e.target.value)}
        />
        
      </form> */}
      <>
        {data.length > 0 ? (
          <>
            <table class="table table-striped table-hover text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.phone}</td>
                        <td>{e.role}</td>
                        <td>
                          <button
                            onClick={() => deleteHandler(e._id)}
                            className="btn btn-danger"
                          >
                           <i class="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <>
            {emp.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {emp.map((e, index) => (
                    <tr key={index}>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.phone}</td>
                      <td>{e.role}</td>
                      <td>
                        <button
                          onClick={() => deleteHandler(e._id)}
                          className="btn btn-danger"
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">
                <h1>No employer found</h1>
              </div>
            )}
          </>
        )}
      </>
    </>
  );
}

export default AllEmployer;
