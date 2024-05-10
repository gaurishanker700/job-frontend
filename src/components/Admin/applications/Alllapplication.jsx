import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Alllapplication() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const isadmin=JSON.parse(localStorage.getItem("admin"));
  const navigate=useNavigate()
  let adminName = isadmin?.username
  console.log(adminName)
  useEffect(()=>{
    if(!adminName) navigate("/admin/login")
  },[isadmin,adminName])

  // Fetch all applications data from the server
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
          setApplications(appli.applications);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    allApplications();
  }, [applications]);
  console.log(applications);
  const handleSearch = () => {
    if (search === "") {
      setData(applications);
    } else {
      let filtered = applications.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
        );
      });
      setData(filtered);
      console.log("filtered", filtered);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search]);
  const handleDelete=async(id)=>{
    const confirm=window.confirm('Are you sure to delete this job?')
    if(confirm){
     const res=await axios.delete(`http://localhost:4000/api/admin/deleteallApplications/${id}`,{withCredentials:true})
     // console.log(res)
    }
     
   }

  
  

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin/employer"
                >
                  Employers
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Applications"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <h1 className="text-center">All Application</h1>
      {data.length > 0 ? (
        <>
          <table className="table table-striped table-hover text-center ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col"> CoverLetter</th>
                <th scope="col">Resume</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el) => {
                return (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.phone}</td>
                    <td>{el.address}</td>
                    <td>{el.coverLetter}</td>
                    <td>
                      <img
                        height={70}
                        width={70}
                        src={el.resume.url}
                        alt="resume"
                      />
                    </td>
                    <td>
                      <button className="btn btn-danger" type="submit" onClick={() => handleDelete(el._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>
         
          <>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col"> CoverLetter</th>
                  <th scope="col">Resume</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((el) => {
                  return (
                    <tr key={el._id}>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.phone}</td>
                      <td>{el.address}</td>
                      <td>{el.coverLetter}</td>
                      <td>
                        <img
                          height={70}
                          width={70}
                          src={el.resume.url}
                          alt="resume"
                        />
                      </td>
                      <td>
                        <button className="btn btn-danger" type="submit" onClick={() => handleDelete(el._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
          
        </>
      )}
    </>
  );
}

export default Alllapplication;
