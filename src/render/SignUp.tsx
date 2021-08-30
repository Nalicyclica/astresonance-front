import React, { useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router';
import { CurrentUser } from '../functions/UserInfo';
import ErrorList from './ErrorList';

export type SignUpInfo = {
  email: string
  password: string
  password_confirmation: string
  nickname: string
  icon_color: string
  introduce: string
};

const SignUp: React.FC = () => {
  const history = useHistory();
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const { register, handleSubmit, watch, formState: {errors} } = useForm();

  if(userInfo.isSignIn){
    history.push('/');
  }
    
  const onSubmit = (data: SignUpInfo) => {
    data.introduce = "よろしくお願いします";
    setUserInfo.signUp(data);
  };
  
  useEffect(() => {
    if(userInfo.action == "signUp"){
      if(userInfo.valid){
        history.goBack();
      }else{
        console.log(userInfo.errors);
      }
    }
  }, [userInfo])

  return (
    <div className="flex-grow bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start items-center text-gray-100">
        <h1 className="text-2xl mt-8 mb-6 px-4 text-yellow-300 border-b border-yellow-300">Please enter your information</h1>
        { userInfo.action=="signUp" && !userInfo.valid && <ErrorList errors={userInfo.errors.response.data.errors.full_messages}/>}
        <label className="my-2">
          <p>Nickname:</p>
          <input type="text" {...register("nickname")} placeholder="ex.) ARGuy" className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
        <label className="my-2">
          <p>Email:</p>
          <input type="text" {...register("email")}  placeholder="Enter your email" className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
        <label className="my-2">
          <p>Password:</p>
          <input type="password" {...register("password")} placeholder="at least 6 letters" className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
          {errors.password && <p>"passwordは英数字をそれぞれ１字以上含みかつ６文字以上である必要があります"</p>}
        <label className="my-2">
          <p>Password confirmation:</p>
          <input type="password" {...register("password_confirmation")}  placeholder="verify password" className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
        <label className="my-2">
          <p>Icon color:</p>
          <input type="color" {...register("icon_color")} placeholder="verify password" className="h-8 w-16 my-2 px-0.5 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md"/>
        </label>
        <input type="submit" value="Sign up" className="text-xl my-4 px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold"/>
      </form>
    </div>
	);
}

export default SignUp