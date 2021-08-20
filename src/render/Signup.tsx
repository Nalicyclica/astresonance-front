import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router';
import { CurrentUser, UserInfo } from './Main';
import { authToken, setAuth } from '../functions/Auth';

type signUpInfo = {
  email: string
  password: string
  nickname: string
  icon_color: string
  introduce: string
};

const SignUp: React.FC = () => {
  const history = useHistory();
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const [responseErrors, setErrors] = useState<object>({});

  const signUp = async (inputInfo: signUpInfo) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/sign_in',
        inputInfo
        );
        const headerInfo = response.headers;
        const headerData = response.data.data;
        const inputAuth: authToken = {
          'access-token': headerInfo["access-token"],
          client: headerInfo.client,
          uid: headerInfo.uid,
        };
        setAuth(inputAuth);
        const userData: UserInfo = {
          nickname: headerData.nickname,
          iconColor: headerData.icon_color,
          isSignIn: true
        };
        setUserInfo(userData);
      } catch (error){
        setErrors(error)
      };
    };
    
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const onSubmit = (data: signUpInfo) => {
      setErrors({});
      data['introduce'] = "よろしくお願いします";
      signUp(data);
      if(true){
        history.goBack();
      }else{
        console.log(responseErrors);
      }
    };
    console.log(watch("example"));
    return (
      <div className="flex-grow bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start items-center text-gray-100">
        <h1 className="text-2xl mt-8 mb-6 px-4 text-yellow-300 border-b border-yellow-300">Please enter your information</h1>
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
          <input type="password" {...register("password")}  placeholder="at least 6 letters" className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
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