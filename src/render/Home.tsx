import React, {useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {FaGooglePlay} from 'react-icons/fa'

export type selectIds = {
  genre_id: number
  category_id: number
};

type idList = {
  id: number
  name: string
};

export const genreList: idList[] = [
  { id: 0, name: "その他の音楽"},
  { id: 1, name: "ポップス"},
  { id: 2, name: "ロック"},
  { id: 3, name: "ジャズ"},
  { id: 4, name: "クラシック"},
  { id: 5, name: "アフリカン"},
  { id: 6, name: "アジア"},
  { id: 7, name: "ヨーロッパ"},
  { id: 8, name: "ラテンアメリカ"},
  { id: 9, name: "アラビアン"},
];

export const categoryList: idList[] = [
  { id: 0, name: "曲/歌以外の音楽"},
  { id: 1, name: "曲"},
  { id: 2, name: "歌"},
];

type musicInfo = {
  id: number
  genre_id: number
  genreName: string
  category_id: number
  categoryName: string 
  music_url: string
  user_id: number
}

const getGenreName = (genreId: number): string => {
  let thisGenreName: string = "";
  genreList.map((genre) =>{
    if(genre.id == genreId){
      thisGenreName = genre.name;
      return;
    }
  });
  return thisGenreName;
};

const getCategoryName = (categoryId: number): string => {
  let thisCategoryName: string = "";
  categoryList.map((category) =>{
    if(category.id == categoryId){
      thisCategoryName = category.name;
      return;
    }
  })
  return thisCategoryName;
};

const Home: React.FC = () => {
  const [ musicItems, setMusic ] = useState<musicInfo[]>([]);
  
  const musicList = musicItems.map((musicItem) =>
  <li key={musicItem.id} className="flex justify-between bg-gray-800 p-2 mb-1 h-12 w-72 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 text-gray-100">
    <div>
      <div className ="w-56 pr-6 text-sm">
        <p>カテゴリー：{musicItem.genreName}の{musicItem.categoryName}</p>
      </div>
    </div>
    <div className = "w-8 h-8 rounded-full shadow-bright flex justify-center items-center">
      <FaGooglePlay size={20} />
    </div>
  </li>
  );
  
  const fetchMusic = async () => {
    try{
      const response = await axios.get("http://localhost:3000/musics");
      const musicData: musicInfo[] = [];
      response.data.map((data: musicInfo) => {
        data.genreName = getGenreName(data.genre_id);
        data.categoryName = getCategoryName(data.category_id);
        musicData.push(data);
      })
      setMusic(musicData);
    } catch(errors){
      
    };
  };

  useEffect(()=>{
    fetchMusic();
  },[]);
  
	return (
    <div className="flex flex-col justify-start items-center w-screen">
      <div className="w-96 max-w-full h-16 mx-8 my-6">
        <div className="w-full min-h-full rounded-md text-gray-100 px-3 py-1 shadow-bright">
          <div className="">無名の曲にタイトルをつけましょう</div>
        </div>
      </div>
      <ul className="overflow-auto p-4 h-96">
        { musicList }
      </ul>
      {/* <div className="shadow-bright hover:shadow-gold w-96 h-96 rounded-full align-middle flex justify-center items-center" onClick={handlerClick}>
        <FaGooglePlay size={100} color={'#ccc'} />
      </div> */}
    </div>
	);
}

export default Home