import React from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import { deleteAuth, getAuth } from "../functions/Auth";
import { useContext } from "react";
import { CurrentUser, UserInfo } from "./Main";

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
      const userData: UserInfo = {
        nickname: "",
        iconColor: "",
        isSignIn: false
      };
      setUserInfo(userData);
      history.push('/');
      alert('ログアウトしました');
    } catch (error){
      alert(error)
    };
  };

  return(
    <div className="flex justify-between items-center text-center align-middle">
      <p>ようこそ、{userInfo.nickname}さん</p>
      <button onClick={signOut} className="bg-gray-800 flex justify-center items-center m-2 h-12 w-24 rounded-md shadow-lg hover:shadow-bright">Sign out</button>
    </div>
  );
};

export default SignOut