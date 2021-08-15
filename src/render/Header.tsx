import React from 'react';

const Header: React.FC = () => {
  const logo_url = "./img/logo.png"
	return (
    <header className="flex justify-between items-center bg-gray-700 w-screen h-20">
      <img src={logo_url} alt="AstResonance" className="h-16 m-2"></img>
      <div className="flex justify-between items-center text-center align-middle">
        <div className="bg-gray-800 flex justify-center items-center m-2 h-12 w-24 rounded-md shadow-lg">Sign up</div>
        <div className="bg-gray-800 flex justify-center items-center m-2 h-12 w-24 rounded-md shadow-lg">Sign in</div>
      </div>
    </header>
	);
}

export default Header