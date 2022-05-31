import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icon">
        <div className="iconbis">
          <NavLink to="/" exact activeClassName="active-left-nav">
            <i className="fa fa-home" alt="home" />
          </NavLink>
          <br />
          <NavLink to="/Profil" exact activeClassName="active-left-nav">
            <i className="fa fa-user" alt="profil" />
          </NavLink>
          <br />
          <NavLink to="/Actu" exact activeClassName="active-left-nav">
            <i className="fa fa-newspaper-o" alt="actus" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default LeftNav;
