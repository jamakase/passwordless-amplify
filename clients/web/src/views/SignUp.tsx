import React from "react";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

export const SignUp: React.FC<{}> = () => {
  const { handleSubmit, register, errors } = useForm<{ phoneNumber: string }>();
  const onSubmit = async ({ phoneNumber }: { phoneNumber: string }) => {
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