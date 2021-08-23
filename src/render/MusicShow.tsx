import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { CurrentUser } from "./Main";
import { musicInfo, getGenreName, getCategoryName } from "./Home";


const defaultMusicInfo: musicInfo = {
  id: 1,
  genre_id: 1,
  genreName: "",
  category_id: 1,
  categoryName: "", 
  music_url: "",
  user_id: 1
}

const MakeTitleForSignedIn: React.FC = () => {
  return(
    <div className="w-96 h-16 mx-8 my-6 rounded-md text-gray-100 px-3 py-1 shadow-bright">
      <div className="">曲を聴いたイメージでタイトルをつけて下さい</div>
    </div>
  )
};

const RejectTitleForSignOut: React.FC = () => {
  return(
    <div className="flex flex-col items-center w-96 h-16 mx-8 my-6 rounded-md text-gray-100 px-3 py-1 shadow-bright">
      <div className="">タイトルをつけるにはログインして下さい:</div>
      <div>
      <Link to="/SignUp" className="hover:text-yellow-300">新規登録</Link>または
      <Link to="/SignIn" className="hover:text-yellow-300">ログイン</Link>
      </div>
    </div>
  )
};

const MusicShow: React.FC = () => {
  const [ currentMusic, setMusic ] = useState<musicInfo>(defaultMusicInfo);
  const { userInfo, setUserInfo} = useContext(CurrentUser);
  const {id: currentMusicId} = useParams<{id: string}>();
  const fetchMusic = async (musicId: string) => {
    console.log(musicId);
    const musicShowUrl = `http://localhost:3000/musics/${musicId}`
    console.log(musicShowUrl);
    try{
      const response = await axios.get(musicShowUrl);
      const data: musicInfo = response.data;
      data.genreName = getGenreName(data.genre_id);
      data.categoryName = getCategoryName(data.category_id);
      console.log(data);
      setMusic(data);
    } catch(errors){
      console.log(errors);
    };
  };
  useEffect(()=>{
    fetchMusic(currentMusicId);
  },[]);

  return (
    <div>
      <div className= "flex flex-col justify-between items-center w-screen h-home">
        { userInfo.isSignIn? <MakeTitleForSignedIn /> : <RejectTitleForSignOut />}
        <div className="my-8">
          <audio controls src={currentMusic.music_url}/>
        </div>
      </div>
      <div className= "flex justify-between items-center p-1">
        <div className="mx-4">
          ジャンル:{currentMusic.genreName}の{currentMusic.categoryName}
        </div>
        <Link to="/" className="bg-gray-800 flex justify-center items-center m-2 h-12 px-8 rounded-md shadow-bright hover:shadow-gold">別の曲を探す</Link>
      </div>
    </div>
  );
};

export default MusicShow;