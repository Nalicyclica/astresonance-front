import { useState } from "react";
import axios from "axios";
import { AuthHeaders, AuthToken, getAuth, setAuth } from "./Auth";
import { CurrentUserInfo, UserInfo } from "./UserInfo";
import { defaultResponse, errorResponse, loadingResponse, ResponseInfo, successResponse } from "./AxiosTypes";

export type UpdateAccountArg = {
  inputInfo: AccountInfo
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
};

export type AccountInfo = {
  id: number
  nickname: string
  email: string
  password: string
  icon_color: string
  introduce: string
};

type AccountItemInfo = ResponseInfo & {
  accountItem: AccountInfo
};

const defaultAccountInfo: AccountInfo = {
  id: -1,
  nickname: "",
  email: "",
  password: "",
  icon_color: "",
  introduce: "",
};

export const defaultAccountItem: AccountItemInfo = {
  ...defaultResponse,
  accountItem: {...defaultAccountInfo}
};

export const useAccountUpdate = () => {
  const [accountItem, setAccountItem] = useState<AccountItemInfo>(defaultAccountItem);

  const getAccount = async () => {
    setAccountItem(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/auth/validate_token`
    try{  
      const response = await axios.get(url,{headers: currentAuth});
      const accountData: AccountItemInfo = {
        ...successResponse("get"),
        accountItem: {...response.data.data}
      };
      setAccountItem(accountData);
    }catch (errors) {
      const accountData: AccountItemInfo = {
        ...defaultAccountItem,
        ...errorResponse(errors, "get")  
      };
      setAccountItem(accountData);
    }
  };
  
  const updateAccount = async ({inputInfo, setUserInfo} :UpdateAccountArg) => {
    setAccountItem(prev => prev = {...prev, ...loadingResponse});
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/auth/`
    const currentAuth: AuthHeaders = getAuth();
    try {
      const response = await axios.patch(
        url,
        inputInfo,
            {headers: currentAuth}
          );
        const headerInfo = {...response.headers};
        const inputAuth: AuthToken = {
          'access-token': headerInfo["access-token"],
          client: headerInfo.client,
          uid: headerInfo.uid,
        };
        setAuth(inputAuth);

        const userData: CurrentUserInfo = {
          ...response.data.data,
          isSignIn: true
        };
        setUserInfo(prev => prev = {...prev, userInfo: userData});
        
        const accountData: AccountItemInfo = {
          ...successResponse("update"),
          accountItem: {...response.data.data},
        };
        setAccountItem(accountData);
      } catch (errors){
        setAccountItem(prev => prev = {...prev, ...errorResponse(errors, "update")});
      };
    };
    return [accountItem, {getAccount, updateAccount}] as const;
};