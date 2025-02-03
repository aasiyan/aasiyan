// import { Link } from 'react-router-dom';
// import restaurantFoodImage from './assets/restaurant-food.jpg';
import "./Hero.css";
// import logo from "../assets/hero-img1.jpg";
import Banner from "../assets/banner.png";
import Banner2 from "../assets/banner_1.png";
const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div>
        <img
          className="hero-image banner-img-1"
          src={Banner}
          alt="Restaurant food"
        />
        <img
          className="hero-image banner-img-2"
          src={Banner2}
          alt="Restaurant food"
        />
        <div className="hero-information container">
          <h1 className="hero-head">Aasiyan</h1>
          {/* <h2 className="hero-head">Book of World records</h2> */}
          <p className="hero-para" data-aos="zoom-in" data-aos-duration="1500">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The{" "}
            <b>Aasiyan Book of World Records</b> is a platform that recognizes
            and celebrates extraordinary achievements, talents and milestones
            across a wide range of fields. Similar to other record-keeping
            organizations, it documents individuals or groups who accomplish
            feats of excellence, set new standards or break previous records in
            various categories such as sports, education, arts, science, and
            more.
          </p>

          <p className="hero-para" data-aos="zoom-in" data-aos-duration="1500">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This website likely provides detailed
            guidelines on how participants can submit their record attempts, the
            process for validation, and the criteria required for recognition.
            It serves as an inspiration for people striving for excellence and
            offers a space for both well-known and lesser-known talents to gain
            global acknowledgment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
