import React, { useState, useEffect } from 'react';
import {FaGooglePlay} from 'react-icons/fa'
import {AppBar, Tabs, Toolbar, Tab } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom';
import { TitledMusicInfo, useUserShow } from "../functions/ShowUser"
import { UserMusicList, UserTitleList, UserCommentList } from './UserShowList';

const UserShow: React.FC = () => {
  const [{profile, musicItems, titleItems, commentItems, response}, userShow] = useUserShow();
  const [selectTab, setSelectTab] = useState<number>(0);
  const {id: currentUserId} = useParams<{id: string}>();

  useEffect(() => {
    userShow(currentUserId);
  },[]);
    
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectTab(newValue);
  };
    return (
      <div className="flex flex-col items-center flex-grow bg-gray-900">
        <h1 className="text-2xl mt-8 mb-6 px-4 text-yellow-300 border-b border-yellow-300">ユーザー情報の確認</h1>
        {response.errors.errors && <p className="text-red-600">ユーザー情報を読み込めませんでした</p>}
        <div className="flex w-96 justify-start items-end p-2 border-b border-yellow-300">
          <div style={{backgroundColor: profile.icon_color}} className="w-16 h-16 rounded-full shadow-bright">
          </div>
          <p className="text-xl mx-4 mb-2">{profile.nickname}</p>
        </div>
        <div className="flex justify-between items-center p-2 mb-16 border-b border-yellow-300">
          <div className="" >
            <p className="m-2">自己紹介:</p>
            <p className="w-96 text-lg mx-4 mb-2">{profile.introduce}</p>
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
          { selectTab == 0 && <UserMusicList musicItems={musicItems} />}
          { selectTab == 1 && <UserTitleList titleItems={titleItems} />}
          { selectTab == 2 && <UserCommentList commentItems={commentItems} />}
          </AppBar>
        </div>
    </div>
	);
}

export default UserShow