import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router';
import { CurrentUser, UserInfo } from '../functions/UserInfo';
import { authToken, setAuth, getAuth } from '../functions/Auth';

type accountInfo = {
  nickname: string
  email: string
  password: string
  icon_color: string
  introduce: string
};

const defaultUpdateInfo: accountInfo = {
  nickname: "",
  email: "",
  password: "",
  icon_color: "",
  introduce: ""
};

const IconUpdateForm: React.FC<{icon_color: string, patchAccountUpdate:(input: accountInfo)=> void, setFormShow: (value: boolean) => void}> = props => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const popUpRef: any = useRef();
  const formRef: any = useRef();

  useEffect(() => {
    popUpRef.current.addEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOutsideClick = (event: any) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      props.setFormShow(false);
    }
  };

  const onSubmit = (data: accountInfo) => {
    props.patchAccountUpdate(data);
    props.setFormShow(false);
  };
  return(
    <div ref={popUpRef} className="flex justify-center items-center w-screen h-main absolute">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-end p-2 border-b border-yellow-300 bg-gray-600">
        <div className="" >
          <p className="m-2">アイコンカラーの変更:</p>
          <input type="color" {...register("icon_color")} defaultValue={props.icon_color} className="h-12 w-24 mx-4 mb-2 rounded-md" />
        </div>
        <input type="submit" value="変更" className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold" />
      </form>
    </div>
  );
};

const EmailUpdateForm: React.FC<{email: string, patchAccountUpdate:(input: accountInfo)=> void, setFormShow: (value: boolean) => void}> = props => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const popUpRef: any = useRef();
  const formRef: any = useRef();

  useEffect(() => {
    popUpRef.current.addEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOutsideClick = (event: any) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      props.setFormShow(false);
    }
  };

  const onSubmit = (data: accountInfo) => {
    props.patchAccountUpdate(data);
    props.setFormShow(false);
  };
  return(
    <div ref={popUpRef} className="flex justify-center items-center w-screen h-main absolute">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-end p-2 border-b border-yellow-300 bg-gray-600">
        <div className="" >
          <p className="m-2">E-mailの変更:</p>
          <input type="text" {...register("email")} defaultValue={props.email} className="text-lg mx-4 mb-2" />
        </div>
        <input type="submit" value="変更" className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold" />
      </form>
    </div>
  );
};

const PasswordUpdateForm: React.FC<{patchAccountUpdate:(input: accountInfo)=> void, setFormShow: (value: boolean) => void}> = props => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const popUpRef: any = useRef();
  const formRef: any = useRef();

  useEffect(() => {
    popUpRef.current.addEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOutsideClick = (event: any) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      props.setFormShow(false);
    }
  };

  const onSubmit = (data: accountInfo) => {
    props.patchAccountUpdate(data);
    props.setFormShow(false);
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

const IntroduceUpdateForm: React.FC<{introduce: string, patchAccountUpdate:(input: accountInfo)=> void, setFormShow: (value: boolean) => void}> = props => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const popUpRef: any = useRef();
  const formRef: any = useRef();

  useEffect(() => {
    popUpRef.current.addEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOutsideClick = (event: any) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      props.setFormShow(false);
    }
  };

  const onSubmit = (data: accountInfo) => {
    props.patchAccountUpdate(data);
    props.setFormShow(false);
  };
  return(
    <div ref={popUpRef} className="flex justify-center items-center w-screen h-main absolute">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-end p-2 border-b border-yellow-300 bg-gray-600">
        <div className="" >
          <p className="m-2">自己紹介の変更:</p>
          <textarea {...register("introduce")} defaultValue={props.introduce} className="w-96 h-48 text-lg mx-4 mb-2" />
        </div>
        <input type="submit" value="変更" className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold" />
      </form>
    </div>
  );
};

