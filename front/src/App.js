import React, {useState} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Profil from "./pages/profil";
import Actu from "./pages/Actu";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import PostCreate from "./pages/post/PostCreate"
import OnePost from "./pages/post/OnePost";
import ModifyOnePost from "./pages/post/ModifyOnePost";
import ModifyComment from "./pages/comment/ModifyComment"
import {DataProvider} from "./contextes/UserContext";

const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    return (
        <DataProvider value={{currentUser, setCurrentUser}}>
        <Routes>
            {/* <switch> */}
            <Route path="/" element={<Home/>}/>
            <Route path="/actus" element={<Actu/>}/>
            <Route path="/profil" element={<Profil/>}/>
            <Route path="/connexion" element={<Connexion/>}/>
            <Route path="/inscription" element={<Inscription/>}/>
            <Route path="/post/create" element={<PostCreate/>}/>
            <Route path="/onePost/:id" element={<OnePost/>}/>
            <Route path="/modifyPost/:id" element={<ModifyOnePost/>}/>
            <Route path="/modifyComment/:id" element={<ModifyComment/>}/>
            {/*<Route path="/deconnexion" element={<Deconnexion />} />*/}
            {/* <Redirect to="/" /> */}
            {/* </switch> */}
        </Routes>
        </DataProvider>
    );
};

export default App;
