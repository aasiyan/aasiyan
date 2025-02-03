import "./About.css";
import Jd from "../assets/jd.jpg";
// import LoadingSpinner from "../Loading/Loading";
// import React, { useState, useEffect } from "react";

const About = () => {
  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   // Simulate a data fetch
  //   setTimeout(() => {
  //     setLoading(false);
  //     setData();
  //   }, 1500); // simulate a 2-second loading time
  // }, []);
  return (
    <>
      <section id="about">
        {/* <div className="App">
          {loading ? <LoadingSpinner loading={loading} /> : <div>{data}</div>}
        </div> */}
        <div>
          <h1
            className="auth-note about-us"
            style={{ marginTop: "20px", fontFamily: "Markazi Text" }}
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            Meet Our Founder
          </h1>
          <div className="container">
            <div className="row about-div">
              <div className="col-lg-6">
                <img
                  src={Jd}
                  alt="dum"
                  className="about-img"
                  data-aos="flip-left"
                  data-aos-duration="1500"
                />
                <h3 className="about-head">Founder</h3>
                <p className="about-name">Dr P.Vivek</p>
              </div>
              <div
                className="col-lg-6"
                data-aos="flip-left"
                data-aos-duration="1500"
              >
                <p className="hero-para">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Vivek P</b> is the visionary
                  founder of <b> Aasiyan book of world records</b>, bringing
                  over 18 years of experience in education, NGO consulting and
                  skills development. With a strong academic background that
                  includes an M.A. in Bharatham from Annamalai University and an
                  M.A. in Tamil from Madurai Kamarajar University, he is deeply
                  committed to empowering individuals through knowledge and
                  practical skills. His additional qualifications span diverse
                  fields such as skincare and haircare, soft skills, fine arts,
                  and sustainable practices like millet powder making, reusable
                  napkin crafting, Treaditional healer for siddah, Varma
                  Theropy, Electro Homiopathy(BEMS), Astrology, Motivational
                  speaker, Womens enterproner traniner, Orientation trainer.
                </p>
                <p className="hero-para">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; He is passionate about
                  community-driven initiatives, having conducted numerous
                  workshops ranging from martial arts to in-service teacher
                  training. He is also actively involved in training Self-Help
                  Groups (SHGs) and Joint Liability Groups (JLGs) in
                  entrepreneurial and skills development. His leadership and
                  dedication to lifelong learning continue to inspire both his
                  team and the communities he serves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
