import React, {useState, useEffect, useCallback } from 'react';
import {FaGooglePlay} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useMusicIndex } from '../functions/IndexMusic';
import HomeFooter from './HomeFooter';

export type selectIds = {
  genre_id: number
  category_id: number
};

const defaultSelectIds: selectIds = {
  genre_id: -1,
  category_id: -1
};

const Home: React.FC = () => {
  const [ musicItems, musicIndex ] = useMusicIndex();
  
  const musicList = musicItems.musicItems.map((musicItem) =>
  <li key={musicItem.id} className="backdrop-filter backdrop-blur-lg p-2 mb-4 h-12 w-96 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 text-gray-100">
    <Link to={`/Musics/${musicItem.id}`} className="flex justify-between">
      <div className ="w-56 pr-6 text-sm">
        <p>カテゴリー：{musicItem.genreName}の{musicItem.categoryName}</p>
      </div>
      <div className = "w-8 h-8 rounded-full shadow-bright flex justify-center items-center">
        <FaGooglePlay size={20} />
      </div>
    </Link>
  </li>
  );

  useEffect(()=>{
    const idParams: selectIds = defaultSelectIds;
    musicIndex(idParams);
  },[]);
  
	return (
    <div>
      <div className= "flex flex-col justify-start items-center w-screen h-home">
        <div className="w-96 h-16 mx-8 my-6 rounded-md text-gray-100 px-3 py-1 shadow-bright">
          <div className="">無名の曲にあなただけのタイトルをつけましょう</div>
          { musicItems.errors.errors && <p className="text-red-600">音楽リストの読み込みに失敗しました</p>}
        </div>
        <ul className="overflow-auto p-4 h-96 m-12">
          { musicList }
        </ul>
      </div>
      <HomeFooter searchMusic={musicIndex} />
    </div>
	);
}

export default Home