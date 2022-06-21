import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserContext from "../../contextes/UserContext"
import postService from "../../services/PostService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostService from "../../services/PostService";

function ModifyOnePost(props) {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [post, setPost] = useState([])
    const [postImgInput, setPostImgInput] = useState('')
    const [postImgSource, setPostImgSource] = useState('')
    //const [postTitle, setPostTitle] = useState('');
    const [postImgFile, setPostImgFile] = useState()
    const [postId, setPostId] = useState()
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [errorText, setErrorText] = useState('')
    const [errorTitle, setErrorTitle] = useState('')
    let navigate = useNavigate();

    // Similar to componentDidMount and componentDidUpdate
    useEffect(() => {    // Update the document title using the browser API
        if(!currentUser && !localStorage.getItem("user") || currentUser === undefined){
            localStorage.removeItem("user")
            setCurrentUser(undefined)
            navigate("/login")
        }
        const url = window.location.href
        let splitUrl = url.split("/")
        const postId = splitUrl[splitUrl.length -1]
        const userId = currentUser.userId

        //get post with id in url
        postService.getOnePost(currentUser.token, postId)
            .then((post) =>{
                //console.log(post.data)
                setPost(post.data)
                document.title = "Article " + post.data.title
                setPostId(post.data.id)
                setTitle(post.data.title)
                setText(post.data.content)
                setPostImgSource(post.data.imageUrl)
            }).catch(error => console.log(error.message))
    },[currentUser]);

    const handlePostImageChange = (e) => {
        e.preventDefault()
        setPostImgInput(e.target.value)
        setPostImgFile(e.target.files[0])
    }

    const onModifyPostFormSubmit = (e) => {
        e.preventDefault()
        if(text !== '' && title !== ''){
            PostService.modifyPost(currentUser.userId, currentUser.token, postId, title, text, postImgFile)
                .then((response) => {
                    //console.log(response)
                    if(response.status === 201){
                        navigate("/actus")
                    }
                }).catch((error) => console.log(error))
        }
    }

    return (
        <div>
            <Header/>
            <div className="container mt-5 mb-5">
                <h1 className="text-center">Modifier l'actualité {title}</h1>
                <hr/>
                <img className="avatar" src={postImgSource} alt="photo de profil de l'utilisateur"/>
                <form onSubmit={onModifyPostFormSubmit} encType="multipart/form">
                    <div className="mb-3">
                        <label htmlFor="imagePost" className="form-label">Modifiez l'image de cette actualité</label>
                        <input type="file" name="image" accept="image/*" className="form-control" id="imagePost" value={postImgInput} onChange={handlePostImageChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Modifiez le titre de cette l'actualité</label>
                        <input type="text" className="form-control" id="title" onChange={value => setTitle(value.target.value)} value={title}/>
                        {errorTitle && (
                            <div className="alert alert-danger" role="alert">
                                {errorTitle}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Modifiez la description de cette l'actualité</label>
                        <textarea className="form-control" id="text" onChange={value => setText(value.target.value)} rows="3" value={text}></textarea>
                        {errorText && (
                            <div className="alert alert-danger" role="alert">
                                {errorText}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">Enregistrer les modifications sur cette actualité</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default ModifyOnePost