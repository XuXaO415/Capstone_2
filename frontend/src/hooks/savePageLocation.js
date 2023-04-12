import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function SavePageLocation() {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("pageLocation", location.pathname);
  }, [location]);
}

export default SavePageLocation;
