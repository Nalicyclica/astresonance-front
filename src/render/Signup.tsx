import React from 'react';

const SignUp: React.FC = () => {
	return (
    <div className="flex-grow bg-gray-900">
      <form onSubmit={hoge => hoge} className="flex flex-col justify-start items-center">
        <h1 className="text-2xl mt-8 mb-6">Please enter your information</h1>
        <label className="my-2">
          <p>Nickname:</p>
          <input type="text" value="" placeholder="ex.) ARGuy" onChange={hoge => hoge} className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
        <label className="my-2">
          <p>Email:</p>
          <input type="text" value="" placeholder="Enter your email" onChange={hoge => hoge} className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
        <label className="my-2">
          <p>Password:</p>
          <input type="password" value="" placeholder="at least 6 letters" onChange={hoge => hoge} className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
        <label className="my-2">
          <p>Password confirmation:</p>
          <input type="password" value="" placeholder="verify password" onChange={hoge => hoge} className="my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
        </label>
        <label className="my-2">
          <p>Icon color:</p>
          <input type="color" placeholder="verify password" onChange={hoge => hoge} className="h-8 w-16 my-2 px-0.5 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md"/>
        </label>
        <input type="submit" value="Sign up" className="text-xl my-4 px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold"/>
      </form>
    </div>
	);
}

export default SignUp