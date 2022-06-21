import React, {useContext, useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useLocation, useNavigate} from "react-router-dom";
import UserContext from "../contextes/UserContext";
import AuthService from "../services/AuthService";

const Profil = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const [avatarSource, setAvatarSource] = useState('')
  const [infosUserUpdate, setInfosUserUpdate] = useState('')
  const [avatarFile, setAvatarFile] = useState('')
  const [avatarInput, setAvatarInput] = useState('')
  const [errorAvatarInput, setErrorAvatarInput] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [errorPseudo, setErrorPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passUserUpdate, setPassUserUpdate] = useState('')
  let navigate = useNavigate();

  // Similar to componentDidMount and componentDidUpdate ?
  useEffect(() => {    // Update the document title using the browser API
    document.title = "Profil";
    console.log("call")
    if(!currentUser || !localStorage.getItem("user")){
      navigate("/connexion")
    }else{
      loadUser()
    }
  }, [localStorage, currentUser]);

  const loadUser = (e) => {
    let id;
    let token;
    if(!currentUser){
      const userFromLocalStorage = localStorage.getItem("user");
      id = Object.values(JSON.parse(userFromLocalStorage))[0]
      token = Object.values(JSON.parse(userFromLocalStorage))[1]
      setCurrentUser(JSON.parse(userFromLocalStorage))
      //console.log(currentUser)
    }else{
      id = currentUser.userId
      token = currentUser.token
      //console.log(currentUser.userId)
    }
    AuthService.getCurrentUser(id,token).then(
        (response) => {
          const arrayFromUser = Object.values(response)
          console.log(arrayFromUser)
          setPseudo(arrayFromUser[1])
          setEmail(arrayFromUser[2])
          setAvatarSource(arrayFromUser[4])
          setPassword("")
        },
        (error) => {
          console.log(error)
        }
    )
  }

  const handleAvatarChange = e => {
    setAvatarInput(e.target.value)
    setAvatarFile(e.target.files[0])
  }

  const onAvatarFormSubmit = (e) => {
    e.preventDefault()
    console.log(avatarFile)

    AuthService.updateAvatar(currentUser.userId, currentUser.token, avatarFile)
        .then((response) => {
              console.log(response)
            },
            (error) => {
              console.log(error.message)
            }
        )
  }
  const onInfosFormSubmit = (e) => {
    e.preventDefault()
    AuthService.updateUserInfos(currentUser.userId, currentUser.token, pseudo, email)
        .then((response) => {
              console.log(response)
              setInfosUserUpdate("Vos informations ont étées mises à jour.")
            },
            (error) => {
              console.log(error)
            }
        ).catch((error) => console.log(error))
  }

  const onPassFormSubmit = (e) => {
    e.preventDefault()
    console.log("change password")
    if(password === confirmPassword){
      AuthService.updateUserPassword(currentUser.userId, currentUser.token, password)
          .then((response) => {
                console.log(response)
                setPassUserUpdate("Votre mot de passe a été mis à jour.")
              },
              (error) => {
                console.log(error.message)
              }
          )
    }
  }

  const deleteAccount = (e) => {
    //console.log(e)
    e.preventDefault()
    AuthService.deleteUser(currentUser.userId, currentUser.token)
    navigate('/')
  }

  return <div>
    <Header/>
      <div className="container">
        <h1 className="text-center">Profil</h1>
        <hr/>
        <h2>Changer son avatar</h2>
        <img className="avatar" src={avatarSource} alt="photo de profil de l'utilisateur"/>
        <form onSubmit={onAvatarFormSubmit} encType="multipart/form">
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">Veuillez sélectionner une image</label>
            <input type="file" name="image" accept="image/*" className="form-control" id="avatar" onChange={handleAvatarChange} value={avatarInput}/>
          </div>
          <button className="btn btn-primary" type="submit">Enregistrer l'avatar</button>
        </form>
        <hr className="mt-5 mb-5"/>
        <h2>Changer ses informations</h2>
        <form onSubmit={onInfosFormSubmit}>
          <div className="mb-3">
            <label htmlFor="pseudo" className="form-label">Pseudo</label>
            <input type="text" className="form-control" id="pseudo" onChange={value => setPseudo(value.target.value)} value={pseudo}/>
            {errorPseudo && (
                <div className="alert alert-danger" role="alert">
                  {errorPseudo}
                </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Adresse email</label>
            <input type="email" className="form-control" id="email" onChange={value => setEmail(value.target.value)} value={email}/>
            {errorEmail && (
                <div className="alert alert-danger" role="alert">
                  {errorEmail}
                </div>
            )}
          </div>
          <button className="btn btn-primary" type="submit">Enregistrer les modifications</button>
        </form>
        <hr className="mt-5 mb-5"/>
        <h2>Changer son mot de passe</h2>
        {passUserUpdate !== '' && (
            <div className="alert alert-success" role="alert">
              {passUserUpdate.toString()}
            </div>
        )}
        <form onSubmit={onPassFormSubmit}>
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
          <button type="submit" className="btn btn-primary">Enregistrer le nouveau mot de passe</button>
        </form>
        <hr className="mt-5 mb-5"/>
        <h2>Suppression du compte</h2>
        <small>Attention, toute suppression est définitive !</small><br/>
        <button type="button" className="btn btn-danger mb-5" onClick={deleteAccount}>Supprimer mon compte</button>
      </div>
    <Footer/>
  </div>;
};
export default Profil;
