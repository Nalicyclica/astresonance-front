import React, { useContext, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form"
import { CurrentUser } from '../functions/UserInfo';
import { AccountInfo, UpdateAccountArg } from '../functions/UpdateAccount';

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
    <div ref={popUpRef} className="flex justify-center items-center w-screen h-main absolute">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-end p-2 border-b border-yellow-300 bg-gray-600">
        <div className="" >
          <p className="m-2">アイコンカラーの変更:</p>
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
    <div ref={popUpRef} className="flex justify-center items-center w-screen h-main absolute">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-end p-2 border-b border-yellow-300 bg-gray-600">
        <div className="" >
          <p className="m-2">E-mailの変更:</p>
          <input type="text" {...register("email")} defaultValue={email} className="text-lg mx-4 mb-2" />
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
    <div ref={popUpRef} className="flex justify-center items-center w-screen h-main absolute">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-end p-2 border-b border-yellow-300 bg-gray-600">
        <div className="" >
          <p className="m-2">Passwordの変更:</p>
          <input type="password" {...register("password")} placeholder={"********"} className="text-lg mx-4 mb-2" />
          <p className="m-2">Password変更の確認:</p>
          <input type="password" {...register("password_confirmation")} className="text-lg mx-4 mb-2" />
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
    <div ref={popUpRef} className="flex justify-center items-center w-screen h-main absolute">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-end p-2 border-b border-yellow-300 bg-gray-600">
        <div className="" >
          <p className="m-2">自己紹介の変更:</p>
          <textarea {...register("introduce")} defaultValue={introduce} className="w-96 h-48 text-lg mx-4 mb-2" />
        </div>
        <input type="submit" value="変更" className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold" />
      </form>
    </div>
  );
};