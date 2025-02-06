import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./CertificateGenerator.css";
import certificateImg from "../assets/certificate-nocontent.png";

const CertificateGenerator = () => {
  const [details, setDetails] = useState({
    name: "",
    sodo: "",
    parentsname: "",
    photo: "",
    field: "",
    certificateCode: "",
    dateOfIssue: "",
    category: "", // Added for select field
  });
  const certificateRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setDetails({ ...details, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // const formatDate = (date) => {
  //   const [year, month, day] = date.split("-");
  //   return `${day}-${month}-${year}`;
  // };

  const validateForm = () => {
    const { name, photo, field, certificateCode, category, sodo, parentsname } =
      details;
    return (
      name &&
      photo &&
      field &&
      certificateCode &&
      category &&
      sodo &&
      parentsname
    );
  };

  const handleDownloadPDF = () => {
    if (!validateForm()) {
      alert("Please fill out all fields before downloading the certificate.");
      return;
    }

    const input = certificateRef.current;
    html2canvas(input, { scale: 1.5 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [595, 842],
      });
      pdf.addImage(imgData, "PNG", 0, 0, 595, 842);
      pdf.save(`${details.name}_certificate.pdf`);
    });
  };

  return (
    <div className="container">
      <h1>Aasiyan Book of World Records</h1>
      <form className="form">
        <label className="label">
          Name:
          <br />
          <select
            name="sodo"
            className="input"
            value={details.sodo}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="S/O">S/O</option>
            <option value="D/O">D/O</option>
          </select>
          <input
            className="input"
            type="text"
            name="name"
            value={details.name}
            onChange={handleChange}
          />
        </label>
        <label className="lable">
          <b>Parents Name</b>
          <input
            className="input"
            type="text"
            name="parentsname"
            value={details.parentsname}
            onChange={handleChange}
          />
        </label>
        <label className="label">
          Photo:
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
        </label>
        <label className="label">
          Category:
          <select
            className="input"
            name="category"
            value={details.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Bharathanatyam">Bharathanatyam</option>
            <option value="Silambam">Silambam</option>
            <option value="Yoga">Yoga</option>
            <option value="Nattupura Kalaigal">Nattupura Kalaigal</option>
            <option value="Themmangu Pattu">Themmangu Pattu</option>
          </select>
        </label>
        <label className="label">
          Aadhar No:
          <input
            className="input"
            type="text"
            name="field"
            value={details.field}
            onChange={handleChange}
          />
        </label>
        <label className="label">
          Certificate Code:
          <input
            className="input"
            type="text"
            name="certificateCode"
            value={details.certificateCode}
            onChange={handleChange}
          />
        </label>
      </form>

      <div ref={certificateRef} className="certificate">
        <img
          src={certificateImg}
          alt="Certificate Background"
          className="certificate-image"
        />
        <div className="certificate-content">
          {details.photo && (
            <img
              src={details.photo}
              alt="Profile"
              className="certificate-photo"
            />
          )}
        </div>
        <div className="certificate-content">
          <div className="certificate-text-name">M/S. {details.name}</div>
        </div>
        <div className="certificate-content">
          <div className="certificate-text-field">{details.field}</div>
        </div>
        <div className="certificate-content">
          <div className="certificate-text-content">
            {details.sodo} {details.parentsname}, has participated in the event
            entitled{" "}
            <span className="span-category"> ‘{details.category}’</span> during
            the outstanding World Record attempt for a{" "}
            <span className="span-content">
              ‘Continuously Performed Program’
            </span>{" "}
            , presented by Aasiyan Book of World Records and organized by Sri
            Kalalaya Dance Academy. This record-breaking event was held on 24
            <sup className="th-super">th</sup> November 2024 at Kattikulam
            Soottukkole Mayandi Foundation, Thiruparankundram.
          </div>
        </div>
        <div className="certificate-content">
          <div className="certificate-text-code">
            AABWR{details.certificateCode}
          </div>
        </div>
        {/* <div className="certificate-content">
          <div className="certificate-text-category">{details.category}</div>
        </div> */}
      </div>
      <button className="button" onClick={handleDownloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default CertificateGenerator;
