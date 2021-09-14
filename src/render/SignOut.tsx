import React from "react"
import { useContext } from "react";
import { CurrentUser } from "../functions/UserInfo";
import LoadingNow from "./LoadingNow";

const SignOut: React.FC = () => {
  const {loading, setUserInfo} = useContext(CurrentUser);

  return(
    <div>
      <button onClick={setUserInfo.signOut} className="w-full h-full text-center">サインアウト</button>
      { loading && <LoadingNow />}
    </div>
  );
};

export default SignOut