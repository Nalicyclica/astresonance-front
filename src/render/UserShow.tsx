import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router';
import { CurrentUser, UserInfo } from './Main';
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

const UserShow: React.FC = () => {
  const history = useHistory();
  const [responseErrors, setErrors] = useState<object>({});
  const [ prevInfo, setPrevInfo ] = useState<accountInfo>(defaultUpdateInfo);
  
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
    
    return (
      <div className="flex flex-col items-center flex-grow bg-gray-900">
        <h1 className="text-2xl mt-8 mb-6 px-4 text-yellow-300 border-b border-yellow-300">ユーザー情報の確認</h1>
        <div className="flex w-96 justify-start items-end p-2 border-b border-yellow-300">
          <div style={{backgroundColor: prevInfo.icon_color}} className="w-16 h-16 rounded-full shadow-bright hover:shadow-gold">
          </div>
          <p className="text-xl mx-4 mb-2">{prevInfo.nickname}</p>
        </div>
        <div className="flex justify-between items-center p-2 border-b border-yellow-300">
          <div className="" >
            <p className="m-2">自己紹介:</p>
            <p className="w-96 text-lg mx-4 mb-2">{prevInfo.introduce}</p>
          </div>
        </div>
    </div>
	);
}

export default UserShow