import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { CurrentUser } from "../functions/UserInfo";
import TitleShow from './TitleShow';
import MusicEdit from "./MusicEdit";
import { useMusicShow } from "../functions/ShowMusic";
import TitleList from "./TitleList"
import { MusicTitled, MakeTitleForSignedIn, RejectTitleForSignOut, YourPostedMusic } from "./MusicShowForm";
import MusicFooter from "./MusicFooter";
import ReactAudioPlayer from "react-audio-player";
import LoadingNow from "./LoadingNow";

export type CurrentShow = {
  showFlag: boolean
  showId: number
};

export const defaultShow: CurrentShow = {
  showFlag: false,
  showId: -1
};

export const MusicLoading = React.createContext({} as React.Dispatch<React.SetStateAction<boolean>>);

const MusicShow: React.FC = () => {
  const [{musicItem, titleItems, userTitle, loading, result}, musicShow] = useMusicShow();
  const [ currentTitleShow, setTitleShow ] = useState<CurrentShow>(defaultShow);
  const [ musicEditShow, setEditShow ] = useState<boolean>(false);
  const {userInfo} = useContext(CurrentUser);
  const {id: currentMusicId, title_id: initialTitleId} = useParams<{id: string, title_id: string}>();
  const [ loadingFlag, setMusicLoading ] = useState<boolean>(true);
  
  useEffect(()=>{
    setMusicLoading(true);
  },[currentMusicId]);

  useEffect(()=>{
    if(loadingFlag==true){
      musicShow(currentMusicId);
    }
  },[loadingFlag]);

  useEffect(()=>{
    if(initialTitleId && userInfo.isSignIn && (userTitle.isTitled || userInfo.id == musicItem.user_id)){
      const setCurrent: CurrentShow = {
        showFlag: true,
        showId: Number(initialTitleId),
      };
      setTitleShow(setCurrent);
    }else{
      setTitleShow(defaultShow);
      setEditShow(false);
    }
    setMusicLoading(false);
  },[result]);
  
  return (
    <div>
    <MusicLoading.Provider value={setMusicLoading}>
      <div className="flex justify-center h-home">
        <div className= "flex flex-col justify-between items-center my-2">
          <div className="w-96 mx-8 my-6 rounded-md text-gray-100 px-4 pt-2 pb-3 shadow-bright backdrop-filter backdrop-blur-lg">
            { (!result.valid && result.errors)? <p className="text-red-600">音楽の読み込みに失敗しました</p> :
              userInfo.isSignIn? ( musicItem.user_id == userInfo.id? <YourPostedMusic musicId={musicItem.id} setEditShow={setEditShow} /> :
                ( userTitle.isTitled? <MusicTitled userTitle = {userTitle.titleData}/> : <MakeTitleForSignedIn currentMusicId={currentMusicId} />)) : <RejectTitleForSignOut />}
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
        { currentTitleShow.showFlag && 
          <div className= "absolute right-0">
            <TitleShow titleId={currentTitleShow.showId} musicId={Number(currentMusicId)} setTitleShow={setTitleShow} />
          </div>
        }
      </div>
      <MusicFooter musicItem={musicItem} userInfo={userInfo} userTitle={userTitle} />
      { musicEditShow && <MusicEdit musicItem={musicItem} setEditShow={setEditShow} />}
    </MusicLoading.Provider>
    { loading && <LoadingNow /> }
    </div>
  );
};

export default MusicShow;