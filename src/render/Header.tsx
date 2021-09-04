import React, { useContext } from 'react';
import { CurrentUser, UserInfo } from '../functions/UserInfo';
import { Link } from 'react-router-dom'
import SignOut from './SignOut';
import UserMenuDrop from './UserMenuDrop'

const SignOutMenu: React.FC = () => {
  return(
      <div className="flex justify-between items-center text-center align-middle">
        <Link to="/SignUp" className="bg-gray-800 flex justify-center items-center m-2 h-12 w-24 rounded-md shadow-lg hover:shadow-bright">新規登録</Link>
        <Link to="/SignIn" className="bg-gray-800 flex justify-center items-center m-2 h-12 w-24 rounded-md shadow-lg hover:shadow-bright">ログイン</Link>
      </div>
  )
};

const SignInMenu: React.FC<{userInfo: UserInfo}> = props => {
  return(
    <div className="flex justify-between items-center text-center align-middle">
        <p className="mr-4 ">ようこそ、{props.userInfo.nickname}さん</p>
        <UserMenuDrop />
    </div>
  )
};

const Header: React.FC = () => {
  const logo_url = "./img/logo.png"
  const { userInfo, setUserInfo } = useContext(CurrentUser);
	return (
    <header className="h-20 sticky top-0 flex justify-between items-center backdrop-filter backdrop-blur-lg backdrop-contrast-75 shadow-header">
      <Link to="/">
        <img src={logo_url} alt="AstResonance" className="h-16 m-2"></img>
      </Link>
      { userInfo.isSignIn ? <SignInMenu userInfo={userInfo}/> : <SignOutMenu />}
    </header>
	);
}

export default Header