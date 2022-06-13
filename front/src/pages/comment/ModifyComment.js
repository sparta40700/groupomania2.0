import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contextes/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommentService from "../../services/CommentService";
import commentService from "../../services/CommentService";

function ModifyComment(props) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [comment, setComment] = useState();
  const [commentId, setCommentId] = useState();
  const [text, setText] = useState("");
  const [errorComment, setErrorComment] = useState("");
  let navigate = useNavigate();

  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    if (
      (!currentUser && !localStorage.getItem("user")) ||
      currentUser === undefined
    ) {
      navigate("/login");
    }
    const url = window.location.href;
    let splitUrl = url.split("/");
    const commentId = splitUrl[splitUrl.length - 1];
    //const userId = currentUser.userId

    //get comment with id in url
    commentService
      .getOneComment(currentUser.token, commentId)
      .then((comment) => {
        //console.log(comment)
        setComment(comment.data.content);
      });
  }, [currentUser]);

  const onModifyCommentFormSubmit = () => {
    //navigate("/actus")
  };

  return (
    <div>
      <Header />
      <div className="container mt-5 mb-5">
        <h1 className="text-center">Modifier votre commentaire</h1>
        <hr />
        <form onSubmit={onModifyCommentFormSubmit}>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Modifiez le commentaire
            </label>
            <textarea
              className="form-control"
              id="text"
              onChange={(value) => setText(value.target.value)}
              rows="3"
              value={comment}
            ></textarea>
            {errorComment && (
              <div className="alert alert-danger" role="alert">
                {errorComment}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Enregistrer les modifications sur ce commentaire
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ModifyComment;
