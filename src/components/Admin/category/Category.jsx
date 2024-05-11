import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

function Category() {
  const[cats,setCats]=useState([])
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
  },[cats])

  console.log(cats)

  const handledelte=async(id)=>{
    try {
      let confirm=window.confirm('Are you sure you want to delete this category')
    if(!confirm)return
    const res= await axios.delete(`http://localhost:4000/api/admin/deletecategory/${id}`)
      
    
      
    } catch (error) {
      console.log("error in delete category", error)
      
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
      <form className="d-flex" role="search"  >
        <input className="form-control me-2" type="search" placeholder="Search Employer" aria-label="Search"  />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
   
   
{cats.length > 0 ? (
  <div className="container mt-5">
    <div className="row">
      {cats.map((el, index) => (
        <div className="col-sm-4" key={index}>
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body text-center">
              <h4><i className="fas fa-briefcase" /></h4>
              <h6>{el.name}</h6>
              <button type="button" className="btn btn-danger mt-3" onClick={()=>handledelte(el._id)} ><i className="fas fa-trash-alt" /> Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <p>No results</p>
)}





      
    </>
  )
}

export default Category
