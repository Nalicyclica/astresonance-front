import React from 'react';
import axios from 'axios';
import {FaGooglePlay} from 'react-icons/fa'

const Home: React.FC = () => {
  const handlerClick = () => {
    axios.get("http://localhost:3000/musics")
    .then(response => console.log(response))
  };
	return (
    <div className="flex-grow flex flex-col justify-start items-center w-screen">
      <div className="w-96 max-w-full h-16 mx-8 my-6">
        <div className="w-full min-h-full rounded-md text-gray-100 px-3 py-1 shadow-bright">
          <div className="">無名の曲をどうぞ</div>
          <div className="">Category: World Music</div>
        </div>
      </div>
      {/* <div className="shadow-bright hover:shadow-gold w-96 h-96 rounded-full align-middle flex justify-center items-center" onClick={handlerClick}>
        <FaGooglePlay size={100} color={'#ccc'} />
      </div> */}
    </div>
	);
}

export default Home