import React from "react";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import clsx from "clsx";
import { Link } from "react-router-dom";

export const SignUp: React.FC<{}> = () => {
  const {handleSubmit, register, errors} = useForm<{ phoneNumber: string }>();
  const onSubmit = async ({phoneNumber}: { phoneNumber: string }) => {
    try {
      const result = await Auth.signUp({
        username: phoneNumber,
        // TODO: generate random password here
        password: "!aA12345678",
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
    <div className="w-full min-h-full max-w-wd px-4 md:px-28 justify-center">
      <form className="grid grid-cols-1 gap-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block mb-3" htmlFor="phoneNumber">
            Phone
          </label>
          <input
            className={clsx("w-full border bg-gray-50 py-2 rounded block w-full", errors.phoneNumber && "border-red-400")}
            name="phoneNumber"
            ref={register({
              required: 'Required',
            })}
          /></div>
        {errors.phoneNumber && errors.phoneNumber.message}
        <button className="text-white bg-blue-600 hover:bg-blue-700 rounded-full py-2" type="submit">Submit</button>
      </form>
      <Link to="/login">Have an account? Login </Link>
      {/*<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">*/}
      {/*  <div className="md:flex">*/}
      {/*    <div className="md:shrink-0">*/}
      {/*      <img className="h-48 w-full object-cover md:h-full md:w-48" src="/img/store.jpg"*/}
      {/*           alt="Man looking at item at a store" />*/}
      {/*    </div>*/}
      {/*    <div className="p-8">*/}
      {/*      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>*/}
      {/*      <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding*/}
      {/*        customers for your new business</a>*/}
      {/*      <p className="mt-2 text-slate-500">Getting a new business off the ground is a lot of hard work. Here are*/}
      {/*        five ideas you can use to find your first customers.</p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};
