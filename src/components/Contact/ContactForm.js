import React from "react";
import "./ContactForm.css";
import "../Authentication/Authentication.css";
import { Card } from "react-bootstrap";

const ContactForm = () => {
  const [result, setResult] = React.useState("Message Sent Successfull");

  const sendMessage = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "6ebd226c-bb6e-4f6c-ac4e-cc0fe117027a");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  const sendAlert = () => {
    alert(result);
  };
  return (
    <>
      <div className="auth-container" id="contact">
        <h1
          className="auth-note about-us"
          style={{
            marginTop: "-40px",
            marginBottom: "-10px",
            fontFamily: "Markazi Text",
          }}
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          Contact
        </h1>
        <div className="row">
          <form
            onSubmit={sendMessage}
            className="col-lg-6 col-sm-12 contact-div"
          >
            <div
              className="auth-card con-card"
              data-aos="zoom-in"
              data-aos-duration="1500"
            >
              {/* <h2 className="auth-head">Contact</h2> */}
              <div>
                <label>
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter the name"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email id"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Message <br />
                  <textarea
                    name="message"
                    className="contact-message"
                    placeholder="Enter Message"
                  ></textarea>
                </label>
              </div>
              <button type="submit" onClick={sendAlert}>
                Send Message
              </button>
            </div>
          </form>

          <div
            className="col-lg-6 col-sm-12 "
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            <Card className="map-card contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3928.21588468122!2d77.63297667503227!3d10.081389390028228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDA0JzUzLjAiTiA3N8KwMzgnMDguMCJF!5e0!3m2!1sen!2sin!4v1729403669274!5m2!1sen!2sin"
                allowfullscreen=""
                className="map-body"
                loading="lazy"
                alt="map"
                title="map"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
