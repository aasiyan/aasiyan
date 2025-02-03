import "./Navbar.css";
// import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
const Navbar = () => {
  // const [menu, setMenu] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 150) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <section id="navbar">
        <nav
          className={`navbar navbar-expand-lg fixed-top ${
            scrolled ? "scrolled" : ""
          }`}
        >
          <img src={logo} alt="aasiyan" className="nav-logo" />
          <a className="navbar-brand" style={{ color: "#495e57" }} href="#.com">
            <b>AASIYAN</b>
          </a>
          <button
            className="navbar-toggler nav-btn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            style={{ width: "75%", backgroundColor: "white" }}
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                style={{ backgroundColor: "white" }}
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav mb-2 mb-lg-0">
                {/* <li className="nav-item">
                  <Link
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : "" && "nav-link"}
                    to="/website"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={() => setMenu("about")}
                    className={menu === "about" ? "active" : "" && "nav-link"}
                    to="/about"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={() => setMenu("certificate")}
                    className={
                      menu === "certificate" ? "active" : "" && "nav-link"
                    }
                    to="/authentication"
                  >
                    Certificate
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={() => setMenu("videos")}
                    className={menu === "videos" ? "active" : "" && "nav-link"}
                    to="/videos"
                  >
                    Videos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={() => setMenu("contact")}
                    className={menu === "contact" ? "active" : "" && "nav-link"}
                    to="/contact"
                  >
                    Contact
                  </Link>
                </li> */}
                <li className="nav-item">
                  <a
                    className="nav-link nav-text"
                    style={{ color: "black" }}
                    href="#hero"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link nav-text"
                    style={{ color: "black" }}
                    href="#about"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link nav-text"
                    style={{ color: "black" }}
                    href="https://aasiyan.github.io/records/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Record's
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link nav-text"
                    style={{ color: "black" }}
                    href="#news"
                  >
                    News
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link nav-text"
                    style={{ color: "black" }}
                    href="#contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
