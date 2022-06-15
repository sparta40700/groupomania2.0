import React, { useEffect } from "react";
import LeftNav from "../components/LeftNav";
import Header from "../components/Header";
import Thread from "../components/Thread";
import Footer from "../components/Footer";
//import {useNavigate} from "react-router-dom";

const Home = () => {
  useEffect(() => {
    // Update the document title using the browser API
    document.title = "accueil";
  }, []);
  return (
    <div className="home">
      <LeftNav />
      <Header />
      <div className="main">
        <Thread />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
