import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const { isAuthenticated } = useContext(Context);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/job/getall", {
          withCredentials: true,
        });
        console.log("object,",res)
        setJobs(res.data.jobs);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetch()
  }, []);
  // console.log("Set jobs",jobs);
  // if(!isAuthenticated){
  //   navigate("/login")
  // }
  const handleSearch = (category) => {
    if (search === "") {
      setData(jobs);
    } else {
      let filtered = jobs.filter((item) => {
        return (
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.country.toLowerCase().includes(search.toLowerCase()) ||
          item.city.toLowerCase().includes(search.toLowerCase())
        );
      });
      setData(filtered);
      console.log("filtered", data);
    }
  };



  useEffect(() => {
    handleSearch();
  }, [search]);


  const handleCategoryClick = (category) => {
    setSearch(category);
    handleSearch(category);
  };

  return (
    <>
    
<div>
  <h5 className="text-center">Popular Job Categories</h5>
  <button className="btn btn-outline-primary mb-3 btn-lg ms-4" onClick={()=>{handleCategoryClick("mern")}}>Mern</button>
  <button className="btn btn-outline-info mb-3 btn-lg ms-4" onClick={()=>{handleCategoryClick("Graphics & Design")}}>Graphics & Design</button>
</div>
      <section className="jobs page">
        <div className="container">
          <h1>All Available Jobs</h1>
          <div className="container">
            <form onSubmit={handleSearch}>
              <div className="form-group">
                <input
                  type="text"
                  className="w-100 form-control"
                  placeholder="Search your dream job"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="banner">
            {
              data.length>0?(<>
              {data &&
              data.map((el) => {
                return (
                  <div className="card" key={el._id}>
                    <p>{el.title}</p>
                    <p>{el.category}</p>
                    <p>{el.country}</p>
                    <Link to={`/job/${el._id}`}>View Details</Link>
                  </div>
                );
              })}
              
              
              
              </>):(<>
              {jobs &&
              jobs.map((el) => {
                return (
                  <div className="card" key={el._id}>
                    <p>{el.title}</p>
                    <p>{el.category}</p>
                    <p>{el.country}</p>
                    <Link to={`/job/${el._id}`}>View Details</Link>
                  </div>
                );
              })}
              
              
              </>)
            }


            
          </div>
        </div>
      </section>
    </>
  );
}

export default Jobs;
