import React from 'react'
import Login from '../Auth/Login';
import Verify from '../Auth/Verify';
import Forgot from '../Auth/Forgot';
import Loader from "../Components/Loader/Loader";

export const publicRoutes = [
    { path: "/", element: <Login /> },
    { path: "verify", element: <Verify /> },
    { path: "forgot", element: <Forgot /> },
    { path: "loader", element: <Loader /> },
];