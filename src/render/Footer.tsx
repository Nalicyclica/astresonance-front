import React from 'react';
import {FaGooglePlay} from 'react-icons/fa'
import {BiSort} from 'react-icons/bi'
import {BsMusicNoteList} from 'react-icons/bs'
import {TiWaves} from 'react-icons/ti'

const Footer: React.FC = () => {
	return (
    <footer className="flex justify-between items-center bg-gray-700 h-20 w-screen align-middle">
      <button className="bg-gray-800 m-2 h-12 w-auto px-4 rounded-md shadow-lg">
        <BsMusicNoteList size={20} color={'#ccc'} className="inline mr-1.5"/>
        <span>Genre</span>
      </button>
      <button className="bg-gray-800 m-2 h-12 w-auto px-4 rounded-md shadow-lg">
        <TiWaves size={20} color={'#ccc'} className="inline mr-1.5"/>
        <span>Song/Melodies</span>
      </button>
      <button className="bg-gray-800 m-2 h-12 w-auto px-4 rounded-md shadow-lg">
        <BiSort size={20} color={'#ccc'} className="inline mr-1.5"/>
        <span>Sort by</span>
      </button>
    </footer>
	);
}

export default Footer