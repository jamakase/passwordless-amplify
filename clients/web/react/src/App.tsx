import React, {useState} from 'react';

import {Auth, Hub} from 'aws-amplify';
import {useForm} from "react-hook-form";

import './App.css';

import awsconfig from './aws-exports';

Auth.configure(awsconfig);

const SignUp: React.FC<{}> = () => {
  const {handleSubmit, register, errors} = useForm<{ phoneNumber: string }>();
  const onSubmit = async ({phoneNumber}: { phoneNumber: string }) => {
    try {
      const result = await Auth.signUp({
        username: phoneNumber,
        password: "123456",
        attributes: {
          phone_number: phoneNumber
        }
      });

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="phoneNumber">
          Phone
        </label>
        <input
            name="phoneNumber"
            ref={register({
              required: 'Required',
            })}
        />
        {errors.phoneNumber && errors.phoneNumber.message}
        <button type="submit">Submit</button>
      </form>
  );
};

const SignIn: React.FC<{ setStatus: Function }> = ({setStatus}) => {
  const {handleSubmit, register, errors, getValues} = useForm<{ phoneNumber: string, code: string }>();
  const [requiresChallenge, setChallenge] = useState(false);
  const [user, setUser] = useState(null);
  const onSubmit = async ({phoneNumber, code}: { phoneNumber: string, code: string }) => {
    console.log(requiresChallenge);
    if (requiresChallenge) {
      console.log(user, code);
      try {
        await Auth.sendCustomChallengeAnswer(user, code);
        await Auth.currentSession();
        setStatus("signedIn");
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const result = await Auth.signIn({
          username: phoneNumber,
          password: "",
        });

        setUser(result);

        if (result.challengeName === "CUSTOM_CHALLENGE") {
          setChallenge(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onResendCode = async () => {
    const { phoneNumber } = getValues();
    const result = await Auth.signIn({
      username: phoneNumber,
      password: "",
    });

    setUser(result);
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="phoneNumber">
          Phone
        </label>
        <input
            name="phoneNumber"
            ref={register({
              required: 'Required',
            })}
        />
        {errors.phoneNumber && errors.phoneNumber.message}
        {requiresChallenge && <>
          <label htmlFor="code">
            Code
          </label>
          <input
            name="code"
            ref={register({
              required: 'Required',
            })}
          />
        </>}
        <button type="submit">SignIn</button>
        <button onClick={() => onResendCode()}>Resend code</button>
      </form>
  );
};
const App: React.FC = () => {
  const [status, setStatus] = useState("offline");
  return (
      <>
        <SignUp/>
        <SignIn setStatus={setStatus}/>
        {status === "signedIn" && "SignedIn"}
      </>
  );
}

export default App;
