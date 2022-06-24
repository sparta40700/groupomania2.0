import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../contextes/UserContext";
import logo from "../assets/icones/icon-white.png";

export default function Header() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  let navigate = useNavigate();
  const logout = (e) => {
    localStorage.removeItem("user");
    setCurrentUser(undefined);
    navigate("/connexion");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light p-3 mb-2 bg-secondary text-white ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" className="w-25" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem("user") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/actus">
                    Actus
                  </Link>
                </li>
              )}
              {localStorage.getItem("user") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/profil">
                    Profil
                  </Link>
                </li>
              )}
              {!localStorage.getItem("user") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/connexion">
                    Connexion
                  </Link>
                </li>
              )}
              {!localStorage.getItem("user") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/inscription">
                    Inscription
                  </Link>
                </li>
              )}
              {localStorage.getItem("user") && (
                <li className="nav-item" onClick={logout}>
                  <button className="nav-link">Deconnexion</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
