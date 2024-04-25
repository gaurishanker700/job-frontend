import React, { useEffect, useState } from "react";
import "./ahome.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Ahome() {
  const [emp, setEmp] = useState([]);
  const [job, setJob] = useState([]);
  const [jobseeker, setJobseeker] = useState([]);
  const [application, setApplication] = useState([]);

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
          await axios.get("http://localhost:4000/api/admin/applications", {
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
  
  console.log(application)
  
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <ul>
          <li>
            <Link>Home</Link>
          </li>
          <li>
            <Link>All Jobs</Link>
          </li>
          <li>
            <Link>All Job Seekers</Link>
          </li>
          <li>
            <Link>All Employers</Link>
          </li>
          <li>
            <Link>All Applications</Link>
          </li>
        </ul>
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
                  <Link>All Jobs</Link>
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
                  <Link>View Job Seekers</Link>
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
                  <Link>View Employer</Link>
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
                  <Link>View Application</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ahome;
