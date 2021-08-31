import React from 'react';
import {FaGooglePlay} from 'react-icons/fa'
import { Link} from 'react-router-dom';
import { PostedTitleInfo, TitleCommentInfo, TitledMusicInfo } from "../functions/ShowUser"

export const UserMusicList: React.FC<{musicItems: TitledMusicInfo[]}> = ({musicItems})=> {
  return(
    <div  className="flex flex-col items-center bg-gray-300 w-screen h-96 overflow-auto">
      { musicItems.map((musicItem) =>
        <li key={musicItem.id} className="list-none bg-gray-800 p-2 mb-1 h-12 w-96 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 text-gray-100">
          <Link to={`/Musics/${musicItem.id}`} className="flex justify-between">
            <div className ="w-56 pr-6 text-sm">
              <p style={{color: musicItem.color}}>タイトル：{musicItem.title}</p>
              <p>カテゴリー：{musicItem.genreName}の{musicItem.categoryName}</p>
            </div>
            <div className = "w-8 h-8 rounded-full shadow-bright flex justify-center items-center">
              <FaGooglePlay size={20} />
            </div>
          </Link>
        </li>
      )}
    </div>
  );
};

export const UserTitleList: React.FC<{titleItems: PostedTitleInfo[]}> = ({titleItems}) => {
  return(
    <ul className="flex flex-col items-center bg-gray-300 w-screen h-96 overflow-auto">
    { titleItems.map((titleItem) =>
    <li key={titleItem.id} className="list-none bg-gray-800 p-2 mb-1 h-12 w-96 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 text-gray-100">
      <Link to={`/Musics/${titleItem.music_id}/Titles/${titleItem.id}`} className="flex justify-between">
        <div className ="w-56 pr-6 text-sm">
          <p style={{color: titleItem.color}}>タイトル：{titleItem.title}</p>
        </div>
        <div className = "w-8 h-8 rounded-full shadow-bright flex justify-center items-center">
          <FaGooglePlay size={20} />
        </div>
      </Link>
    </li>
    )}
  </ul>
  );
};
  
export const UserCommentList: React.FC<{commentItems: TitleCommentInfo[]}> = ({commentItems}) => {
  return(
    <ul className="flex flex-col items-center bg-gray-300 w-screen h-96 overflow-auto">
      {commentItems.map((commentItem) =>
      <li key={commentItem.id} className="list-none bg-gray-800 p-2 mb-1 h-12 w-96 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 text-gray-100">
        <Link to={`/Musics/${commentItem.title.music_id}/Titles/${commentItem.title_id}`} className="">
          <div className ="w-full pr-6 text-sm">
            <p>コメント：{commentItem.text}</p>
            <p className="w-full text-right">for タイトル：{commentItem.title.title}</p>
          </div>
        </Link>
      </li>
      )}
    </ul>
  );
};