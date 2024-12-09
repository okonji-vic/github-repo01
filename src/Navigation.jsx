import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({ repos }) {
  return (
    <section className="nav-container">
      <NavLink
        to="/"
        className={"nav-link"}
        style={({ isActive }) =>
          isActive
            ? {
                color: "aqua",
                backgroundColor: "black",
                border: "0.5px solid white",
                borderRadius: "5px",
                width: '31vw'

              }
            : {
                color: "white",
                backgroundColor: "rgb(55,55,105)",
                border: "none",
                borderRadius: "5px",
                width: '31vw'
              }
        }
      >
        <h4>Repositories</h4>
      </NavLink>
      <NavLink
        to="/about"
        className={"nav-link"}
        state={{ repos }}
        style={({ isActive }) =>
          isActive
            ? {
                color: "aqua",
                backgroundColor: "black",
                border: "0.5px solid white",
                borderRadius: "5px",
                width: "31vw",
              }
            : {
                color: "white",
                backgroundColor: "rgb(55,55,105)",
                border: "none",
                borderRadius: "5px",
                width: "31vw",
              }
        }
      >
        <h4>About</h4>
      </NavLink>
    </section>
  );
}

export default Navigation;