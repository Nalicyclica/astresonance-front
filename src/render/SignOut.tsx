import React from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import { deleteAuth, getAuth } from "../functions/Auth";
import { useContext } from "react";
import { CurrentUser, UserInfo, defaultUserInfo } from "./Main";

const SignOut: React.FC = () => {
  const history = useHistory();
  const {userInfo, setUserInfo} = useContext(CurrentUser);

  const signOut = async () => {
    const currentAuth = getAuth();
    try {
      const response = await axios.delete(
        'http://localhost:3000/auth/sign_out',
        { headers: currentAuth}
      );
      deleteAuth();
      setUserInfo({...defaultUserInfo});
      history.push('/');
      alert('ログアウトしました');
    } catch (error){
      alert(error)
    };
  };

  return(
      <button onClick={signOut} className="w-full h-full text-left">Sign out</button>
  );
};

export default SignOut