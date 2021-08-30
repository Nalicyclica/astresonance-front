import React, { useContext, useState, useEffect, useRef, ChangeEventHandler } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {FaGooglePlay} from 'react-icons/fa'
import { authToken, getAuth } from '../functions/Auth';
import {AppBar, Tabs, Toolbar, Tab } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom';
import { TitleInfo } from './MusicShow';
import { MusicInfo } from "../functions/IndexMusic";
import { getGenreName, getCategoryName } from "../functions/MusicGenre"
import { commentInfo } from './TitleShow';

type profileInfo = {
  nickname: string
  icon_color: string
  introduce: string
};

type titledMusicInfo = MusicInfo & {
  title: string
  color: string
};

type postedTitleInfo = Omit<TitleInfo, 'nickname' | 'icon_color' >


type titleCommentInfo = commentInfo & {
  title: TitleInfo
};

const defaultProfileInfo: profileInfo = {
  nickname: "",
  icon_color: "",
  introduce: ""
};

const UserMusicList: React.FC<{titledMusics: titledMusicInfo[]}> = ({titledMusics})=> {
  return(
    <div  className="flex flex-col items-center bg-gray-300 w-screen h-96 overflow-auto">
      {titledMusics.map((musicItem) =>
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

const UserShow: React.FC = () => {
  const history = useHistory();
  const [responseErrors, setErrors] = useState<object>({});
  const [currentProfileInfo, setProfileInfo ] = useState<profileInfo>(defaultProfileInfo);
  const [titledMusics, setTitledMusic ] = useState<titledMusicInfo[]>([]);
  const [postedTitles, setTitles ] = useState<postedTitleInfo[]>([]);
  const [titleCommented, setTitleComment ] = useState<titleCommentInfo[]>([]);
  const [selectTab, setSelectTab] = useState<number>(0);
  const {id: currentUserId} = useParams<{id: string}>();
  
  const fetchUserShow = async (userId: string) => {
    const currentAuth: authToken = getAuth();
    const userShowUrl: string = `http://localhost:3000/users/${userId}`
    try{  
      const response = await axios.get(userShowUrl,{headers: currentAuth});
      const userData: profileInfo = {...response.data};
      const titleData: postedTitleInfo[] = [...response.data.titles];
      const commentData: titleCommentInfo[] = [...response.data.comments];

      const musicData: titledMusicInfo[] = [];
      response.data.musics.map((data: titledMusicInfo) => {
        data.genreName = getGenreName(data.genre_id);
        data.categoryName = getCategoryName(data.category_id);
        musicData.push(data);
      })

      setProfileInfo(userData);
      setTitledMusic(musicData);
      setTitles(titleData);
      setTitleComment(commentData);
      console.log(response.data);
    }catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    fetchUserShow(currentUserId);
  },[]);

  const titleList = postedTitles.map((titleItem) =>
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
  );

  const commentList = titleCommented.map((commentItem) =>
  <li key={commentItem.id} className="list-none bg-gray-800 p-2 mb-1 h-12 w-96 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 text-gray-100">
    <Link to={`/Musics/${commentItem.title.music_id}/Titles/${commentItem.title_id}`} className="">
      <div className ="w-full pr-6 text-sm">
        <p>コメント：{commentItem.text}</p>
        <p className="w-full text-right">for タイトル：{commentItem.title.title}</p>
      </div>
    </Link>
  </li>
  );
    
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectTab(newValue);
  };
    return (
      <div className="flex flex-col items-center flex-grow bg-gray-900">
        <h1 className="text-2xl mt-8 mb-6 px-4 text-yellow-300 border-b border-yellow-300">ユーザー情報の確認</h1>
        <div className="flex w-96 justify-start items-end p-2 border-b border-yellow-300">
          <div style={{backgroundColor: currentProfileInfo.icon_color}} className="w-16 h-16 rounded-full shadow-bright">
          </div>
          <p className="text-xl mx-4 mb-2">{currentProfileInfo.nickname}</p>
        </div>
        <div className="flex justify-between items-center p-2 mb-16 border-b border-yellow-300">
          <div className="" >
            <p className="m-2">自己紹介:</p>
            <p className="w-96 text-lg mx-4 mb-2">{currentProfileInfo.introduce}</p>
          </div>
        </div>
        <div>
          <AppBar position="static" className="h-96 bg-gray-400">
            <Toolbar  className="h-32 bg-gray-600">
              <Tabs value={selectTab} variant = "scrollable" onChange={handleChange} className="w-full bg-gray-800">
                <Tab label="投稿した音楽" />
                <Tab label="投稿したタイトル" />
                <Tab label="投稿したコメント" />
              </Tabs>
            </Toolbar>
          { selectTab == 0 && <UserMusicList titledMusics={titledMusics} />}
          { selectTab == 1 && <div className="flex flex-col items-center bg-gray-300 w-screen h-96 overflow-auto">{titleList}</div>}
          { selectTab == 2 && <div className="flex flex-col items-center bg-gray-300 w-screen h-96 overflow-auto">{commentList}</div>}
          </AppBar>
        </div>
    </div>
	);
}

export default UserShow