import React, { useContext } from 'react';
import { CurrentUser, defaultUserInfo } from './Main';
import { Link } from 'react-router-dom'

const SignOutMenu: React.FC = () => {
  return(
      <div className="flex justify-between items-center text-center align-middle">
        <Link to="/SignUp" className="bg-gray-800 flex justify-center items-center m-2 h-12 w-24 rounded-md shadow-lg hover:shadow-bright">Sign up</Link>
        <Link to="/SignIn" className="bg-gray-800 flex justify-center items-center m-2 h-12 w-24 rounded-md shadow-lg hover:shadow-bright">Sign in</Link>
      </div>
  )
};

const SignInMenu: React.FC = () => {
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const handlerClick = () => {
    setUserInfo(defaultUserInfo);
    console.log(userInfo);
  }
  return(
      <div className="flex justify-between items-center text-center align-middle">
        <Link to="/SignUp" className="bg-gray-800 flex justify-center items-center m-2 h-12 w-24 rounded-md shadow-lg hover:shadow-bright">Logout</Link>
        <Link to="/SignIn" className="bg-gray-800 flex justify-center items-center m-2 h-12 w-24 rounded-md shadow-lg hover:shadow-bright">Logout</Link>
      </div>
  )
};

const Header: React.FC = () => {
  const logo_url = "./img/logo.png"
  const { userInfo, setUserInfo } = useContext(CurrentUser);
	return (
    <header className="flex justify-between items-center bg-gray-700 w-screen h-20 sticky top-0">
      <Link to="/">
        <img src={logo_url} alt="AstResonance" className="h-16 m-2"></img>
      </Link>
      { userInfo.isSignIn ? <SignInMenu /> : <SignOutMenu />}
    </header>
	);
}

export default Header