import { faPersonDigging } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./UnderConstruction.css";
import LoadingSpinner from "../Loading/Loading";
import React, { useState, useEffect } from "react";

const UnderConstruction = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate a data fetch
    setTimeout(() => {
      setLoading(false);
      setData();
    }, 1500); // simulate a 2-second loading time
  }, []);

  return (
    <>
      <div className="App">
        {loading ? <LoadingSpinner loading={loading} /> : <div>{data}</div>}
      </div>
      <div className="container under-construction">
        <FontAwesomeIcon icon={faPersonDigging} size="3x" />
        <h2>Page under construction</h2>
      </div>
    </>
  );
};

export default UnderConstruction;
