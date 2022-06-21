import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import AuthService from "../services/AuthService";
import UserContext from "../contextes/UserContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Connexion = () => {
    //const {state} = useLocation();
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    let navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext)

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {    // Update the document title using the browser API
        document.title = "Connexion";
        if(currentUser || localStorage.getItem('user')){
            navigate("/actus")
        }
    }, [localStorage]);

    const onFormSubmit = (e) => {
        e.preventDefault()
        if(email === ''){
            setErrorEmail('Ce champ est vide')
        }else{
            setErrorEmail('')
        }

        if(password === ''){
            setErrorPassword('Ce champ est vide')
        }else{
            setErrorPassword('')
        }

        if(email !== '' && password !== ''){
            AuthService.login(email, password).then(
                (response) => {
                    const message = "Vous êtes bien connecté"
                    setCurrentUser(response)
                    navigate('/actus', {state: message})
                },
                (error) => {
                    console.log(error)
                }
            )
        }
    }

    return (
        <div>
            <Header/>
            <div className="container">
                <h1>Connexion</h1>
                <p>Formulaire de connexion</p>
                <form onSubmit={onFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Adresse email</label>
                        <input type="email" className="form-control" id="email" onChange={value => setEmail(value.target.value)}/>
                        {errorEmail && (
                            <div className="alert alert-danger" role="alert">
                                {errorEmail}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" id="password" onChange={value => setPassword(value.target.value)}/>
                        {errorPassword && (
                            <div className="alert alert-danger" role="alert">
                                {errorPassword}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">Se connecter</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
};

export default Connexion;
