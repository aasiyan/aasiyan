// import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
import "./MealCard.css";
import { rec_list } from "../../assets/assets"
import { Card } from "react-bootstrap";
// import pages from "../../../utils/pages";

const MealCard = ({ meal }) => {
  return (
    <article className="meal-card">
      <div className="meal-card-image">
        <img src={meal.image} alt={meal.name} />
      </div>
      <div className="meal-card-header">
        <h3>{meal.name}</h3>
        <span>{meal.price}</span>
      </div>
      <div className="meal-card-body-footer">
        <p>{meal.description}</p>
        <Link to={pages.get('orderOnline').path}>
          Order a delivery <FontAwesomeIcon icon={faMotorcycle} />
        </Link>
      </div>
    </article>
  );
  // return (
  //   <>
  //     <div className="container">
  //       <h1 id="about" className="about-head rec-head">
  //         Records
  //       </h1>
  //       <div className="row meal-card">
  //         {rec_list.map((item) => {
  //           return (
  //             <div className="col-lg-4 col-sm-12 body-margin">
  //               <Card className="body-card">
  //                 <Card.Img
  //                   variant="top"
  //                   className="project-img"
  //                   src={item.rec_img}
  //                 />
  //                 <Card.Body className="card-common-bg">
  //                   <Card.Title className="card-title card-common-bg">
  //                     {item.rec_name}
  //                   </Card.Title>
  //                   <Card.Text className="text card-common-bg">
  //                     <b className="card-about">About :</b>
  //                     {item.description}
  //                   </Card.Text>
  //                   <div className="card-flex card-common-bg">
  //                     <Card.Link
  //                       href={item.link}
  //                       target="_blank"
  //                       className="card-link card-common-bg"
  //                     >
  //                       View More
  //                     </Card.Link>
  //                   </div>
  //                 </Card.Body>
  //               </Card>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </>
  // );
};

export default MealCard;
