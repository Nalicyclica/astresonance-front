import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import MusicShow from './MusicShow';
import MusicCreate from './MusicCreate';
import AccountUpdate from './AccountUpdate';
import UserShow from './UserShow';
import { useEffect } from 'react';
import Background from './Background';
import { CurrentUser, useUserContext } from '../functions/UserInfo';


const Main: React.FC = () => {
  const {userInfo, setUserInfo} = useUserContext();
  
  useEffect(() => {
    setUserInfo.validateToken();
  },[]);

	return (
    <div className="inline-flex">
      <div className="flex flex-col text-yellow-400 font-sawarabi z-30">
        <CurrentUser.Provider value = {{userInfo, setUserInfo}}>
          <Router>
            <Header />
            <div className="w-screen h-main min-w-120 overflow-auto">
              <Switch>
                <Route exact path='/' component = {Home} />
                <Route path='/SignUp' component = {SignUp} />
                <Route path='/SignIn' component = {SignIn} />
                <Route path='/AccountUpdate' component = {AccountUpdate} />
                <Route path='/Musics/:id/Titles/:title_id' component = {MusicShow} />
                <Route path='/Musics/:id' component = {MusicShow} />
                <Route path='/MusicCreate' component = {MusicCreate} />
                <Route path='/UserShow/:id' component = {UserShow} />
              </Switch>
            </div>
          </Router>
        </CurrentUser.Provider>
      </div>
      <Background />
      <div id="confirmAction" className="absolute z-50"></div>
    </div>
	);
}

export default Main