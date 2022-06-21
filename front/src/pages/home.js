import React, {useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
//import {useNavigate} from "react-router-dom";

const Home = () => {

    useEffect(() => {    // Update the document title using the browser API
        document.title = "accueil";
    },[]);
  return (
    <div>
      <Header />

      <Footer />
    </div>
  );
};

export default Home;
