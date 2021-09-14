import React, { useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router';
import { CurrentUser } from '../functions/UserInfo';
import ErrorList from './ErrorList';
import { emailErrorMessage, emailValidate, passwordConfirmErrorMessage, passwordErrorMessage, passwordValidate, preventEnter, requiredErrorMessage } from '../functions/FormFunc';
import LoadingNow from './LoadingNow';

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
  const { userInfo, loading, result, setUserInfo } = useContext(CurrentUser);
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
    
  const onSubmit = (data: SignUpInfo) => {
    data.introduce = "よろしくお願いします";
    setUserInfo.signUp(data);
  };
  
  useEffect(() => {
    if(result.action == "signUp"){
      if(result.valid){
        history.goBack();
      }else{
        console.log(result.errors);
      }
    }else if(userInfo.isSignIn){
      history.push('/');
    }
  }, [userInfo])

  return (
    <div className="flex-grow backdrop-filter backdrop-blur-sm">
      <form onKeyPress={(e) => preventEnter(e)} onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start items-center text-gray-100">
        <h1 className="text-2xl mt-8 mb-6 px-4 text-yellow-300 border-b border-yellow-300">ユーザー情報を入力して下さい</h1>
        { result.action=="signUp" && !result.valid && <ErrorList errors={result.errors.response.data.errors.full_messages}/>}
        <div className="w-64">
          <div className="mb-4">
            <p className="w-full text-shadow-black">ニックネーム:</p>
            <input type="text" {...register("nickname", { required: requiredErrorMessage})} placeholder="例.）太郎" className="w-full my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
            {errors.nickname && <p className="text-red-600 text-sm">{errors.nickname.message}</p>}
          </div>
          <div className="mb-4">
            <p className="w-full text-shadow-black">E-mail:</p>
            <input type="text" {...register("email", { required: requiredErrorMessage, pattern: { value: emailValidate, message: emailErrorMessage }})}
              placeholder="メールアドレスを入力して下さい" className="w-full my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <p className="w-full text-shadow-black">パスワード:</p>
            <input type="password" {...register("password", { required: requiredErrorMessage, pattern: { value: passwordValidate, message: passwordErrorMessage }})}
              placeholder="６文字以上、英数字を各１字以上含む" className="w-full my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <p className="w-full text-shadow-black">パスワード（確認）:</p>
            <input type="password" {...register("password_confirmation", {required: requiredErrorMessage, validate: (value)=> value == watch('password') || passwordConfirmErrorMessage })}
              placeholder="確認のためもう１度入力して下さい" className="w-full my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
            {errors.password_confirmation && <p className="text-red-600 text-sm">{errors.password_confirmation.message}</p>}
          </div>
          <div className="mt-4 mb-2 flex flex-col items-center">
            <p className="text-shadow-black">アイコンカラー:</p>
            <input type="color" {...register("icon_color")} className="h-8 w-16 my-2 px-0.5 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md"/>
          </div>
          <div className="mb-24 flex flex-col items-center">
            <input type="submit" value="新規登録" className="text-xl text-yellow-400 my-4 px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold"/>
          </div>
        </div>
      </form>
      { loading && <LoadingNow />}
    </div>
	);
}

export default SignUp