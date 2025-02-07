import React, { useState, useEffect } from "react";
import { Switch, Typography } from "antd";
import { supabase } from "../../supabaseClient.js";
import "./Search.css";
import logo from "../../components/assets/logo.png";
import { Link } from "react-router-dom";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [filteredrecords, setFilteredrecords] = useState(items);
  const [ellipsis, setEllipsis] = useState(true);
  const { Paragraph } = Typography;
  function handleSearch(e) {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = items.filter(
      (record) =>
        record.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        record.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        record.date.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredrecords(filtered);
  }

  const fetchItems = async () => {
    const { data, error } = await supabase.from("recordmaster").select("*");
    if (error) console.error(error);
    else setItems(data);
  };
  useEffect(() => {
    fetchItems();
  }, []);
  useEffect(() => {
    setFilteredrecords(items);
  }, [items]);
  let debounceTimeout;
  const handleResize = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      console.log("Resizing...");
    }, 300);
  };

  window.addEventListener("resize", handleResize);
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <div className="rec-nav">
        <div>
          <img src={logo} className="logo" alt="aasiyan-logo" />
        </div>
        <div>
          <h1 className="logo-title">Aasiyan</h1>
        </div>
        <div>
        <Link to="/" className="btn btn-home">
            Home
          </Link>
        </div>
      </div>
      <center>
        <div className="hero-buttons search-btn">
          <input
            type="text"
            placeholder="Search for a record..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button type="button" className="btn btn-red">
            Search
          </button>
        </div>
      </center>
      {filteredrecords.length === 0 ? (
        <p className="not-found">record not found</p>
      ) : (
        <div className="record-grid">
          {filteredrecords.map((item) => (
            <div key={item.id} className="records-margine">
              <div className="records-card">
                {item.image && (
                  <img
                    src={`https://vjvrzdtysyorsntbmrwu.supabase.co/storage/v1/object/public/images/${item.image}`}
                    alt={item.name}
                    className="record-img"
                  />
                )}
                <div className="record-content">
                  <h2 className="common-colour record-title">{item.name}</h2>
                  <h3 className="common-colour record-date">
                    Held on : {item.date && formatDate(item.date)}
                  </h3>

                  <Switch
                    checked={ellipsis}
                    onChange={() => {
                      setEllipsis(!ellipsis);
                    }}
                    style={{ display: "none" }}
                  />

                  <Paragraph
                    className="antd-style common-colour record-overview"
                    ellipsis={
                      ellipsis
                        ? { rows: 6, expandable: true, symbol: "more" }
                        : false
                    }
                    style={{ overflowWrap: "break-word" }}
                  >
                    {item.description}
                  </Paragraph>
                </div>
                <center>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <button className="btn btn-red">View Video</button>
                  </a>
                </center>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;