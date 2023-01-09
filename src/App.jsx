import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProducList from "./pages/ProducList.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Success from "./pages/Success.jsx";
import { useSelector } from "react-redux";
import Logout from "./pages/Logout.jsx";

const App = () => {
  const user = useSelector(state => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/products/:category" element={<ProducList />}/>
        <Route exact path="/product/:id" element={<Product />}/>
        <Route exact path="/cart" element={user !== null ? <Cart /> : <Navigate to="/login" />}/>
        <Route exact path="/login" element={user !== null ? <Navigate to="/" state={{fromLogin:true}}/> : <Login />}/>
        <Route exact path="/register" element={user !== null ? <Navigate to="/" state={{fromLogin:true}}/> : <Register />}/>
        <Route exact path="/success" element={<Success />}/>
        <Route exact path="/logout" element={<Logout/>}/>
      </Routes>
    </Router>
  );
};

export default App;
