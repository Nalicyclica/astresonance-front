import React from 'react';
import {AiOutlineReload} from 'react-icons/ai'
import {TiWaves} from 'react-icons/ti'
import {BsMusicNoteList} from 'react-icons/bs'

type idList = {
  id: number
  name: string
};

const genreList: idList[] = [
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

const categoryList: idList[] = [
  { id: 0, name: "その他"},
  { id: 1, name: "曲"},
  { id: 2, name: "歌"},
];

const genreItems = genreList.map((genre) =>
  <option value={genre.id}>{genre.name}</option>
);

const categoryItems = categoryList.map((category) =>
  <option value={category.id}>{category.name}</option>
);

const HomeFooter: React.FC = () => {
	return (
    <footer className="flex justify-between items-center bg-gray-700 h-20 w-screen align-middle">
      <div className="flex flex-col bg-gray-800 m-2 h-12 w-auto px-4 rounded-md shadow-lg hover:shadow-bright">
        <div>
        <BsMusicNoteList size={20} color={'#ccc'} className="inline mr-1.5"/>
        <span>Genre</span>
        </div>
        <select className="bg-gray-800 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
          <option hidden>選択してください</option>
          {genreItems}
        </select>
      </div>
      <div className="flex flex-col bg-gray-800 m-2 h-12 w-auto px-4 rounded-md shadow-lg hover:shadow-bright">
        <div>
        <TiWaves size={20} color={'#ccc'} className="inline mr-1.5"/>
        <span>Song/Melodies</span>
        </div>
        <select className="bg-gray-800 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
          <option hidden>選択してください</option>
          {categoryItems}
        </select>
      </div>
      <button className="bg-gray-800 m-2 h-12 w-auto px-4 rounded-md shadow-lg hover:shadow-bright">
        <AiOutlineReload size={20} color={'#ca8'} className="inline mr-1.5"/>
      </button>
    </footer>
	);
}

export default HomeFooter