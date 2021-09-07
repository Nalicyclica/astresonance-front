import React, {useEffect } from 'react';
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
          <p className="w-full text-lg mb-3 text-center">無名の曲にあなただけのタイトルをつけましょう</p>
          { musicItems.errors.errors && <p className="text-red-600 text-center">音楽リストの読み込みに失敗しました</p>}
        </div>
        <p className="mb-2 pt-1 px-3 text-lg text-center text-shadow-black border-b backdrop-filter backdrop-blur-lg font-extrabold">-新着音楽の一覧-</p>
        <MusicList musicItems={musicItems.musicItems} />
      </div>
      <HomeFooter searchMusic={musicIndex} />
    </div>
	);
}

export default Home