import React, { useState, useEffect } from 'react';
import {AppBar, Tabs, Toolbar, Tab } from '@material-ui/core'
import {  useHistory, useParams } from 'react-router-dom';
import { useUserShow } from "../functions/ShowUser"
import { UserMusicList, UserTitleList, UserCommentList } from './UserShowList';
import { useContext } from 'react';
import { CurrentUser } from '../functions/UserInfo';

const UserShow: React.FC = () => {
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const [{profile, musicItems, titleItems, commentItems, response}, userShow] = useUserShow();
  const history = useHistory();
  const [selectTab, setSelectTab] = useState<number>(0);
  const {id: currentUserId} = useParams<{id: string}>();

  useEffect(() => {
    if(!userInfo.isSignIn){
      history.push('/');
    }else{
      userShow(currentUserId);
    }
  },[currentUserId]);
    
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectTab(newValue);
  };
    return (
      <div>
        <div className="flex flex-col items-center mb-12 pb-16 backdrop-filter backdrop-blur rounded-lg shadow-header">
          <div className="flex items-end w-120 mt-8 py-2 px-4 border-b border-yellow-400">
            <div style={{backgroundColor: profile.icon_color}} className="w-10 h-10 mr-5 rounded-full shadow-bright"></div>
            <h1 className="text-lg text-yellow-400 text-shadow-black"><span className="text-4xl">{profile.nickname}    </span>さんの投稿</h1>
          </div>
          {response.errors.errors && <p className="text-red-600">ユーザー情報を読み込めませんでした</p>}
          <div className="w-96 flex flex-col items-center text-shadow-black">
            <div className="w-full p-2 border-b border-yellow-400">
              <div className="" >
                <p className="m-2">自己紹介:</p>
                <p className="text-lg mx-4 mb-2">{profile.introduce}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <AppBar position="static" className="bg-transparent shadow-none">
            <Toolbar  className="px-3 py-0 m-0">
              <Tabs value={selectTab} variant = "scrollable" onChange={handleChange} className="w-full rounded-t-xl bg-gray-800 border border-yellow-400 border-b-0">
                <Tab label="投稿した音楽" className="text-yellow-300 font-sawarabi" />
                <Tab label="投稿したタイトル" className="text-yellow-300 font-sawarabi" />
                <Tab label="投稿したコメント" className="text-yellow-300 font-sawarabi" />
              </Tabs>
            </Toolbar>
            <div className="w-screen h-home overflow-auto my-2 py-2 ">
              { selectTab == 0 && <UserMusicList musicItems={musicItems} />}
              { selectTab == 1 && <UserTitleList titleItems={titleItems} />}
              { selectTab == 2 && <UserCommentList commentItems={commentItems} />}
            </div>
          </AppBar>
        </div>
    </div>
	);
}

export default UserShow