import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import { CurrentUser } from "../functions/UserInfo";
import TitleShow from './TitleShow';
import MusicEdit from "./MusicEdit";
import { useMusicShow } from "../functions/ShowMusic";
import TitleList from "./TitleList"
import { MusicTitled, MakeTitleForSignedIn, RejectTitleForSignOut, YourPostedMusic } from "./MusicShowForm";
import MusicFooter from "./MusicFooter";
import ReactAudioPlayer from "react-audio-player";

export type CurrentShow = {
  showFlag: boolean
  showId: number
};

export const defaultShow: CurrentShow = {
  showFlag: false,
  showId: -1
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
      <div className="flex justify-center h-home">
        <div className= "flex flex-col justify-between items-center my-2">
          <div className="w-96 mx-8 my-6 rounded-md text-gray-100 px-4 pt-2 pb-3 shadow-bright backdrop-filter backdrop-blur-lg">
            { (!response.valid && response.errors.errors)? <p className="text-red-600"></p> :
              userInfo.isSignIn? ( musicItem.user_id == userInfo.id? <YourPostedMusic musicId={musicItem.id} setEditShow={setEditShow} /> :
                ( userTitle.isTitled? <MusicTitled userTitle = {userTitle.titleData}/> : <MakeTitleForSignedIn currentMusicId={currentMusicId}/>)) : <RejectTitleForSignOut />}
          </div>
          <div className="my-4">
            <ReactAudioPlayer controls src={musicItem.music_url} autoPlay={true} volume={0.5} controlsList="nodownload" />
          </div>
        </div>
        { userInfo.isSignIn && ( musicItem.user_id == userInfo.id || userTitle.isTitled ) &&
          <div className="p-8 flex flex-col justify-start items-center text-gray-100">
            <p className="text-lg text-shadow-black border-b px-6">この音楽のタイトル一覧</p>
            <TitleList titleItems={titleItems} setTitleShow={setTitleShow}/>
          </div>
        }
        { currentTitleShow.showFlag && <div className= "absolute right-0"><TitleShow titleId={currentTitleShow.showId} musicId={Number(currentMusicId)} setTitleShow={setTitleShow} /></div>
        }
      </div>
      <MusicFooter musicItem={musicItem} userInfo={userInfo} userTitle={userTitle} />
      { musicEditShow && <MusicEdit musicItem={musicItem} setEditShow={setEditShow} />}
    </div>
  );
};

export default MusicShow;