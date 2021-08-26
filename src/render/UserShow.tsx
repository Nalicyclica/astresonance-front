import React, { useContext, useState, useEffect, useRef, ChangeEventHandler } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router';
import { CurrentUser, UserInfo } from './Main';
import { authToken, setAuth, getAuth } from '../functions/Auth';
import {AppBar, Tabs, Toolbar, Tab } from '@material-ui/core'

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
  const [selectTab, setSelectTab] = useState<number>(0);
  
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
    
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectTab(newValue);
  };
    return (
      <div className="flex flex-col items-center flex-grow bg-gray-900">
        <h1 className="text-2xl mt-8 mb-6 px-4 text-yellow-300 border-b border-yellow-300">ユーザー情報の確認</h1>
        <div className="flex w-96 justify-start items-end p-2 border-b border-yellow-300">
          <div style={{backgroundColor: prevInfo.icon_color}} className="w-16 h-16 rounded-full shadow-bright">
          </div>
          <p className="text-xl mx-4 mb-2">{prevInfo.nickname}</p>
        </div>
        <div className="flex justify-between items-center p-2 mb-16 border-b border-yellow-300">
          <div className="" >
            <p className="m-2">自己紹介:</p>
            <p className="w-96 text-lg mx-4 mb-2">{prevInfo.introduce}</p>
          </div>
        </div>
        <div>
          <AppBar position="static" className="h-96 bg-gray-400">
            <Toolbar  className="h-32 bg-gray-600">
              <Tabs value={selectTab} variant = "scrollable" onChange={handleChange} className="w-full bg-gray-800">
                <Tab label="投稿した音楽" />
                <Tab label="投稿したタイトル" />
                <Tab label="投稿したコメント" />
              </Tabs>
            </Toolbar>
          { selectTab == 0 && <div className="bg-gray-100 w-screen h-96"></div>}
          { selectTab == 1 && <div className="bg-gray-300 w-screen h-96"></div>}
          { selectTab == 2 && <div className="bg-gray-500 w-screen h-96"></div>}
          </AppBar>
        </div>
    </div>
	);
}

export default UserShow