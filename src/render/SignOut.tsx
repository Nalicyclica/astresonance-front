import React, {useEffect} from "react"
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { CurrentUser } from "../functions/UserInfo";

const SignOut: React.FC = () => {
  const history = useHistory();
  const {userInfo, setUserInfo} = useContext(CurrentUser);

  return(
      <button onClick={setUserInfo.signOut} className="w-full h-full text-left">Sign out</button>
  );
};

export default SignOut