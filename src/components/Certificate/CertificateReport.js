import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "jszip";
import "datatables.net-buttons/js/buttons.html5.js";
import $ from "jquery";
import "datatables.net";
import CertificateNav from "./CertificateNav";
import "./CertificateHome.css"
const supabaseUrl = "https://vjvrzdtysyorsntbmrwu.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdnJ6ZHR5c3lvcnNudGJtcnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MDI5ODEsImV4cCI6MjA1MTM3ODk4MX0.TfZuPp4Dzqu27xhHTpqwXseyumoQmHTHCVJ1oOIsEqM";
const supabase = createClient(supabaseUrl, supabaseKey);
const CertificateReport = () => {
    const [records, setRecords] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (records.length > 0) {
            $("#reportTable").DataTable({
                destroy: true, // Ensure previous instances are destroyed
                dom: "Bfrtip", // Include buttons
                buttons: [
                    {
                        extend: "excelHtml5",
                        text: "Download Excel",
                        className: "btn btn-success",
                        title: "Certificate Report"
                    }
                ]
            });
        }
    }, [records]);
    
    const fetchData = async () => {
        let { data, error } = await supabase
            .from("registrationmaster")
            .select(
                "registrationid,name,aadhar_no,eventid,mobile_no,gender,parentsname,dob,photo_link,eventmaster(eventname),certificatestatus"
            )
            //   .eq("certificatestatus", 0)
            .order("name", { ascending: true });
        if (!error) setRecords(data);
    };
    function capitalizeWords(str) {
        return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    }
    const formatDate = (date) => {
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    };
    return (
        <>
        <CertificateNav />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Certificate Report</h2>
                <div className="table-responsive">
                    <table id="reportTable" className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>S.No</th>
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
                                <tr className="align-middle" key={record.registrationid}>
                                    <td>{index + 1}</td>
                                    <td>{capitalizeWords(record.name)}</td>
                                    <td>{record.eventmaster?.eventname || "N/A"}</td>
                                    <td>{record.gender}</td>
                                    <td>{capitalizeWords(record.parentsname)}</td>
                                    <td>{record.aadhar_no}</td>
                                    <td>{record.dob && formatDate(record.dob)}</td>
                                    <td>
                                        {record.certificatestatus === 0 ? (
                                            <span className="badge bg-info text-dark">Registered</span>
                                        ) : record.certificatestatus === 1 ? (
                                            <span className="badge bg-warning text-dark">Generated</span>
                                        ) : record.certificatestatus === 2 ? (
                                            <span className="badge bg-success">Completed</span>
                                        ) : (
                                            <span className="badge bg-danger">Deleted</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default CertificateReport