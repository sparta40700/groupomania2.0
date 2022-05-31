import React from "react";
import LeftNav from "../LeftNav";
import { userSelector } from "react-redux";

const UpdateProfil = () => {
  const userData = userSelector((state) => state.userReducer);
  const { currentUser } = userData;
  console.log(currentUser);
  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de Profil</h3>
          <img src={userData.avatar} alt="avatar" />
          <h3>Changer votre photo de profil</h3>
          <input type="file" name="avatar" id="avatar" />
          <button type="submit">Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
