import React from "react";
import "../css/navbar.css";

import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link
          className="nav-link"
          to="about"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          About Me
        </Link>
        <Link
          className="nav-link"
          to="certificate"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Certificates
        </Link>
        {/* <button>Projects</button> */}
      </div>
    </nav>
  );
};

export default Navbar;
