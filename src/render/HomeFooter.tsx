import React from 'react';
import { useForm } from 'react-hook-form';
import {TiWaves} from 'react-icons/ti'
import {BsMusicNoteList} from 'react-icons/bs'
import { categoryList, genreList, selectIds } from './Home'

const genreItems = genreList.map((genre) =>
  <option value={genre.id}>{genre.name}</option>
);

const categoryItems = categoryList.map((category) =>
  <option value={category.id}>{category.name}</option>
);

const HomeFooter: React.FC = () => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const onSubmit = (data: selectIds) => {
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
            <option hidden>選択してください</option>
            {genreItems}
          </select>
        </label>
        <label className="flex flex-col bg-gray-800 m-2 h-12 w-auto px-4 rounded-md shadow-lg hover:shadow-bright">
          <div>
          <TiWaves size={20} color={'#ccc'} className="inline mr-1.5"/>
          <span>曲/歌</span>
          </div>
          <select {...register("category_id")} className="bg-gray-800 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
            <option hidden>選択してください</option>
            {categoryItems}
          </select>
        </label>
        <input type="submit" value="リロード" className="bg-gray-800 m-2 h-12 w-auto px-4 rounded-md shadow-lg hover:shadow-bright" />
      </form>
    </footer>
	);
}

export default HomeFooter