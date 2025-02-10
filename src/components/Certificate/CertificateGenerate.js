import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import certificateImg from "../assets/certificate-nocontent.png"; // path to your certificate template
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import styles from "../../components/CertificateGenerator/CertificateGenerator.css"
import CertificateNav from "./CertificateNav";
// Supabase client setup
const supabaseUrl = "https://vjvrzdtysyorsntbmrwu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdnJ6ZHR5c3lvcnNudGJtcnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MDI5ODEsImV4cCI6MjA1MTM3ODk4MX0.TfZuPp4Dzqu27xhHTpqwXseyumoQmHTHCVJ1oOIsEqM";
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch data from Supabase


const CertificateGenerate = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); // For storing selected record
  const certificateRef = useRef(); // Reference for certificate template
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  // Fetch records when the component is mounted
  useEffect(() => {
    getData();
  }, []);
  
  const getData = async () => {
    const data = await fetchData();
    setRecords(data);
  };


  const fetchData = async () => {
    try {
      let { data, error } = await supabase
        .from("registrationmaster")
        .select(
          "registrationid,name,aadhar_no,eventid,mobile_no,gender,parentsname,dob,photo_link,eventmaster(eventname),certificatestatus,certificate(id)"
        )
        .eq("certificatestatus", 1)
        .order("name", { ascending: true });
  
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  // Format the date
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  // Function to open modal and set the selected record
  const handleViewClick = (record) => {
    setSelectedRecord(record);
    // You can now use selectedRecord in the modal for rendering
  };

  // Function to generate and download certificate as PDF
  const handleDownloadCertificate = () => {
    if (selectedRecord) {
      html2canvas(certificateRef.current, { scale: 1.5, useCORS: true }).then(
        (canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [595, 842],
          });
          pdf.addImage(imgData, "PNG", 0, 0, 595, 842);
          pdf.save(`${selectedRecord.name}_certificate.pdf`);
        },
        500
      );
    } else {
      alert("No record selected!");
    }
  };
  function capitalizeWords(str) {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allIds = records.map((record) => record.registrationid);
      setSelectedRecords(allIds);
    } else {
      setSelectedRecords([]);
    }
  };
  const handleCheckboxChange = (id) => {
    setSelectedRecords((prev) =>
      prev.includes(id) ? prev.filter((record) => record !== id) : [...prev, id]
    );
  };
  const updateCertificateStatus = async (status) => {
    await supabase
      .from("registrationmaster")
      .update({ certificatestatus: status })
      .in("registrationid", selectedRecords);

    setSelectedRecords("");
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });

    alert("Changes Updated Successfully");

    getData();

    // Clear selected records and reset checkboxes
    setSelectedRecords([]);
    setSelectAll(false);
    
  };
  return (
    <>
     <CertificateNav />
      
      <div className="container con-style">
      <div className="d-flex mb-3 justify-content-around">
      <button
        className="btn btn-danger"
        onClick={() => updateCertificateStatus(3)}
      >
        Completed
      </button>
      </div>
        <h3 className="head">Certificate Generation</h3>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <th> <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  /></th>
                </th>
                <th>S.No</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Event Name</th>
                <th>Gender</th>
                <th>Parent's Name</th>
                <th>Aadhar No</th>
                <th>Date Of Birth</th>
                <th>Certificate Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr class="align-middle" key={record.registrationid}>
                  <td>
                    <input
                      type="checkbox"
                      className="clsChk"
                      checked={selectedRecords.includes(record.registrationid)}
                      onChange={() =>
                        handleCheckboxChange(record.registrationid)
                      }
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={record.photo_link}
                      width="40px"
                      height="40px"
                      alt={record.name}
                    />
                  </td>
                  <td>{capitalizeWords(record.name)}</td>
                  <td>{record.eventmaster?.eventname || "N/A"}</td>
                  <td>{record.gender}</td>
                  <td>{capitalizeWords(record.parentsname)}</td>
                  <td>{record.aadhar_no}</td>
                  <td>{record.dob && formatDate(record.dob)}</td>
                  <td>AABWR{record.certificate?.id + 792 || "N/A"}</td>
                  {/* <td>
                    {record.certificatestatus == 1
                      ? "Not Generated"
                      : "Generated"}
                  </td> */}
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleViewClick(record)}
                      data-bs-toggle="modal"
                      data-bs-target="#certificateModal"
                    >
                      View
                    </button>
                    {/* <button
                      className="btn btn-success"
                      onClick={() => handleDownloadCertificate()}
                    >
                      Download
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for displaying the certificate */}
      <div
        className="modal fade"
        id="certificateModal"
        tabIndex="-1"
        aria-labelledby="certificateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="certificateModalLabel">
                Certificate Preview
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedRecord && (
                <div ref={certificateRef} className="certificate">
                  <img
                    src={certificateImg}
                    alt="Certificate Background"
                    className="certificate-image"
                  />
                  <div className="certificate-content">
                    <div className="certificate-text-name">
                      M/S. {capitalizeWords(selectedRecord.name)}
                    </div>
                  </div>
                  <div className="certificate-content">
                    <div className="certificate-text-content">
                      {selectedRecord.gender == "Male" ? "S/O." : "D/O."}{" "}
                      {capitalizeWords(selectedRecord.parentsname)}, has participated in the
                      event titled{" "}
                      <span className="span-category">
                        {" "}
                        ‘{selectedRecord.eventmaster?.eventname || "N/A"}’
                      </span>{" "}
                      during the outstanding World Record attempt for{" "}
                      <span className="span-content">
                        ‘Continuously Performing Silambam for 30 Minutes’
                      </span>{" "}
                      , presented by Aasiyan Book of World Records and organized
                      by Tamilan Takewondo Academy. This record-breaking event
                      was held on 09
                      <sup className="th-super">th</sup> February 2025 at
                      Khairunnaas Nursery & Primary School, Periyakulam.
                    </div>
                  </div>
                  <div className="certificate-content">
                    <img
                      src={selectedRecord.photo_link}
                      alt="Profile"
                      className="certificate-photo"
                    />
                  </div>
                  <div className="certificate-text-field">
                    <strong>{selectedRecord.aadhar_no}</strong>
                  </div>
                  <div className="certificate-text-code">
                    <strong>
                      AABWR{selectedRecord.certificate?.id + 792 || "N/A"}
                    </strong>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleDownloadCertificate}
              >
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateGenerate;
