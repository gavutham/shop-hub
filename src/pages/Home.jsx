import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  const location  = useLocation().state
  console.log(location);
  if(location != null && location.fromLogin){
    window.location.reload()
    return <Navigate to={"/"} state={null}/>
  }
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
