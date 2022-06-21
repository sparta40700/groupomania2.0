import axios from "axios"

const API_URL_POSTS = "http://localhost:8000/api/posts/"

const getAllPosts = (token) => {
    return axios.get(
        API_URL_POSTS,
        {
            headers:{
                Authorization: token,
            }
        }
    )
}

const getOnePost = (token, postId) => {
    return axios.get(
        API_URL_POSTS + `${postId}`,
        {
            headers:{
                Authorization: token,
            }
        }
    )
}

const createPost = (userID, token, postTitle, postText, postImg) => {

    // on formate les données
    const formData = new FormData();

    formData.append('userId', userID);
    formData.append('postTitle', postTitle);
    formData.append('postText', postText);
    formData.append('postImg', postImg);

    return axios.post(
        API_URL_POSTS + "create",
        formData,
        {
            headers:{
                Authorization: token,
            }
        }
    )
}

const modifyPost = (userID, token, postId, postTitle, postText, postImg) => {
    // on formate les données
    const formData = new FormData();

    formData.append('userId', userID);
    formData.append('postTitle', postTitle);
    formData.append('postText', postText);
    formData.append('postImg', postImg);

    return axios.post(
        API_URL_POSTS + "modify/" + postId,
        formData,
        {
            headers:{
                Authorization: token,
            }
        }
    )
}

const deletePost = (id, token) => {
    axios.delete(API_URL_POSTS + "delete/" + id, {
        headers:{
            Authorization: token
        }
    }).then((response) => {
        console.log(response + " actualité supprimée !")
    })
}

const PostService = {
    getAllPosts,
    getOnePost,
    createPost,
    modifyPost,
    deletePost
}

export default PostService