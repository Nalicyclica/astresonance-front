import React, { useState } from "react";
import axios from "axios";
import { AuthHeaders, AuthToken, getAuth, setAuth, deleteAuth, BasicAuthToken, getBasicAuth } from "./Auth";
import { SignInInfo } from "../render/SignIn"
import { SignUpInfo } from "../render/SignUp"
import { ResponseInfo, defaultResponse, successResponse, errorResponse, loadingResponse } from "./AxiosTypes";

export type CurrentUserInfo = {
  id: number
  nickname: string
  icon_color: string
  isSignIn: boolean
};

export type UserInfo = ResponseInfo & {
  userInfo: CurrentUserInfo
};

const defaultCurrentUser: CurrentUserInfo = {
  id: -1,
  nickname: "",
  icon_color: "",
  isSignIn: false,
};

export const defaultUserInfo: UserInfo = {
  ...defaultResponse,
  userInfo: {...defaultCurrentUser}
};

type UserContext = ReturnType<typeof useUserContext>

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  
  const validateToken = async () => {
    setUserInfo(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/auth/validate_token`;
    try{  
      const response = await axios.get(url, {headers: currentAuth});
      const userInfoData: CurrentUserInfo = {
        ...response.data.data,
        isSignIn: true
      };
      const userData: UserInfo = {
        ...successResponse("validateToken"),
        userInfo: userInfoData
      };
      setUserInfo(userData);
    }catch (errors) {
      const userData: UserInfo = {
        ...defaultUserInfo,
        ...errorResponse(errors,"validateToken")
      };
      setUserInfo(userData)
      console.log(errors);
    };
  };
  
  const signIn = async (inputInfo: SignInInfo) => {
    setUserInfo(prev => prev = {...prev, ...loadingResponse});
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
      
      const userInfoData: CurrentUserInfo = {
        ...response.data.data,
        isSignIn: true
      };
      const userData: UserInfo = {
        ...successResponse("signIn"),
        userInfo: userInfoData
      };
      setUserInfo(userData);
    } catch (errors){
      const userData: UserInfo = {
        ...defaultUserInfo,
        ...errorResponse(errors, "signIn")
      };
      setUserInfo(userData)
      console.log(errors);
    };
  };
  
  const signUp = async (inputInfo: SignUpInfo) => {
    setUserInfo(prev => prev = {...prev, ...loadingResponse});
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

      const userInfoData: CurrentUserInfo = {
        ...response.data.data,
        isSignIn: true
      };
      const userData: UserInfo = {
        ...successResponse("signUp"),
        userInfo: userInfoData
      };
      setUserInfo(userData);
    } catch (errors){
      const userData: UserInfo = {
        ...defaultUserInfo,
        ...errorResponse(errors, "signUp")
      };
      setUserInfo(userData);
    };
  };
  
  const signOut = async () => {
    setUserInfo(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/auth/sign_out`;
    try {
      const response = await axios.delete(url,{ headers: currentAuth});
      const userData: UserInfo = {
        ...successResponse("signOut"),
        userInfo: {...defaultCurrentUser}
      };
      setUserInfo(userData);
      deleteAuth();
      alert('ログアウトしました');
    } catch (errors){
      setUserInfo(prev => prev = {...prev, ...errorResponse(errors, "signOut")});
      alert('ログアウトできませんでした');
    };
  };
  
  return [userInfo, {setUserInfo, validateToken, signIn, signUp, signOut}] as const;
};

export const useUserContext = () => {
  const [{userInfo, loading, result}, setUserInfo] = useUserInfo();
  return {userInfo, loading, result, setUserInfo};
};

export const CurrentUser = React.createContext({} as UserContext);