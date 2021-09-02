import React, { useState } from "react";
import axios from "axios";
import { AuthHeaders, AuthToken, getAuth, setAuth, deleteAuth, BasicAuthToken, getBasicAuth } from "./Auth";
import { SignInInfo } from "../render/SignIn"
import { SignUpInfo } from "../render/SignUp"

export type UserInfo = {
  id: number
  nickname: string
  icon_color: string
  isSignIn: boolean
  valid: boolean
  action: string
  errors: any
};

export const defaultUserInfo: UserInfo = {
  id: -1,
  nickname: "",
  icon_color: "",
  isSignIn: false,
  valid: false,
  action: "",
  errors: {}
};

type UserContext = ReturnType<typeof useUserContext>

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  
  const validateToken = async () => {
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/auth/validate_token`;
    try{  
      const response = await axios.get(url, {headers: currentAuth});
      const userData: UserInfo = {
        ...response.data.data,
        isSignIn: true,
        action: "validateToken",
        valid: true,
        errors: {},
      };
      setUserInfo(userData);
    }catch (errors) {
      const userData: UserInfo = {
        ...defaultUserInfo,
        action: "validateToken",
        errors: errors,
      };
      setUserInfo(userData)
      console.log(errors);
    };
  };
  
  const signIn = async (inputInfo: SignInInfo) => {
    const basicAuth: BasicAuthToken = getBasicAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/auth/sign_in`;
    try {
      const response = await axios.post(
        url,
        inputInfo,
        { headers: basicAuth}
      );
      const headerInfo = response.headers;
      const inputAuth: AuthToken = {
        'access-token': headerInfo["access-token"],
        client: headerInfo.client,
        uid: headerInfo.uid,
      };
      setAuth(inputAuth);
      
      const userData: UserInfo = {
        ...response.data.data,
        isSignIn: true,
        valid: true,
        action: "signIn",
        errors: {},
      };
      setUserInfo(userData);
    } catch (errors){
      const userData: UserInfo = {
        ...defaultUserInfo,
        action: "signIn",
        errors: errors,
      };
      setUserInfo(userData)
      console.log(errors);
    };
  };
  
  const signUp = async (inputInfo: SignUpInfo) => {
    const basicAuth: BasicAuthToken = getBasicAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/auth/`;
    try {
      const response = await axios.post(
        url,
        inputInfo,
        { headers: basicAuth}
      );
      const headerInfo = {...response.headers};
      const inputAuth: AuthToken = {
        'access-token': headerInfo["access-token"],
        client: headerInfo.client,
        uid: headerInfo.uid,
      };
      setAuth(inputAuth);

      const userData: UserInfo = {
        ...response.data.data,
        isSignIn: true,
        valid: true,
        action: "signUp",
        errors: {}
      };
      setUserInfo(userData);
    } catch (errors){
      const userData: UserInfo = {
        ...defaultUserInfo,
        action: "signUp",
        errors: errors
      };
      setUserInfo(userData);
    };
  };
  
  const signOut = async () => {
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/auth/sign_out`;
    try {
      const response = await axios.delete(url,{ headers: currentAuth});
      const userData: UserInfo = {
        ...defaultUserInfo,
        valid: true,
        action: "signOut",
        errors: {}
      };
      setUserInfo(userData);
      deleteAuth();
      alert('ログアウトしました');
    } catch (errors){
      const userData: UserInfo = {
        ...defaultUserInfo,
        action: "signOut",
        errors: errors,
      };
      alert('ログアウトできませんでした');
      console.log(userInfo.errors);
    };
  };
  
  return [userInfo, {setUserInfo, validateToken, signIn, signUp, signOut}] as const;
};

export const useUserContext = () => {
  const [userInfo, setUserInfo] = useUserInfo();
  return {userInfo, setUserInfo};
};

export const CurrentUser = React.createContext({} as UserContext);