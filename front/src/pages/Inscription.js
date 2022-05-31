import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthService from "../services/AuthService";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Inscription = () => {
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorCreateUser, setErrorCreateUser] = useState('')
    let navigate = useNavigate();


    useEffect(() => {
        document.title = "Inscription";
    });

    const onFormSubmit = e => {
        e.preventDefault()

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

        if (!emailRegex.test(email)) {
            setErrorEmail("Vous devez mettre un email valide.")
        } else {
            setErrorEmail("")
        }

        if (password === "" || password !== confirmPassword) {
            setErrorPassword("Les mots de passe ne correspondent pas.")
        } else {
            setErrorPassword("")
        }

        if (emailRegex.test(email) && password !== '' && password === confirmPassword) {
            console.log('do request to server')
            let pseudo = ''
            let avatarUrl = '../public/assets/avatars/blank-profile.png';
            let isAdmin = false;
            AuthService.registration(pseudo, email, password, avatarUrl, isAdmin)
                .then((response) => {
                    console.log(response.data)
                    //console.log(response.status)
                    //console.log(response.headers)
                    if(response.status === 500){
                        setErrorCreateUser("Cet email est déjà utilisé.")
                    }
                    if(response.status === 200){
                        console.log('utilisateur créé')
                        const data = "Votre compte a bien été créé !"
                        setEmail("")
                        setPassword("")
                        setConfirmPassword("")

                        navigate('/connexion', {state: data})
                    }
                }).catch((error) => {
                if(error.response.data.error === "Validation error: User already exist!"){
                    setErrorCreateUser("Cet email est déjà utilisé.")
                }
                //console.log(error)
            })

        }
    }
    return (
        <div>
            <Header/>
            <div className="container">
                <h1>Inscription</h1>
                <p>Formulaire d'inscription</p>
                {errorCreateUser !== "" && (
                    <div className="alert alert-danger" role="alert">
                        {errorCreateUser.toString()}
                    </div>
                )}
                <form onSubmit={onFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Adresse email</label>
                        <input type="email" className="form-control" id="email" onChange={value => setEmail(value.target.value)}/>
                        {errorEmail && (
                            <div className="alert alert-danger" role="alert">
                                {errorEmail}
                            </div>
                        )}
                        {/*<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>*/}
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
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirmation du mot de passe</label>
                        <input type="password" className="form-control" id="confirmPassword" onChange={value => setConfirmPassword(value.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">S'inscrire</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default Inscription