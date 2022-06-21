import React, {useContext, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import UserContext from "../../contextes/UserContext";
import PostService from "../../services/PostService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function PostCreate(props) {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [postImgInput, setPostImgInput] = useState('')
    const [postImgFile, setPostImgFile] = useState()
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [errorText, setErrorText] = useState('')
    const [errorTitle, setErrorTitle] = useState('')
    let navigate = useNavigate();

    // Similar to componentDidMount and componentDidUpdate
    useEffect(() => {    // Update the document title using the browser API
        document.title = "Post creation";
        if(!currentUser || !localStorage.getItem("user") || currentUser === undefined){
            navigate("/login")
        }
    },[currentUser]);

    const handlePostImageChange = (e) => {
        e.preventDefault()
        setPostImgInput(e.target.value)
        setPostImgFile(e.target.files[0])
    }

    const handleTextChange = (e) => {
        e.preventDefault()
        setText(e.target.value)
    }

    const onCreatePostFormSubmit = (e) => {
        e.preventDefault()
        if(text !== null && title !== null && postImgFile !== null){
            PostService.createPost(currentUser.userId, currentUser.token, title, text, postImgFile)
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
                <h1 className="text-center">Créer un nouveau post</h1>
                <hr/>
                <form onSubmit={onCreatePostFormSubmit} encType="multipart/form">
                    <div className="mb-3">
                        <label htmlFor="imagePost" className="form-label">Veuillez sélectionner une image pour cette actualité</label>
                        <input type="file" name="image" accept="image/*" className="form-control" id="imagePost" value={postImgInput} onChange={handlePostImageChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Veuillez mettre un titre pour cette l'actualité</label>
                        <input type="text" className="form-control" id="title" onChange={value => setTitle(value.target.value)}/>
                        {errorTitle && (
                            <div className="alert alert-danger" role="alert">
                                {errorTitle}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Veuillez mettre une description pour cette l'actualité</label>
                        <textarea className="form-control" id="text" onChange={value => setText(value.target.value)} rows="3"></textarea>
                        {errorText && (
                            <div className="alert alert-danger" role="alert">
                                {errorText}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">Enregistrer cette actualité</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default PostCreate