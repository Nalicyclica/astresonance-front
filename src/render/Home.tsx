import React, {useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {TiWaves} from 'react-icons/ti'
import {BsMusicNoteList} from 'react-icons/bs'
import {FaGooglePlay} from 'react-icons/fa'
import { Link } from 'react-router-dom';

export type selectIds = {
  genre_id: number
  category_id: number
};

type idList = {
  id: number
  name: string
};

type Props = {
  fetchMusic: (idParams: selectIds) => void;
}

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

export type musicInfo = {
  id: number
  genre_id: number
  genreName: string
  category_id: number
  categoryName: string 
  music_url: string
  user_id: number
}

export const getGenreName = (genreId: number): string => {
  let thisGenreName: string = "";
  genreList.map((genre) =>{
    if(genre.id == genreId){
      thisGenreName = genre.name;
      return;
    }
  });
  return thisGenreName;
};

export const getCategoryName = (categoryId: number): string => {
  let thisCategoryName: string = "";
  categoryList.map((category) =>{
    if(category.id == categoryId){
      thisCategoryName = category.name;
      return;
    }
  })
  return thisCategoryName;
};

export const genreItems = genreList.map((genre) =>
  <option value={genre.id}>{genre.name}</option>
);

export const categoryItems = categoryList.map((category) =>
  <option value={category.id}>{category.name}</option>
);

const HomeFooter: React.FC<Props> = ({fetchMusic}) => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const onSubmit = (data: selectIds) => {
    fetchMusic(data);
  };
	return (
    <footer className="sticky bottom-0 bg-gray-700 h-20 w-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-center  align-middle">
        <label className="flex flex-col bg-gray-800 m-2 h-12 w-auto px-4 rounded-md shadow-lg hover:shadow-bright">
          <div>
          <BsMusicNoteList size={20} color={'#ccc'} className="inline mr-1.5"/>
          <span>ジャンル</span>
          </div>
          <select {...register("genre_id")} className="bg-gray-800 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
            <option value="-1">すべての音楽</option>
            {genreItems}
          </select>
        </label>
        <label className="flex flex-col bg-gray-800 m-2 h-12 w-auto px-4 rounded-md shadow-lg hover:shadow-bright">
          <div>
          <TiWaves size={20} color={'#ccc'} className="inline mr-1.5"/>
          <span>曲/歌</span>
          </div>
          <select {...register("category_id")} className="bg-gray-800 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
            <option value="-1">すべての音楽</option>
            {categoryItems}
          </select>
        </label>
        <input type="submit" value="リロード" className="bg-gray-800 m-2 h-12 w-auto px-4 rounded-md shadow-lg hover:shadow-bright" />
      </form>
    </footer>
	);
}

const Home: React.FC = () => {
  const [ musicItems, setMusic ] = useState<musicInfo[]>([]);
  
  const musicList = musicItems.map((musicItem) =>
  <li key={musicItem.id} className="bg-gray-800 p-2 mb-1 h-12 w-72 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 text-gray-100">
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
  
  const fetchMusic = async (idParams: selectIds) => {
    let params: any = {...idParams};
    if(params.genre_id<0){
      delete params.genre_id;
    }
    if(params.category_id<0){
      delete params.category_id;
    }
    try{
      const response = await axios.get("http://localhost:3000/musics",{params: params});
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
    const idParams = { genre_id: -1, category_id: -1};
    fetchMusic(idParams);
  },[]);
  
	return (
    <div>
      <div className= "flex flex-col justify-start items-center w-screen h-home">
        <div className="w-96 h-16 mx-8 my-6 rounded-md text-gray-100 px-3 py-1 shadow-bright">
          <div className="">無名の曲にあなただけのタイトルをつけましょう</div>
        </div>
        <ul className="overflow-auto p-4 h-96 m-12">
          { musicList }
        </ul>
        {/* <div className="shadow-bright hover:shadow-gold w-96 h-96 rounded-full align-middle flex justify-center items-center" onClick={handlerClick}>
          <FaGooglePlay size={100} color={'#ccc'} />
        </div> */}
      </div>
      <HomeFooter fetchMusic={fetchMusic} />
    </div>
	);
}

export default Home