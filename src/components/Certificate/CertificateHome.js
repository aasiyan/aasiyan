import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./CertificateHome.css";
const supabaseUrl = "https://vjvrzdtysyorsntbmrwu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdnJ6ZHR5c3lvcnNudGJtcnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MDI5ODEsImV4cCI6MjA1MTM3ODk4MX0.TfZuPp4Dzqu27xhHTpqwXseyumoQmHTHCVJ1oOIsEqM";
const supabase = createClient(supabaseUrl, supabaseKey);

const CertificateHome = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [editData, setEditData] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
    fetchEvents();
  }, []);

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("registrationmaster_duplicate")
      .select(
        "registrationid,name,aadhar_no,eventid,mobile_no,gender,parentsname,dob,photo_link,eventmaster_duplicate(eventname),certificatestatus"
      )
      .eq("certificatestatus", 0)
      .order("name", { ascending: true });
    if (!error) setRecords(data);
  };

  const fetchEvents = async () => {
    let { data, error } = await supabase
      .from("eventmaster_duplicate")
      .select("eventid, eventname");
    if (!error) setEvents(data);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRecords((prev) =>
      prev.includes(id) ? prev.filter((record) => record !== id) : [...prev, id]
    );
  };

  const updateCertificateStatus = async (status) => {
    await supabase
      .from("registrationmaster_duplicate")
      .update({ certificatestatus: status })
      .in("registrationid", selectedRecords);
      for (const registrationid of selectedRecords) {
        await supabase.from("certificates_duplicate").insert([
          { registrationid }
        ]);
      }
      
    fetchData();
    setSelectedRecords("");
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });

    alert("Changes Updated Successfully");
  };

  const handleEditClick = (record) => {
    setEditData(record);
  };

  const handleUpdate = async () => {
    if (!editData) {
      console.error("Edit data is null or undefined.");
      return;
    }
    const {
      registrationid,
      name,
      parentsname,
      aadhar_no,
      dob,
      eventid,
      photo_link,
    } = editData;
    await supabase
      .from("registrationmaster_duplicate")
      .update({ name, parentsname, aadhar_no, dob, eventid, photo_link })
      .eq("registrationid", registrationid);
    fetchData();
    setEditData(null);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert("Please select an image.");
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `profile_${editData.registrationid}.${fileExt}`;
    const filePath = `photos/${fileName}`;

    try {
      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from("photos") // Replace with your actual bucket name
        .upload(filePath, file, { upsert: true });

      if (error) throw error;

      // Get the public URL of the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from("photos")
        .getPublicUrl(filePath);

      // Update the `photo_link` in state
      setEditData({ ...editData, photo_link: publicUrlData.publicUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };
  return (
    <div className="container1">
      <h3 className="head">Certificate Approval</h3>
      <div className="d-flex mb-3 justify-content-around">
        <button
          className="btn btn-success me-2"
          onClick={() => updateCertificateStatus(1)}
        >
          Add to Certificate
        </button>
        <button
          className="btn btn-danger"
          onClick={() => updateCertificateStatus(9)}
        >
          Delete
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={record.registrationid}>
                <td>
                  <input
                    type="checkbox"
                    className="clsChk"
                    onChange={() => handleCheckboxChange(record.registrationid)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={record.photo_link}
                    width="40"
                    height="40"
                    alt={record.name}
                  />
                  <br />
                  <span
                    data-bs-toggle="modal"
                    data-bs-target="#photoModal"
                    onClick={() => setSelectedPhoto(record.photo_link)}
                  ></span>
                </td>
                <td>{record.name}</td>
                <td>{record.eventmaster_duplicate?.eventname || "N/A"}</td>
                <td>{record.gender}</td>
                <td>{record.parentsname}</td>
                <td>{record.aadhar_no}</td>
                <td>{record.dob && formatDate(record.dob)}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => handleEditClick(record)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Photo Modal */}
      <div
        className="modal fade"
        id="photoModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Image</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body text-center">
              <img src={selectedPhoto} width="80%" alt="Selected" />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Record</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {editData && (
                <>
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                  <label>Parent's Name</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editData.parentsname}
                    onChange={(e) =>
                      setEditData({ ...editData, parentsname: e.target.value })
                    }
                  />
                  <label>Aadhar No</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editData.aadhar_no}
                    onChange={(e) =>
                      setEditData({ ...editData, aadhar_no: e.target.value })
                    }
                  />
                  <label>Date Of Birth</label>
                  <input
                    type="date"
                    className="form-control mb-2"
                    value={editData.dob}
                    onChange={(e) =>
                      setEditData({ ...editData, dob: e.target.value })
                    }
                  />
                  <label>Event</label>
                  <select
                    className="form-control mb-2"
                    value={editData.eventid}
                    onChange={(e) =>
                      setEditData({ ...editData, eventid: e.target.value })
                    }
                  >
                    {events.map((event) => (
                      <option key={event.eventid} value={event.eventid}>
                        {event.eventname}
                      </option>
                    ))}
                  </select>
                  <lable>Photo</lable>
                  <input
                    type="file"
                    className="form-control mb-2"
                    onChange={handleFileUpload}
                  />
                  <img
                    src={editData?.photo_link || ""}
                    alt="Uploaded Photo"
                    width="100%"
                    height="250px"
                    className="mt-2"
                  />
                </>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateHome;
