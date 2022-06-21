import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../contextes/UserContext";
import PostService from "../services/PostService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthService from "../services/AuthService";
import CommentService from "../services/CommentService";
import commentService from "../services/CommentService";

const Actu = () => {
  const { state } = useLocation();
  const { currentUser } = useContext(UserContext);
  const [allPosts, setAllPosts] = useState();
  const [admin, setAdmin] = useState(false);
  //const [commentsCount, setCommentsCount] = useState(0)
  let navigate = useNavigate();

  useEffect(() => {
    // Update the document title using the browser API
    document.title = "actus";
    if (!localStorage.getItem("user")) {
      navigate("/connexion");
    }
    //console.log(currentUser.userId)
    AuthService.getCurrentUser(currentUser.userId, currentUser.token).then(
      (response) => {
        const arrayFromUser = Object.values(response);
        console.log(arrayFromUser);
        if (arrayFromUser[7] === true) {
          setAdmin(true);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    //get all posts on init
    PostService.getAllPosts(currentUser.token)
      .then(async (posts) => {
        console.log(posts.data);
        //set all posts
        //setAllPosts(posts.data)
        for (const [index, post] of Object.entries(posts.data)) {
          //console.log(post.id)
          await commentService
            .getNumbersOfCommentsForPost(currentUser.token, post.id)
            .then((numberOfComments) => {
              //console.log(numberOfComments)
              console.log("get number of comments");
              post.numberOfComments = numberOfComments.data;
            })
            .catch((error) => console.log(error.message));
          //console.log(post.numberOfComments)
        }
        //console.log('set all posts')
        await setAllPosts(posts.data);
        //await console.log(allPosts)
      })
      .catch((error) => console.log(error.message));
  }, [useNavigate]);

  const deletePost = (id) => {
    PostService.deletePost(id, currentUser.token);
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="container mt-5 mb-5">
        <h1>Actus</h1>
        <Link to="/post/create">Créer une nouvelle actualité</Link>
        <hr />
        <h2>Liste des dernières actualités</h2>
        {allPosts !== undefined && (
          <div className="container">
            <div className="row">
              {allPosts.map((post) => (
                <div className="col-xs-12 col-md-6 col-lg-4" key={post.id}>
                  <div className="card" style={{ width: "18rem" }}>
                    {post.imageUrl ? (
                      <img src={post.imageUrl} className="card-img-top" />
                    ) : null}
                    <div className="card-body">
                      {post.numberOfComments > 0 ? (
                        <span className="badge bg-info text-dark ms-3">
                          {post.numberOfComments} commentaires
                        </span>
                      ) : (
                        <span className="badge bg-info text-dark ms-3">
                          Aucuns commentaires
                        </span>
                      )}

                      {post.nbLikes > 0 ? (
                        <span className="badge bg-primary text-white ms-3">
                          {post.nbLikes} likes
                        </span>
                      ) : (
                        <span className="badge bg-primary text-white ms-3">
                          Aucuns likes
                        </span>
                      )}

                      {post.nbDislikes > 0 ? (
                        <span className="badge bg-danger text-white ms-3">
                          {post.nbDislikes} dislikes
                        </span>
                      ) : (
                        <span className="badge bg-danger text-white ms-3">
                          Aucuns dislikes
                        </span>
                      )}

                      <h5 className="card-title">{post.title}</h5>
                      <small>auteur: {post.author}</small>
                      <p className="card-text">
                        {post.content.substring(0, 200) + "..."}
                      </p>
                      <Link to={`/onePost/${post.id}`}>
                        <button className="btn btn-primary">
                          Lire le post complet
                        </button>
                      </Link>
                      {(currentUser.userId === post.userId ||
                        admin === true) && (
                        <div>
                          <Link to={`/modifyPost/${post.id}`}>
                            <button className="btn btn-primary mt-3">
                              Modifier le post
                            </button>
                          </Link>
                          <button
                            className="btn btn-danger mt-3"
                            onClick={() => deletePost(post.id)}
                          >
                            Supprimer le post
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default Actu;
