import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import UserContext from "../../contextes/UserContext"
import postService from "../../services/PostService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommentService from "../../services/CommentService";
import commentService from "../../services/CommentService";
import dayjs from "dayjs";
import "dayjs/locale/fr"
import like from '../../assets/icones/like.png';
import likeFill from '../../assets/icones/like-fill.png';
import dislike from '../../assets/icones/dislike.png';
import dislikeFill from '../../assets/icones/dislike-fill.png';
import LikeDislikeService from "../../services/LikeDislikeService";
import AuthService from "../../services/AuthService";

//import PostService from "../../services/PostService";

function OnePost(props) {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState('')
    const [commentValid, setCommentValid] = useState('')
    const [admin, setAdmin] = useState(false)
    const [userLikes, setUserLikes] = useState({})
    const [userDislikes, setUserDislikes] = useState({})
    let navigate = useNavigate();

    // Similar to componentDidMount and componentDidUpdate
    useEffect(() => {    // Update the document title using the browser API
        document.title = "Article"
        if(!currentUser && !localStorage.getItem("user") || currentUser === undefined){
            navigate("/login")
        }
        const url = window.location.href
        let splitUrl = url.split("/")
        const postId = splitUrl[splitUrl.length -1]
        //const userId = currentUser.userId
        //console.log(currentUser)
        AuthService.getCurrentUser(currentUser.userId,currentUser.token).then(
            (response) => {
                const arrayFromUser = Object.values(response)
                //console.log(arrayFromUser)
                //console.log(arrayFromUser[5].postsId)
                setUserLikes(arrayFromUser[5])
                console.log(userLikes)
                setUserDislikes(arrayFromUser[6])
            },
            (error) => {
                console.log(error)
            }
        )

        //get post with id in url
        postService.getOnePost(currentUser.token, postId)
            .then((post) =>{
                console.log(post)
                console.log(post.data.id)
                setPost(post.data)
                commentService.getAllComments(currentUser.token, postId)
                    .then((comments) => {
                        console.log(comments)
                        setComments(comments.data)
                    }).catch(error => console.log(error.message))
            }).catch(error => console.log(error.message))
    },[currentUser]);

    const onSubmitFormComment = (e) => {
        e.preventDefault()
        CommentService.createComment(currentUser.userId, currentUser.token, post.id, comment)
            .then((response)=> {
                console.log(response.data)
                setCommentValid(response.data.message)
                commentService.getAllComments(currentUser.token, post.id)
                    .then((comments) => {
                        console.log(comments)
                        setComments(comments.data)
                    }).catch(error => console.log(error.message))
            }).catch((error)=>{
                console.log(error)
        })
    }
    const deleteComment = (commentId) => {
        //console.log(commentId)
        CommentService.deleteComment(currentUser.token, commentId)
            .then((response) => {
                //console.log(response)
                //console.log(post.id)
                //navigate("/onePost/" + post.id)
                commentService.getAllComments(currentUser.token, post.id)
                    .then((comments) => {
                        console.log(comments)
                        setComments(comments.data)
                    }).catch(error => console.log(error.message))
                //navigate("/actus")
            })
            .catch((error) => console.log(error))
    }

    const addLike = (e) => {
        LikeDislikeService.addLike(currentUser.token, currentUser.userId, post.id)
            .then((response) => {
                console.log(response)
                setUserLikes(response.data.likes)
                setUserDislikes(response.data.dislikes)
            })
            .catch((error) => console.log(error))
    }

    const addDislike = (e) => {
        LikeDislikeService.addDislike(currentUser.token, currentUser.userId, post.id)
            .then((response) => {
                console.log(response)
                setUserLikes(response.data.likes)
                setUserDislikes(response.data.dislikes)
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className="container">
            <Header/>
            {post !== null && (
                <div className="mt-5 mb-5">
                    <div className="row">
                        <div className="col-xs-12 col-md-8 col-lg-8">
                            {post.imageUrl ? (
                                <img className="post-img" src={post.imageUrl} />
                            ) : null}
                        </div>
                        <div className="col-xs-12 col-md-8 col-lg-8">
                            <h1 className="text-center">{post.title}</h1>
                            <small>
                                {userLikes.postsId && userLikes.postsId.includes(post.id) ?
                                    <img className="icon-like" onClick={addLike} src={likeFill} alt="icone de like"/> :
                                    <img className="icon-like" onClick={addLike} src={like} alt="icone de like"/>
                                }
                                {userDislikes.postsId && userDislikes.postsId.includes(post.id) ?
                                    <img className="icon-dislike" onClick={addDislike} src={dislikeFill} alt="icone de dislike"/> :
                                    <img className="icon-dislike" onClick={addDislike} src={dislike} alt="icone de dislike"/>
                                }
                            </small>
                            <hr/>
                            <p>{post.content}</p>
                        </div>
                    </div>
                </div>
            )}
            <hr/>
            <h2>Poster un commentaire</h2>
            {commentValid && (
                <div className="alert alert-success" role="alert">
                    {commentValid}
                </div>
            )}
            <form onSubmit={onSubmitFormComment}>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Veuillez mettre une description pour cette l'actualité</label>
                    <textarea className="form-control" id="text" onChange={value => setComment(value.target.value)} rows="3"></textarea>
                    {commentError && (
                        <div className="alert alert-danger" role="alert">
                            {commentError}
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Poster un commentaire</button>
            </form>
            <hr/>
            <h2>Les commentaires</h2>
            {comments !== [] && (
                <div className="container">
                    {comments.map((oneComment) =>(
                        <div className="card mt-3 mb-3 pt-3 ps-3" key={oneComment.id}>
                            <h6 className="card-subtitle mb-2 text-muted">auteur: {oneComment.author}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Posté le: {dayjs(oneComment.createdAt).locale("fr").format("DD/MM/YYYY à HH[h]mm")}</h6>
                            <p className="card-text">Commentaire: {oneComment.content}</p>
                            <div>
                                {(currentUser.userId === oneComment.userId || admin === true) && (
                                    <div>
                                        <Link to={`/modifyComment/${oneComment.id}`}>
                                            <button className="btn btn-primary mt-3">Modifier le commentaire</button>
                                        </Link> <br/>
                                        <button className="btn btn-danger mt-3" onClick={() => deleteComment(oneComment.id)}>Supprimer le commentaire</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Footer/>
        </div>
    )
}

export default OnePost