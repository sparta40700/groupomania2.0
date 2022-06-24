import axios from "axios";

const API_URL_COMMENTS = "http://localhost:8000/api/comments/";

const getAllComments = (token, postId) => {
  return axios.get(API_URL_COMMENTS + "from/post/" + `${postId}`, {
    headers: {
      Authorization: token,
    },
  });
};

const getOneComment = (token, commentId) => {
  return axios.get(API_URL_COMMENTS + `${commentId}`, {
    headers: {
      Authorization: token,
    },
  });
};

const getNumbersOfCommentsForPost = (token, postId) => {
  return axios.get(API_URL_COMMENTS + "number/from/post/" + `${postId}`, {
    headers: {
      Authorization: token,
    },
  });
};

const createComment = (userID, token, postId, comment) => {
  // on formate les données
  /*const formData = new FormData();

    formData.append('userId', userID);
    formData.append('comment', comment);
    formData.append('postId', postId);*/

  const data = {
    userId: userID,
    comment: comment,
    postId: postId,
  };

  return axios.post(API_URL_COMMENTS + "create", data, {
    headers: {
      Authorization: token,
    },
  });
};

const modifyComment = (token, commentId, comment) => {
  return axios.post(
    API_URL_COMMENTS + "modify/" + commentId,
    { comment: comment },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const deleteComment = (token, commentId) => {
  return axios.delete(API_URL_COMMENTS + "delete/" + commentId, {
    headers: {
      Authorization: token,
    },
  });
};

const CommentService = {
  getAllComments,
  getOneComment,
  getNumbersOfCommentsForPost,
  createComment,
  modifyComment,
  deleteComment,
};

export default CommentService;
