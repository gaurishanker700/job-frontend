import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(Context);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/job/singlejob/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setJob(response.data.job);
      })
      .catch((err) => console.log(err.response.data.json));
  }, []);
  if (!isAuthenticated) {
    navigate("/login");
  }
  return (
    <>
      <div className="jobDetail page">
        <div className="container">
          <h3>Job Detail</h3>
          <div className="banner">
            <p>
              {" "}
              Title:<span>{job.title}</span>
              <br />
            </p>
            <p>
              {" "}
              Category:<span>{job.category}</span>
              <br />
            </p>
            <p>
              {" "}
              Country:<span>{job.country}</span>
              <br />
            </p>
            <p>
              {" "}
              City:<span>{job.city}</span>
              <br />
            </p>
            <p>
              {" "}
              Location:<span>{job.location}</span>
              <br />
            </p>
            <p>
              {" "}
              Description:<span>{job.description}</span>
              <br />
            </p>
            <p>
              {" "}
              Job Posted On:<span>{job.jobPostedOn}</span>
              <br />
            </p>
            <p>
              Salary:{" "}
              {job.fixedSalary ? (
                <span>{job.fixedSalary}</span>
              ) : (
                <span>
                  {job.salaryFrom}-{job.salaryTo}
                </span>
              )}
            </p>
            <p>
              {
                user && user.role === "Employer"?<></>: <Link to={`/application/${job._id}`}>Apply Now</Link>
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetails;
