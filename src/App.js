import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
// import About from "./components/About/About";
// import Certificate from "./components/Certificate/Certificate";
// import Videos from "./components/Videos/Videos";
// import Contact from "./components/Contact/Contact";
// import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
// import Videos from "./pages/VideoPage";
// import CertificateGenerator from "./components/CertificateGenerator/CertificateGenerator";
// import Authentication from "./components/Authentication/Authentication";
// import UnderConstruction from "./components/under_construction/UnderConstruction";
import LoadingSpinner from "./components/Loading/Loading";
// import Certificate from "./pages/Certificate";
import React, { useState, useEffect } from "react";
import "./App.css";
// import Contact from "./pages/Contact";
import AOS from "aos";
import "aos/dist/aos.css";
import "aos/dist/aos.js";
import CertificateHome from "./components/Certificate/CertificateHome";
import CertificateGenerate from "./components/Certificate/CertificateGenerate";
import CertificateGenerator from "./components/CertificateGenerator/CertificateGenerator";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
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
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificatehome" element={<CertificateHome />} />
          <Route
            path="/certificategeneration"
            element={<CertificateGenerate />}
          />
          <Route path="/getcertificate" element={<CertificateGenerator />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
