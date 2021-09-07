import React, { useContext } from 'react';
import {FaGooglePlay} from 'react-icons/fa'
import { Link} from 'react-router-dom';
import { PostedTitleInfo, TitleCommentInfo, TitledMusicInfo } from "../functions/ShowUser"
import { CurrentUser } from '../functions/UserInfo';

export const UserMusicList: React.FC<{musicItems: TitledMusicInfo[]}> = ({musicItems})=> {
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  return(
    <div  className="flex flex-col items-center py-4 text-gray-100">
      { musicItems.map((musicItem) =>
        <li key={musicItem.id} className="list-none px-4 py-2 mb-3 w-96 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 backdrop-filter backdrop-blur-xl">
          <Link to={`/Musics/${musicItem.id}`} className="flex justify-between items-center">
            <div className ="w-56 pr-4 text-sm">
              { musicItem.user_id == userInfo.id ? "投稿した音楽" : 
                (<p style={{color: musicItem.color}}>タイトル：
                  {musicItem.title ? musicItem.title : "まだ付けていません"}</p>
              )}
              <p>カテゴリー：{musicItem.genreName}の{musicItem.categoryName}</p>
            </div>
            <div className = "w-10 h-10 rounded-full shadow-bright flex justify-center items-center">
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
    <ul className="flex flex-col items-center py-4 text-gray-100">
    { titleItems.map((titleItem) =>
    <li key={titleItem.id} className="list-none px-4 py-2 mb-3 w-96 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 backdrop-filter backdrop-blur-xl">
      <Link to={`/Musics/${titleItem.music_id}/Titles/${titleItem.id}`} className="flex justify-between">
        <div className ="w-56 pr-6 ">
          <p style={{textShadow: `2px 2px 1px ${titleItem.color}`}} className="text-xl font-extrabold">{titleItem.title}</p>
        </div>
        <div className = "w-10 h-10 rounded-full shadow-bright flex justify-center items-center">
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
    <ul className="flex flex-col items-center py-4 text-gray-100">
      {commentItems.map((commentItem) =>
      <li key={commentItem.id} className="list-none px-4 py-2 mb-3 w-96 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 backdrop-filter backdrop-blur-xl">
        <Link to={`/Musics/${commentItem.title.music_id}/Titles/${commentItem.title_id}`} className="">
          <div className ="w-full pr-6 text-sm">
            <p>{commentItem.text}</p>
            <p className="w-full text-sm text-right">to タイトル：{commentItem.title.title}</p>
          </div>
        </Link>
      </li>
      )}
    </ul>
  );
};