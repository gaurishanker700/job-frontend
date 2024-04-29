import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Ensure you're using 'useLocation' from 'react-router-dom'

const MaybeNavbar = ({ children }) => {
  const [show, setShow] = useState(true);

  const location = useLocation();

  useEffect(() => {
    // Use the 'pathname' property of 'location'
    if (location.pathname === "/admin"|| location.pathname === "/admin/jobs"|| location.pathname === "/admin/employer") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [location.pathname]);

  return <div>{show && children}</div>;
};

export default MaybeNavbar;
