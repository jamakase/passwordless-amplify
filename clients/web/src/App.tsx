import React, { useState } from 'react';

import { Auth } from 'aws-amplify';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import './App.css';

import awsconfig from './aws-exports';
import { SignUp } from "./views/SignUp";
import { SignIn } from "./views/SignIn";

Auth.configure(awsconfig);

type LoggedInState = "offline" | "signedIn"

const Routing: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="signup" element={<SignUp/>}/>
      <Route path="login" element={<SignIn/>}/>
      <Route path="/" element={<Navigate to={"login"}/>}/>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routing/>
    </BrowserRouter>
  );
}

export default App;
