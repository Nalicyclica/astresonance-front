import React from "react";
import { useForm } from "react-hook-form";
import { BsMusicNoteList } from "react-icons/bs";
import { TiWaves } from "react-icons/ti";
import { selectIds } from "./Home";
import { genreItems, categoryItems } from "../functions/MusicGenre"

const HomeFooter: React.FC<{searchMusic: (value: selectIds)=>void}> = ({searchMusic}) => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();

  const onSubmit = (data: selectIds) => {
    searchMusic(data);
  };
  
	return (
    <footer className="sticky bottom-0 h-20 px-4 py-3 backdrop-filter backdrop-blur-lg backdrop-contrast-75 shadow-header">
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-center align-middle">
        <label className="flex flex-col bg-gray-800 px-4 py-2 rounded-md shadow-lg hover:shadow-bright">
          <div>
          <BsMusicNoteList size={20} color={'#ccc'} className="inline mr-1.5"/>
          <span>ジャンル</span>
          </div>
          <select {...register("genre_id")} className="bg-gray-800 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
            <option value="-1">すべての音楽</option>
            {genreItems}
          </select>
        </label>
        <label className="flex flex-col bg-gray-800 px-4 py-2 rounded-md shadow-lg hover:shadow-bright">
          <div>
          <TiWaves size={20} color={'#ccc'} className="inline mr-1.5"/>
          <span>曲/歌</span>
          </div>
          <select {...register("category_id")} className="bg-gray-800 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
            <option value="-1">すべての音楽</option>
            {categoryItems}
          </select>
        </label>
        <input type="submit" value="リロード" className="bg-gray-800 h-12 w-auto px-4 py-2 rounded-md shadow-lg hover:shadow-bright" />
      </form>
    </footer>
	);
};

export default HomeFooter