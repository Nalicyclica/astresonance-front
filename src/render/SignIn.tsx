import React, { useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router-dom';
import { CurrentUser } from '../functions/UserInfo';
import ErrorList from './ErrorList'
import { preventEnter, requiredErrorMessage } from '../functions/FormFunc';

export type SignInInfo = {
  email: string
  password: string
};

const SignIn: React.FC = () => {
  const history = useHistory();
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const { register, handleSubmit, watch, formState: {errors}} = useForm();
  
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
    }else if(userInfo.isSignIn){
      history.push('/');
    }
  }, [userInfo]);

	return (
    <div className="flex-grow  backdrop-filter backdrop-blur-sm">
      <form onKeyPress={(e) => preventEnter(e)} onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col justify-start items-center w-screen text-gray-100">
        <h1 className="text-2xl mt-8 mb-6 px-4 text-yellow-300 border-b border-yellow-300">メールアドレスでログインして下さい</h1>
        { userInfo.action=="signIn" && !userInfo.valid && <ErrorList errors={userInfo.errors.response.data.errors}/>}
        <div className="w-64">
          <div className="mb-4">
            <p className="w-full text-shadow-black">E-mail:</p>
            <input type="text" {...register("email", {required: requiredErrorMessage})}
              placeholder="名前を入力して下さい" className="w-full my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <p className="w-full text-shadow-black">パスワード:</p>
            <input type="password" {...register("password", {required: requiredErrorMessage})}
              placeholder="パスワードを入力してください" className="w-full my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>
        </div>
        <input type="submit" value="ログイン" className="text-xl my-4 px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold"/>
      </form>
    </div>
	);
}

export default SignIn