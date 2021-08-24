import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { selectMusic, fetchMusic } from "../redux/reducers/music"
import Header from './Header';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import MusicShow from './MusicShow';
import PostMusic from './PostMusic';

export type UserInfo = {
  id: number
  nickname: string
  iconColor: string
  isSignIn: boolean
};

type StateUserInfo = {
  userInfo: UserInfo
  setUserInfo: (userInfo: UserInfo) => void;
};

export const defaultUserInfo: UserInfo = {
  id: 0,
  nickname: "",
  iconColor: "",
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
	return (
    <div className="inline-flex">
      <div className="flex flex-col w-screen h-screen text-yellow-300 font-serif z-50">
        <CurrentUser.Provider value = {ctx}>
          <Router>
            <Header />
            <Route exact path='/' component = {Home} />
            <Route path='/SignUp' component = {SignUp} />
            <Route path='/SignIn' component = {SignIn} />
            <Route path='/Musics/:id' component = {MusicShow} />
          </Router>
        </CurrentUser.Provider>
      </div>
      <div className = "absolute w-screen h-screen bg-gray-900"></div>
      <div className = "absolute w-96 h-96 shadow-gold rounded-full z-10"></div>
    </div>
	);
}

export default Main