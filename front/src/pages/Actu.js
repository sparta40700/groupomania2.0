import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../contextes/UserContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import postService from "../services/PostService";

const Actu = () => {
  const { user } = useContext(UserContext);
  const { state } = useLocation();
  const [allPosts, setAllPosts] = useState();
  const { currentUser } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    // Update the document title using the browser API
    document.title = "actus";
    //console.log(currentUser)
    //console.log(localStorage.getItem('user'))
    //console.log(state)
    if (!localStorage.getItem("user")) {
      navigate("/connexion");
    }
    //get all posts on init

    postService
      .getAllPosts(currentUser.token)
      .then((posts) => {
        console.log(posts);
        //set all posts
        setAllPosts(posts.data);
        console.log(allPosts);
      })
      .catch((error) => console.log(error.message));
  }, [localStorage, useNavigate]);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="actus-title">
              <h1>Actualités</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="actus-content">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Actu;
