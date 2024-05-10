import React, { useState } from "react";
import "./Alogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res= (await axios.post("http://localhost:4000/api/admin/login",formData,{Withcrendial:true})).data
        console.log(res.success);
        if(res.success) {navigate("/admin")
            localStorage.setItem("admin", JSON.stringify(res.
                existingUser))


        }
            


    } catch (error) {
        alert("Admin Login Failed");

    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="login-container">
              <div className="login-icon">
                <i className="fas fa-user-cog" /> {/* Changed to Admin icon */}
              </div>
              <h2>Admin Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div className="d-flex justify-content-center align-items center">
                  <button
                    type="submit"
                    className=" w-100 mx-auto mt-5 btn btn-lg btn-outline-info btn-block"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
