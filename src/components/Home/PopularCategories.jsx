import React, { useEffect, useState } from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import axios from "axios";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];
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
  },[])

  console.log(cats)
  
  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {cats.map((element) => {
          return (
            <div className="card" key={element._id}>
              <div className="icon"><i className="fas fa-briefcase" /></div>
              <div className="text">
                <p>{element.name}</p>
                <p>"305 Open Positions"</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
