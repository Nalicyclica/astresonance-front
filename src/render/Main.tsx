import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { selectMusic, fetchMusic } from "../redux/reducers/music"
import Header from './Header';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import MusicShow from './MusicShow';
import PostMusic from './PostMusic';
import AccountUpdate from './AccountUpdate';
import { authToken, getAuth } from '../functions/Auth';
import { useEffect } from 'react';

export type UserInfo = {
  id: number
  nickname: string
  icon_color: string
  isSignIn: boolean
};

type StateUserInfo = {
  userInfo: UserInfo
  setUserInfo: (userInfo: UserInfo) => void;
};

export const defaultUserInfo: UserInfo = {
  id: 0,
  nickname: "",
  icon_color: "",
  isSignIn: false
};

const defaultUser: StateUserInfo = {
  userInfo: defaultUserInfo,
  setUserInfo: () => {}
};

export const CurrentUser = React.createContext<StateUserInfo>(defaultUser)

const Main: React.FC = () => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const ctx = {
    userInfo,
    setUserInfo,
  };
  
  const fetchUserInfo = async () => {
    const currentAuth: authToken = getAuth();
    try{  
      const response = await axios.get('http://localhost:3000/auth/validate_token',{headers: currentAuth});
      const userData: UserInfo = {...response.data.data};
      userData.isSignIn = true;
      setUserInfo({...userData});
      console.log(userData);
    }catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  },[]);

	return (
    <div className="inline-flex">
      <div className="flex flex-col w-screen h-screen text-yellow-300 font-serif z-50">
        <CurrentUser.Provider value = {ctx}>
          <Router>
            <Header />
            <Route exact path='/' component = {Home} />
            <Route path='/SignUp' component = {SignUp} />
            <Route path='/SignIn' component = {SignIn} />
            <Route path='/AccountUpdate' component = {AccountUpdate} />
            <Route path='/Musics/:id' component = {MusicShow} />
            <Route path='/PostMusic' component = {PostMusic} />
          </Router>
        </CurrentUser.Provider>
      </div>
      <div className = "absolute w-screen h-screen bg-gray-900"></div>
      <div className = "absolute w-96 h-96 shadow-gold rounded-full z-10"></div>
    </div>
	);
}

export default Main