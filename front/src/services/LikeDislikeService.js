import axios from "axios"

const API_URL_LIKE_DISLIKES = "http://localhost:8000/api/like-dislikes/"


const addLike = (token, userID, postID) => {

    return axios.post(
        API_URL_LIKE_DISLIKES + "addLike",
        {
            userId: userID,
            postId: postID
        },
        {
            headers:{
                Authorization: token,
            }
        }
    )
}

const addDislike = (token, userID, postID) => {

    return axios.post(
        API_URL_LIKE_DISLIKES + "addDislike",
        {
            userId: userID,
            postId: postID
        },
        {
            headers:{
                Authorization: token,
            }
        }
    )
}

const LikeDislikeService = {
    addLike,
    addDislike
}

export default LikeDislikeService