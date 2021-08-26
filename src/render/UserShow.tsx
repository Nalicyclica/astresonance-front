import React, { useContext, useState, useEffect, useRef, ChangeEventHandler } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router';
import { CurrentUser, UserInfo } from './Main';
import { authToken, setAuth, getAuth } from '../functions/Auth';
import {AppBar, Tabs, Toolbar, Tab } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom';
import { defaultMusicInfo, defaultTitleInfo, titleInfo } from './MusicShow';
import { musicInfo } from './Home';
import { commentInfo, defaultCommentInfo } from './TitleShow';
import Header from './Header';

type profileInfo = {
  nickname: string
  icon_color: string
  introduce: string
};

type titledMusicInfo = musicInfo & {
  title: string
};


type titleCommentInfo = commentInfo & {
  title: titleInfo
};

const defaultProfileInfo: profileInfo = {
  nickname: "",
  icon_color: "",
  introduce: ""
};

const UserShow: React.FC = () => {
  const history = useHistory();
  const [responseErrors, setErrors] = useState<object>({});
  const [currentProfileInfo, setProfileInfo ] = useState<profileInfo>(defaultProfileInfo);
  const [currentTitledMusic, setTitledMusic ] = useState<titledMusicInfo[]>([]);
  const [currentTitles, setTitles ] = useState<titleInfo[]>([]);
  const [currentTitleComment, setTitleComment ] = useState<titleCommentInfo[]>([]);
  const [selectTab, setSelectTab] = useState<number>(0);
  const {id: currentUserId} = useParams<{id: string}>();
  
  const fetchUserShow = async (userId: string) => {
    const currentAuth: authToken = getAuth();
    const userShowUrl: string = `http://localhost:3000/users/${userId}`
    try{  
      const response = await axios.get(userShowUrl,{headers: currentAuth});
      const userData: profileInfo = {...response.data};
      const musicData: titledMusicInfo[] = [...response.data.musics];
      const titleData: titleInfo[] = [...response.data.titles];
      const commentData: titleCommentInfo[] = [...response.data.comments];
      setProfileInfo(userData);
      setTitledMusic(musicData);
      setTitles(titleData);
      setTitleComment(commentData);
    }catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    fetchUserShow(currentUserId);
  },[]);
    
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
          { selectTab == 0 && <div className="bg-gray-100 w-screen h-96"></div>}
          { selectTab == 1 && <div className="bg-gray-300 w-screen h-96"></div>}
          { selectTab == 2 && <div className="bg-gray-500 w-screen h-96"></div>}
          </AppBar>
        </div>
        <Link to="/Musics/3/Titles/3">ここをクリック</Link>
    </div>
	);
}

export default UserShow