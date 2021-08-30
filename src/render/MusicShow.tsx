import React, {useState, useEffect, useContext, useRef} from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { CurrentUser } from "../functions/UserInfo";
import TitleShow from './TitleShow';
import MusicEdit from "./MusicEdit";
import { useMusicShow } from "../functions/ShowMusic";
import TitleList from "./TitleList"
import { MusicTitled, MakeTitleForSignedIn, RejectTitleForSignOut, YourPostedMusic } from "./MusicShowForm";

export type CurrentShow = {
  showFlag: boolean
  showId: number
}

export type TitleInfo = {
  id: number
  title: string
  color: string
  user_id: number
  music_id: number
  nickname: string
  icon_color: string
};

export const defaultShow: CurrentShow = {
  showFlag: false,
  showId: -1
};

export const  defaultTitleInfo: TitleInfo = {
  id: 0,
  title: "",
  color: "",
  user_id: 0,
  music_id: 0,
  nickname: "",
  icon_color: ""
};

const MusicShow: React.FC = () => {
  const [{musicItem, titleItems, userTitle, response}, musicShow] = useMusicShow();
  const [ currentTitleShow, setTitleShow ] = useState<CurrentShow>(defaultShow);
  const [ musicEditShow, setEditShow ] = useState<boolean>(false);
  const { userInfo, setUserInfo} = useContext(CurrentUser);
  const {id: currentMusicId, title_id: initialTitleId} = useParams<{id: string, title_id: string}>();
  
  useEffect(()=>{
    musicShow(currentMusicId);
    if(initialTitleId){
      const setCurrent: CurrentShow = {
        showFlag: true,
        showId: Number(initialTitleId),
      };
      setTitleShow(setCurrent);
    }
  },[]);
  
  return (
    <div>
      <div className="flex justify-between">
        <div className= "flex flex-col justify-between items-center w-screen h-home">
          { (!response.valid && response.errors.errors)? <p className="text-red-600"></p> : userInfo.isSignIn? ( musicItem.user_id == userInfo.id? <YourPostedMusic musicId={musicItem.id} setEditShow={setEditShow} /> : (userTitle.isTitled? <MusicTitled userTitle = {userTitle.titleData}/> : <MakeTitleForSignedIn currentMusicId={currentMusicId}/>)) : <RejectTitleForSignOut />}
          <div className="my-8">
            <audio controls src={musicItem.music_url}/>
          </div>
        </div>

        { userInfo.isSignIn && ( musicItem.user_id == userInfo.id || userTitle.isTitled ) &&
          <div className="w-96 bg-gray-300">
            <p className="text-lg">他の人がつけたタイトル</p>
            <TitleList titleItems={titleItems} setTitleShow={setTitleShow}/>
          </div>
        }
        { currentTitleShow.showFlag && <div className= "absolute"><TitleShow titleId={currentTitleShow.showId} musicId={Number(currentMusicId)} setTitleShow={setTitleShow} /></div>
        }
      </div>
      <div className= "flex justify-between items-center p-1 h-20">
        <div className="flex justify-start items-center">
          <p className="mx-4">
            ジャンル:{musicItem.genreName}の{musicItem.categoryName}
          </p>
          { userInfo.isSignIn && ( musicItem.user_id == userInfo.id || userTitle.isTitled ) &&
          <div className="flex justify-start items-end" >
            <p className="mr-3">投稿者:</p> 
            <div style={{backgroundColor: musicItem.icon_color}} className="w-6 h-6 mr-2 rounded-full shadow-bright hover:shadow-gold"></div>
            <Link to={`/UserShow/${musicItem.user_id}`}>
              {musicItem.nickname}
            </Link>
          </div>
          }
        </div>
        <Link to="/" className="bg-gray-800 flex justify-center items-center m-2 h-12 px-8 rounded-md shadow-bright hover:shadow-gold">別の曲を探す</Link>
      </div>
      { musicEditShow && <MusicEdit musicItem={musicItem} setEditShow={setEditShow} />}
    </div>
  );
};

export default MusicShow;