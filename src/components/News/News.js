import React from "react";
import { Card } from "react-bootstrap";
import { news_list } from "../assets/assets";
import "./News.css";
const News = () => {
  return (
    <>
      <div className="container" id="news">
        <h1
          id="about"
          className="about-head rec-head"
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          News
        </h1>
        <div className="row">
          {news_list.map((item) => {
            return (
              <div className="col-lg-4 col-sm-12 body-margin">
                <Card
                  className="body-card"
                  data-aos="zoom-in"
                  data-aos-duration="1500"
                >
                  <Card.Img
                    variant="top"
                    className="project-img"
                    src={item.news_img}
                  />
                  <Card.Body className="card-common-bg">
                    <Card.Text className="text card-common-bg">
                      {item.desc}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default News;
