import React from "react";
import { FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MusicInfo } from "../functions/IndexMusic";

const MusicList: React.FC<{musicItems: MusicInfo[]}> = ({musicItems}) => {

  return(
    <ul className="overflow-auto p-4 h-96 mb-12">{
      musicItems.map((musicItem) =>
      <li key={musicItem.id} className="w-96 mb-4 p-2 rounded-md shadow-bright backdrop-filter backdrop-blur-lg hover:shadow-gold hover:bg-gray-600">
        <Link to={`/Musics/${musicItem.id}`} className="flex justify-between items-center">
          <div className ="pl-2 pr-6">
            <p className="text-sm">カテゴリー：<span className="text-base">{musicItem.genreName}の{musicItem.categoryName}</span></p>
          </div>
          <div className = "w-8 h-8 hover:h-12 rounded-full shadow-bright flex justify-center items-center">
            <FaGooglePlay size={20} />
          </div>
        </Link>
      </li>
    )}</ul>
  );
}; 

export default MusicList