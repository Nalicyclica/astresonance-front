import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectMusic, fetchMusic } from "../redux/reducers/music"

const Top: React.FC = () => {
  const music = useSelector(selectMusic);
  const dispatch = useDispatch();
	return (
		<div>
      <p>hello</p>
      <button onClick={()=>console.log(music)}>showthis</button>
      <button onClick={()=>dispatch(fetchMusic())}>clickthis</button>
		</div>
	);
}

export default Top