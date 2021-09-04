import React, {useState, useEffect, useCallback } from 'react';
import {FaGooglePlay} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useMusicIndex } from '../functions/IndexMusic';
import HomeFooter from './HomeFooter';
import MusicList from './MusicList';

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

  useEffect(()=>{
    const idParams: selectIds = defaultSelectIds;
    musicIndex(idParams);
  },[]);
  
	return (
    <div>
      <div className= "flex flex-col justify-start items-center h-home text-gray-100">
        <div className="w-120 mx-8 my-6 px-5 py-3 rounded-md shadow-bright backdrop-filter backdrop-blur-lg">
          <p className="text-lg mb-3">無名の曲にあなただけのタイトルをつけましょう</p>
          { musicItems.errors.errors && <p className="text-red-600 text-center">音楽リストの読み込みに失敗しました</p>}
        </div>
        <p className="w-full pb-2 text-lg text-center text-shadow-black">-新着音楽の一覧-</p>
        <MusicList musicItems={musicItems.musicItems} />
      </div>
      <HomeFooter searchMusic={musicIndex} />
    </div>
	);
}

export default Home