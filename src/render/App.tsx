import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectMusic, loadMusic } from "../redux/reducers/music"

const App: React.FC = () => {
  // const music = useSelector(selectMusic);
  // const dispatch = useDispatch();
  // const change: typeof music = {
  //   category_id: 3,
  //   genre_id: 4,
  //   playing: true
  // }
	return (
		<div>
      {/* <div>{ music.category_id }</div>
      <div>{ music.genre_id }</div>
      <div>{ music.playing }</div>
      <button type="button" onClick={()=> dispatch(loadMusic(change))}>change</button> */}
		</div>
	);
}

export default App