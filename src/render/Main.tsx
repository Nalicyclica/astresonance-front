import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectMusic, fetchMusic } from "../redux/reducers/music"
import Header from './Header'
import Footer from './Footer';
import Home from './Home';


const Main: React.FC = () => {
  const music = useSelector(selectMusic);
  const dispatch = useDispatch();
  dispatch(fetchMusic());
  // const music_url = music[0].music_url;
	return (
		<div className="flex flex-col bg-gray-900 w-screen h-screen text-yellow-300 font-serif">
      <Header />
      <Home />
      <Footer />
		</div>
	);
}

export default Main