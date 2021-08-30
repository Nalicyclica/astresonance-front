import React, { useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router-dom';
import { CurrentUser } from '../functions/UserInfo';

export type SignInInfo = {
  email: string
  password: string
};

const SignIn: React.FC = () => {
  const history = useHistory();
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const { register, handleSubmit, watch, formState: {errors} } = useForm();

  if(userInfo.isSignIn){
    history.push('/');
  }

  const onSubmit = (data: SignInInfo) => {
        setUserInfo.signIn(data);
  };

  useEffect(() => {
    if(userInfo.action == "signIn"){
      if(userInfo.valid){
        history.goBack();
      }else{
        console.log(userInfo.errors);
      }
    }
  }, [userInfo])

	return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col justify-start items-center w-screen text-gray-100">
      <h1 className="text-2xl mt-8 mb-6 px-4 text-yellow-300 border-b border-yellow-300">Sign in with your nickname</h1>
      { Object.keys(userInfo.errors).length > 0 && <p>{"Error!"}</p>}
      <label className="my-2">
        <p>E-mail:</p>
        <input type="text" {...register("email")} placeholder="Enter your nickname" onChange={hoge => hoge} className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
      </label>
      <label className="my-2">
        <p>Password:</p>
        <input type="password" {...register("password")} placeholder="Enter your password" onChange={hoge => hoge} className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
      </label>
      <input type="submit" value="Sign in" className="text-xl my-4 px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold"/>
    </form>
	);
}

export default SignIn