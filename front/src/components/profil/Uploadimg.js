import React from "react";
//import { userSelector } from "react-redux";
//const userData = userSelector((state) => state.userReducer);

const Uploadimg = () => {
  const handlePicture = (e) => {};
  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">changez votre photo de profil</label>
      <input type="file" name="file" id="file" accept=" .jpg, .jpeg, .png" />
    </form>
  );
};

export default Uploadimg;
