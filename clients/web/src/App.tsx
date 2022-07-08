import React, { useState } from 'react';

import { Auth } from 'aws-amplify';

import './App.css';

import awsconfig from './aws-exports';
import { SignUp } from "./views/SignUp";
import { SignIn } from "./views/SignIn";

Auth.configure(awsconfig);

type LoggedInState = "offline" | "signedIn"

const App: React.FC = () => {
  const [status, setStatus] = useState<LoggedInState>("offline");
  return (
    <>
      <SignUp/>
      <SignIn setStatus={setStatus}/>
      {status === "signedIn" && "SignedIn"}
    </>
  );
}

export default App;
