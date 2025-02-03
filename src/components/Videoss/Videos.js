import { Card } from "react-bootstrap";
import { videos } from "../assets/assets";
import "./Videos.css";
import LoadingSpinner from "../Loading/Loading";
import React, { useState, useEffect } from "react";
const Videos = () => {
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
      <div className="container">
        <h1 className="auth-note video-head" style={{ marginTop: "80px" }}>
          Videos
        </h1>
        <div className="row video-margin">
          {videos.map((video) => {
            return (
              <div className="col-lg-6 col-sm-12 body-margin">
                <Card className="body-card video-card">
                  <iframe
                    className="card-link card-common-bg video-card"
                    height="300px"
                    src={video.video_link}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                  <Card.Title className="video-dec">
                    {video.video_des}
                  </Card.Title>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Videos;
