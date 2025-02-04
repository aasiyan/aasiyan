import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vjvrzdtysyorsntbmrwu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdnJ6ZHR5c3lvcnNudGJtcnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MDI5ODEsImV4cCI6MjA1MTM3ODk4MX0.TfZuPp4Dzqu27xhHTpqwXseyumoQmHTHCVJ1oOIsEqM";
const supabase = createClient(supabaseUrl, supabaseKey);

const fetchData = async () => {
  try {
    let { data, error } = await supabase
      .from("registrationmaster_duplicate")
      .select(
        "registrationid,name,aadhar_no,eventid,mobile_no,gender,parentsname,dob,photo_link,eventmaster_duplicate(eventname),certificatestatus"
      );

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const CertificateGenerate = () => {
  const [records, setRecords] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setRecords(data);
    };
    getData();
  }, []);

  const handlePhotoClick = (photoLink) => {
    setSelectedPhoto(photoLink);
  };
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <div className="container">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th></th>
                <th>S.No</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Event Name</th>
                <th>Gender</th>
                <th>Parent's Name</th>
                <th>Aadhar No</th>
                <th>Date Of Birth</th>
                <th>Certificate Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record.registrationid}>
                  <td>
                    <input type="checkbox" value={record.eventid} />
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={record.photo_link}
                      width="40px"
                      height="40px"
                      alt={record.name}
                    />
                    <br />
                    <span
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => handlePhotoClick(record.photo_link)}
                    >
                      View
                    </span>
                  </td>
                  <td>{record.name}</td>
                  <td>{record.eventmaster_duplicate?.eventname || "N/A"}</td>
                  <td>{record.gender}</td>
                  <td>{record.parentsname}</td>
                  <td>{record.aadhar_no}</td>
                  <td>{record.dob && formatDate(record.dob)}</td>
                  <td>
                    {record.certificatestatus == 1
                      ? "Not Generated"
                      : "Generated"}
                  </td>
                  <td>
                    <td className="d-flex gap-3">
                      <button className="btn btn-success">Download</button>
                      <button className="btn btn-primary">View</button>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Image
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <center>
                  <img src={selectedPhoto} width="80%" alt="Selected" />
                </center>
              </div>
              <div class="modal-footer d-flex justify-content-center">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateGenerate;
