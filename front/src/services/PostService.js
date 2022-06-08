import axios from "axios";
const API_URL_POST = "http://localhost:8000/api/post";

const getAllPosts = (token) => {
  return axios.get(API_URL_POST, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const PostService = {
  getAllPosts,
};

export default PostService;
