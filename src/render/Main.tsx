import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { selectMusic, fetchMusic } from "../redux/reducers/music"
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp'
import PostMusic from './PostMusic';


const Main: React.FC = () => {
	return (
		<div className="flex flex-col bg-gray-900 w-screen h-screen text-yellow-300 font-serif">
      <Router>
        <Header />
        <Route exact path='/' component = {Home} />
        <Route path='/SignUp' component = {SignUp} />
        <Route path='/SignIn' component = {SignIn} />
        <Route exact path='/' component = {Footer} />
      </Router>
		</div>
	);
}

export default Main