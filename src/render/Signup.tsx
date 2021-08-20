import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { User, authUser, userSignUp } from '../redux/reducers/user'
import { useForm } from "react-hook-form"

const SignUp: React.FC = () => {
  const inputUser = useSelector(authUser);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const onSubmit = (data: User) => {
    dispatch(userSignUp(data));
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