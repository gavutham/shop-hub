import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";
import { setInitial } from "../redux/cartRedux";
import { logoutUser } from "../redux/userRedux";

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logoutUser())
  dispatch(setInitial())
  return <Navigate to={"/"}/>
};


export default Logout;
