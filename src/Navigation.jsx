import React from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";


function Navigation() {
  return (
    <section className="nav-container">
      <NavLink
        to="/"
        className={"nav-link"}
        style={({ isActive }) =>
          isActive
            ? {
                
                backgroundColor: "black",
                border: "0.5px solid white",
                borderRadius: "5px",
                

              }
            : {
                color: "white",
                backgroundColor: '#646cff',
                border: "none",
                borderRadius: "5px",
                
              }
        }
      >
        <h4>Repositories</h4>
      </NavLink>
      <NavLink
        to="/about"
        className={"nav-link"}
        
        style={({ isActive }) =>
          isActive
            ? {
                
                backgroundColor: "black",
                border: "0.5px solid white",
                borderRadius: "5px",
                
              }
            : {
                
                backgroundColor: '#646cff',
                border: "none",
                borderRadius: "5px",
                
                
            

              }
        }
      >
        <h4>About</h4>
      </NavLink>
      <NavLink
        to="/error"
        className={"nav-link"}
        style={({ isActive }) =>
          isActive
            ? {
                
                backgroundColor: "black",
                border: "0.5px solid white",
                borderRadius: "5px",
                

              }
            : {
                
                backgroundColor: '#646cff',
                border: "none",
                borderRadius: "5px",
                
              }
        }
      >
        <h4>Error</h4>
      </NavLink>
    </section>
  );
}

export default Navigation;
