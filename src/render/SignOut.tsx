import React from "react"
import { useContext } from "react";
import { CurrentUser } from "../functions/UserInfo";

const SignOut: React.FC = () => {
  const {userInfo, setUserInfo} = useContext(CurrentUser);

  return(
      <button onClick={setUserInfo.signOut} className="w-full h-full text-center">サインアウト</button>
  );
};

export default SignOut