const AccountUpdate: React.FC = () => {
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const [responseErrors, setErrors] = useState<object>({});
  const [ prevInfo, setPrevInfo ] = useState<accountInfo>(defaultUpdateInfo);
  const [iconFormShow, setIconShow] = useState<boolean>(false);
  const [emailFormShow, setEmailShow] = useState<boolean>(false);
  const [passwordFormShow, setPasswordShow] = useState<boolean>(false);
  const [introduceFormShow, setIntroduceShow] = useState<boolean>(false);
  
  const fetchUserInfo = async () => {
    const currentAuth: authToken = getAuth();
    try{  
      const response = await axios.get('http://localhost:3000/auth/validate_token',{headers: currentAuth});
      const userData: accountInfo = {...response.data.data};
      setPrevInfo({...userData});
    }catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  },[]);

  const patchAccountUpdate = async (inputInfo: accountInfo) => {
    const currentAuth: authToken = getAuth();
    try {
      const response = await axios.patch(
        'http://localhost:3000/auth/',
        inputInfo,
        {headers: currentAuth}
        );
        const headerInfo = {...response.headers};
        const userData: UserInfo = {...response.data.data};
        const inputAuth: authToken = {
          'access-token': headerInfo["access-token"],
          client: headerInfo.client,
          uid: headerInfo.uid,
        };
        setAuth(inputAuth);
        userData.isSignIn = true;
        setUserInfo.setUserInfo({...userData});
        setPrevInfo({...prevInfo,...inputInfo});
        console.log(inputInfo);
        console.log(userData);
      } catch (errors){
        setErrors(errors);
      };
    };
    
    const onSubmit = (data: accountInfo) => {
      setErrors({});
      patchAccountUpdate(data);
      if(true){
        // history.push('/');
      }else{
        console.log(responseErrors);
      }
    };

    const popUpIconForm = () => {
      setIconShow(true);
    };

    const popUpEmailForm = () => {
      setEmailShow(true);
    };

    const popUpPasswordForm = () => {
      setPasswordShow(true);
    };

    const popUpIntroduceForm = () => {
      setIntroduceShow(true);
    };

    return (
      <div className="flex flex-col items-center flex-grow bg-gray-900">
        <h1 className="text-2xl mt-8 mb-6 px-4 text-yellow-300 border-b border-yellow-300">ユーザー情報の確認</h1>
        <div className="flex w-96 justify-between items-end p-2 border-b border-yellow-300">
          <div className="" >
            <p className="m-2">Nickname:</p>
            <p className="text-lg mx-4 mb-2">{prevInfo.nickname}</p>
          </div>
          <button  onClick={popUpIconForm} style={{backgroundColor: prevInfo.icon_color}} className="w-16 h-16 rounded-full shadow-bright hover:shadow-gold">
          </button>
        </div>
        {iconFormShow && <IconUpdateForm icon_color={prevInfo.icon_color} patchAccountUpdate={patchAccountUpdate} setFormShow={setIconShow} />}
        <div className="flex w-96 justify-between items-end p-2 border-b border-yellow-300">
          <div className="" >
            <p className="m-2">E-mail:</p>
            <p className="text-lg mx-4 mb-2">{prevInfo.email}</p>
          </div>
          <button  onClick={popUpEmailForm} className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold">
            変更
          </button>
        </div>
        {emailFormShow && <EmailUpdateForm email={prevInfo.email} patchAccountUpdate={patchAccountUpdate} setFormShow={setEmailShow} />}
        <div className="flex w-96 justify-between items-end p-2 border-b border-yellow-300">
          <div className="" >
            <p className="m-2">Password:</p>
            <p className="text-lg mx-4 mb-2">********</p>
          </div>
          <button  onClick={popUpPasswordForm} className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold">
            変更
          </button>
        </div>
        {passwordFormShow && <PasswordUpdateForm patchAccountUpdate={patchAccountUpdate} setFormShow={setPasswordShow} />}
        <div className="flex justify-between items-center p-2 border-b border-yellow-300">
          <div className="" >
            <p className="m-2">自己紹介:</p>
            <p className="w-96 text-lg mx-4 mb-2">{prevInfo.introduce}</p>
          </div>
          <button  onClick={popUpIntroduceForm} className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold">
            変更
          </button>
        </div>
        {introduceFormShow && <IntroduceUpdateForm introduce={prevInfo.introduce} patchAccountUpdate={patchAccountUpdate} setFormShow={setIntroduceShow} />}
      {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start items-center text-gray-100">
        <label className="my-2">
          <p>Email:</p>
          <input type="text" {...register("email")} defaultValue={prevInfo.email} className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
        <label className="my-2">
          <p>Password:</p>
          <input type="password" {...register("password")} placeholder="at least 6 letters" className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
        <label className="my-2">
          <p>Password confirmation:</p>
          <input type="password" {...register("password_confirmation")}  placeholder="verify password" className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
        <label className="my-2">
          <p>Icon color:</p>
          <input type="color" {...register("icon_color")} defaultValue={prevInfo.icon_color} placeholder="verify password" className="h-8 w-16 my-2 px-0.5 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md"/>
        </label>
        <label className="my-2">
          <p>Introduce:</p>
          <textarea {...register("introduce")} defaultValue={prevInfo.introduce} className="w-96 my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
        <input type="submit" value="変更" className="text-xl my-4 px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold"/>
      </form> */}
    </div>
	);
}

export default AccountUpdate