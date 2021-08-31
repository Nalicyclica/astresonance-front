import { useState } from "react";
import axios from "axios";
import { authToken, getAuth, setAuth } from "./Auth";
import { UserInfo } from "./UserInfo";

export type UpdateAccountArg = {
  inputInfo: AccountInfo
  setUserInfo: (value: UserInfo) => void
};

export type AccountInfo = {
  nickname: string
  email: string
  password: string
  icon_color: string
  introduce: string
};

type AccountItemInfo = AccountInfo & {
  response: {
    valid: boolean
    errors: any
  }
};

const defaultAccountInfo: AccountItemInfo = {
  nickname: "",
  email: "",
  password: "",
  icon_color: "",
  introduce: "",
  response:{
    valid: false,
    errors: {}
  }
};

export const useAccountUpdate = () => {
  const [accountItem, setAccountItem] = useState<AccountItemInfo>(defaultAccountInfo);

  const getAccount = async () => {
    const currentAuth: authToken = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/auth/validate_token`
    try{  
      const response = await axios.get(url,{headers: currentAuth});
      const accountData: AccountItemInfo = {
        ...response.data.data,
        response:{
          valid: true,
          errors: {}
        }};
        setAccountItem(accountData);
      }catch (errors) {
        const accountData: AccountItemInfo = {
          ...defaultAccountInfo,
          response:{
            valid: false,
            errors: {errors}
          }};
          setAccountItem(accountData);
        }
      };
      
      const updateAccount = async ({inputInfo, setUserInfo} :UpdateAccountArg) => {
        const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/auth/`
        const currentAuth: authToken = getAuth();
        try {
          const response = await axios.patch(
            url,
            inputInfo,
            {headers: currentAuth}
          );
        const headerInfo = {...response.headers};
        const inputAuth: authToken = {
          'access-token': headerInfo["access-token"],
          client: headerInfo.client,
          uid: headerInfo.uid,
        };
        setAuth(inputAuth);

        const userData: UserInfo = {
          ...response.data.data,
          isSignIn: true
        }
        setUserInfo(userData);
        
        const accountData: AccountItemInfo = {
          ...response.data.data,
          response: {
            valid: true,
            errors: {}
          }
        };
        setAccountItem(accountData);
      } catch (errors){
        const errorResponse = {
          valid: false,
          errors: {errors}
        };
        setAccountItem(prev => prev = {...prev, response: errorResponse});
      };
    };
    return [accountItem, {getAccount, updateAccount}] as const;
};