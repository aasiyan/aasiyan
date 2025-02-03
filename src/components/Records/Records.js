import React from 'react'
import "../Records/Records.css"
import { Card } from "react-bootstrap";
import { rec_list } from "../assets/assets";

const Records = () => {
  return (
    <>
    <div className="container">
        <h1 id="about" className="about-head rec-head">
          Records
        </h1>
        <div className="row">
          {rec_list.map((item) => {
            return (
              <div className="col-lg-4 col-sm-12 body-margin">
                <Card className="body-card">
                  <Card.Img
                    variant="top"
                    className="project-img"
                    src={item.rec_img}
                  />
                  <Card.Body className="card-common-bg">
                    <Card.Title className="card-title card-common-bg">
                      {item.rec_name}
                    </Card.Title>
                    <Card.Text className="text card-common-bg">
                      <b className="card-about">About :</b>
                      {item.description}
                    </Card.Text>
                    <div className="card-flex card-common-bg">
                      {/* <Card.Link
                        href={item.link}
                        target="_blank"
                        className="card-link card-common-bg"
                      >
                        View More
                      </Card.Link> */}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default Records
