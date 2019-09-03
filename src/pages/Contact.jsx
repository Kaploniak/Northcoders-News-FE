import React from "react";
import { Card } from "react-bootstrap";
import profilePicture from "../images/michalkaploniak.png";

const Contact = () => {
  return (
    <div className="contactCard">
      <Card className="cardInfo navbar nav-link bg-dark">
        <Card.Body>
          <Card.Title>Contact Me</Card.Title>
          <Card.Img
            className="profilePicture"
            variant="top"
            src={profilePicture}
            alt="Michal Kaploniak profile picture"
          />
          <Card.Title>Michal Kaploniak</Card.Title>
          <Card.Subtitle className="mb-2 ">
            {
              <p>
                You can contact me by:
                <br />
                <strong>0795 868 2305</strong>
                <br />
                or
                <br />
                <strong>michalkaploniak@gmail.com</strong>
              </p>
            }
          </Card.Subtitle>
          <a href="https://github.com/Kaploniak" target="blank">
            <i className="footer-icon fab fa-github fa-3x"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/michal-kaploniak-31b868108/"
            target="blank"
          >
            <i className="footer-icon fab fa-linkedin fa-3x"></i>
          </a>
          <a href="https://www.facebook.com/michalkaploniak" target="blank">
            <i className="footer-icon fab fa-facebook-square fa-3x"></i>
          </a>
          <p className="copyright-paragraph">Copyright 2019 ©MKaploniak</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Contact;
