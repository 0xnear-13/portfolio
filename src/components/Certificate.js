import React from "react";
import "../css/certificate.css";
import certificate from "../assets/certificate.png";
import certificate2 from "../assets/certificate2.png";

const Certificates = () => {
  return (
    <div className="certificates-container" id="certificate">
      <h2 className="title">My Certificates</h2>
      <div className="certificate-grid">
        <div className="certificate-card">
          <img
            src={certificate}
            alt="CompTIA Security+"
            className="certificate-image"
          />
          <p className="certificate-title">CompTIA Security+</p>
        </div>
        <div className="certificate-card">
          <img src={certificate2} alt="CEH" className="certificate-image" />
          <p className="certificate-title">Google Cybersecurity</p>
        </div>
        {/* <div className="certificate-card">
          <img
            src="certificate3.jpg"
            alt="OSCP"
            className="certificate-image"
          />
          <p className="certificate-title">
            Offensive Security Certified Professional
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Certificates;
