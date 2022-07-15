import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

export const SignIn: React.FC<{}> = ({}) => {
  const [requiresChallenge, setChallenge] = useState(false);
  const [user, setUser] = useState(null);

  const {handleSubmit, register, errors, getValues, setError} = useForm<{ phoneNumber: string, code: string }>();

  const onSubmit = async ({phoneNumber, code}: { phoneNumber: string, code: string }) => {
    if (requiresChallenge) {
      try {
        await Auth.sendCustomChallengeAnswer(user, code);
        await Auth.currentSession();
      } catch (e) {
        setError("code", "error.unknown");
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
    const {phoneNumber} = getValues();
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
