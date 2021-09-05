import React, { useContext, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form"
import { CurrentUser } from '../functions/UserInfo';
import { AccountInfo, UpdateAccountArg } from '../functions/UpdateAccount';
import { emailErrorMessage, emailValidate, passwordConfirmErrorMessage, passwordErrorMessage, passwordValidate, requiredErrorMessage } from '../functions/FormFunc';

export const IconUpdateForm: React.FC<{icon_color: string, updateAccount:(value: UpdateAccountArg)=> void, setFormShow: (value: boolean) => void}> = ({icon_color, updateAccount, setFormShow}) => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const popUpRef: any = useRef();
  const formRef: any = useRef();

  useEffect(() => {
    popUpRef.current.addEventListener("mousedown", handleOutsideClick);
  }, []);
  
  const handleOutsideClick = (event: any) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setFormShow(false);
    }
  };

  const onSubmit = (data: AccountInfo) => {
    const inputInfo: UpdateAccountArg = {
      inputInfo: data,
      setUserInfo: setUserInfo.setUserInfo
    };
    updateAccount(inputInfo);
  };
  return(
    <div ref={popUpRef} className="absolute bg-gray-900 bg-opacity-80 flex justify-center items-center w-screen h-main">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-end p-6 rounded-md bg-gray-600">
        <div className="" >
          <p className="text-xl mt-2 mb-6">アイコンカラーの変更:</p>
          <input type="color" {...register("icon_color")} defaultValue={icon_color} className="h-12 w-24 mx-4 mb-2 rounded-md" />
        </div>
        <input type="submit" value="変更" className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold" />
      </form>
    </div>
  );
};

export const EmailUpdateForm: React.FC<{email: string, updateAccount:(value: UpdateAccountArg)=> void, setFormShow: (value: boolean) => void}> = ({email, updateAccount, setFormShow}) => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const popUpRef: any = useRef();
  const formRef: any = useRef();

  useEffect(() => {
    popUpRef.current.addEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOutsideClick = (event: any) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setFormShow(false);
    }
  };

  const onSubmit = (data: AccountInfo) => {
    const inputInfo: UpdateAccountArg = {
      inputInfo: data,
      setUserInfo: setUserInfo.setUserInfo
    };
    updateAccount(inputInfo);
  };
  return(
    <div ref={popUpRef} className="absolute bg-gray-900 bg-opacity-80 flex justify-center items-center w-screen h-main">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-end p-6 rounded-md bg-gray-600">
        <div className="w-64" >
          <p className="text-xl mb-2">E-mailの変更:</p>
          <input type="text" {...register("email", { required: requiredErrorMessage, pattern: { value: emailValidate, message: emailErrorMessage }})}
            defaultValue={email} className="w-full text-lg mr-4 mb-2 px-2 py-1 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black" />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <input type="submit" value="変更" className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold" />
      </form>
    </div>
  );
};

export const PasswordUpdateForm: React.FC<{updateAccount:(value: UpdateAccountArg)=> void, setFormShow: (value: boolean) => void}> = ({updateAccount, setFormShow}) => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const popUpRef: any = useRef();
  const formRef: any = useRef();

  useEffect(() => {
    popUpRef.current.addEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOutsideClick = (event: any) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setFormShow(false);
    }
  };

  const onSubmit = (data: AccountInfo) => {
    const inputInfo: UpdateAccountArg = {
      inputInfo: data,
      setUserInfo: setUserInfo.setUserInfo
    };
    updateAccount(inputInfo);
  };
  return(
    <div ref={popUpRef} className="absolute bg-gray-900 bg-opacity-80 flex justify-center items-center w-screen h-main">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-end p-6 rounded-md bg-gray-600">
        <div className="w-64" >
          <p className="text-xl mb-2">Passwordの変更:</p>
          <input type="password" {...register("password", { required: requiredErrorMessage, pattern: { value: passwordValidate, message: passwordErrorMessage }})}
            placeholder={"********"} className="w-full text-lg mr-4 mb-2 px-2 py-1 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black" />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          <p className="text-xl mt-4 mb-2">Passwordの確認:</p>
          <input type="password" {...register("password_confirmation", {required: requiredErrorMessage, validate: (value)=> value == watch('password') || passwordConfirmErrorMessage })}
            placeholder={"********"} className="w-full text-lg mr-4 mb-2 px-2 py-1 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black" />
          {errors.password_confirmation && <p className="text-red-600 text-sm">{errors.password_confirmation.message}</p>}
        </div>
        <input type="submit" value="変更" className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold" />
      </form>
    </div>
  );
};

export const IntroduceUpdateForm: React.FC<{introduce: string, updateAccount:(value: UpdateAccountArg)=> void, setFormShow: (value: boolean)=>void}> = ({introduce, updateAccount, setFormShow}) => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const popUpRef: any = useRef();
  const formRef: any = useRef();

  useEffect(() => {
    popUpRef.current.addEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOutsideClick = (event: any) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setFormShow(false);
    }
  };

  const onSubmit = (data: AccountInfo) => {
    const inputInfo: UpdateAccountArg = {
      inputInfo: data,
      setUserInfo: setUserInfo.setUserInfo
    };
    updateAccount(inputInfo);
  };

  return(
    <div ref={popUpRef} className="absolute bg-gray-900 bg-opacity-80 flex justify-center items-center w-screen h-main">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-end p-6 rounded-md bg-gray-600">
        <div className="" >
          <p className="text-xl mt-2 mb-3">自己紹介の変更:</p>
          <textarea {...register("introduce")} defaultValue={introduce} className="w-96 h-48 text-lg text-black p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md" />
        </div>
        <input type="submit" value="変更" className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold" />
      </form>
    </div>
  );
};