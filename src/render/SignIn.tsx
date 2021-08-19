import React, { useContext } from 'react';
import { CurrentUser, UserInfo, defaultUserInfo } from './Main';
import { useForm } from "react-hook-form"

const SignIn: React.FC = () => {
  const { userInfo, setUserInfo } = useContext(CurrentUser)
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const onSubmit = (data: UserInfo) => {
    const userData: UserInfo = {...defaultUserInfo, ...data};
    console.log("prev:")
    console.log(userInfo)
    setUserInfo(userData)
    console.log("cons:")
    console.log(userInfo)
  };
	return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col justify-start items-center w-screen text-gray-100">
      <h1 className="text-2xl mt-8 mb-6 px-4 text-yellow-300 border-b border-yellow-300">Sign in with your nickname</h1>
      <label className="my-2">
        <p>E-mail:</p>
        <input type="text" {...register("uid")} placeholder="Enter your nickname" onChange={hoge => hoge} className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
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