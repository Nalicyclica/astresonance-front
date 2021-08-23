import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { useForm } from "react-hook-form"
import { Link, useHistory, useParams } from "react-router-dom";
import { CurrentUser } from "./Main";
import { musicInfo, getGenreName, getCategoryName } from "./Home";
import { authToken, getAuth } from "../functions/Auth"

type titleInput = {
  title: string
  color: string
};

type titleInfo = {
  id: number
  title: string
  color: string
  user_id: number
  music_id: number
  nickname: string
  icon_color: string
};

type userTitleInfo = {
  titleData: titleInfo
  isTitled: boolean
};

const  defaultTitleInfo: titleInfo = {
  id: 0,
  title: "",
  color: "",
  user_id: 0,
  music_id: 0,
  nickname: "",
  icon_color: ""
};

const defaultUserTitleInfo: userTitleInfo = {
  titleData: defaultTitleInfo,
  isTitled: false
};

const defaultMusicInfo: musicInfo = {
  id: 1,
  genre_id: 1,
  genreName: "",
  category_id: 1,
  categoryName: "", 
  music_url: "",
  user_id: 1
};

const MusicTitled: React.FC<{userTitle: titleInfo}> = props => {
  return(
    <div className="flex flex-col items-center w-96 h-16 mx-8 my-6 rounded-md text-gray-100 px-3 py-1 shadow-bright">
      <div className="">あなたがつけたタイトル:</div>
      <p>{props.userTitle.title}</p>
    </div>
  )
};

const MakeTitleForSignedIn: React.FC<{currentMusicId: string}> = props => {
  const [responseErrors, setErrors] = useState<object>({});
  const history = useHistory();
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const postTitle = async (musicId: string, inputInfo: titleInput) => {
    const currentAuth: authToken = getAuth();
    try {
      const response = await axios.post(
        `http://localhost:3000/musics/${musicId}/titles`,
        {title: inputInfo},
        {headers: currentAuth}
      );
      console.log(inputInfo);
    } catch (error) {
      setErrors(error);
      console.log(error);
    };
  };
  const onSubmit = (data: titleInput) => {
        setErrors({});
        postTitle(props.currentMusicId, data);
        if(true){
          console.log("true");
        }else{
          console.log(responseErrors);
        }
  };
  return(
    <form onSubmit={handleSubmit(onSubmit)} className="w-96 mx-8 my-6 rounded-md text-gray-100 px-3 py-1 shadow-bright">
      <div className="">曲を聴いたイメージでタイトルをつけて下さい</div>
      <label className="my-2">
        <input type="text" {...register("title")} placeholder="タイトルを入力してください" onChange={hoge => hoge} className="w-full my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
      </label>
      <div className="flex justify-between items-center px-8">
        <label className="text-center my-2">
            <span>Text color:</span>
            <input type="color" {...register("color")} className="h-8 w-16 my-2 px-0.5 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md"/>
          </label>
        <input type="submit" value="投稿" className="text-xl my-4 px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold"/>
      </div>
    </form>
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
  const [ musicTitles, setmusicTitles ] = useState<titleInfo[]>([]);
  const [ currentUserTitle, setUserTitle ] = useState<userTitleInfo>(defaultUserTitleInfo);
  const { userInfo, setUserInfo} = useContext(CurrentUser);
  const {id: currentMusicId} = useParams<{id: string}>();
  const fetchMusic = async (musicId: string) => {
    const musicShowUrl = `http://localhost:3000/musics/${musicId}`
    const currentAuth: authToken = getAuth();
    const userTitleData: userTitleInfo = {...defaultUserTitleInfo};
    try{
      const response = await axios.get(musicShowUrl,{headers: currentAuth});
      const data: musicInfo = {...response.data};
      data.genreName = getGenreName(data.genre_id);
      data.categoryName = getCategoryName(data.category_id);
      setMusic({...data});
      if(response.data.user_title){
        userTitleData.titleData = {...response.data.user_title};
        userTitleData.isTitled = true;
        const musicTitlesData: titleInfo[] = response.data.titles;
        setmusicTitles(musicTitlesData);
      }
      setUserTitle(userTitleData);
      } catch(errors){
      console.log(errors);
    };
  };
  useEffect(()=>{
    fetchMusic(currentMusicId);
  },[]);

  const titleList = musicTitles.map((titleItem) =>
  <li key={titleItem.id} className="bg-gray-800 p-2 mb-1 w-64 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 text-gray-100">
    <Link to={`/Titles/${titleItem.id}`} className="flex justify-start">
      <div style={{backgroundColor: titleItem.icon_color}} className = "w-8 h-8 rounded-full shadow-bright">
      </div>
      <div className ="flex justify-between items-center w-full pr-6">
        <p>{titleItem.title}</p>
        <p className="text-sm">by {titleItem.nickname}</p>
      </div>
    </Link>
  </li>
  );

  return (
    <div>
      <div className="flex justify-between">
        <div className= "flex flex-col justify-between items-center w-screen h-home">
          { userInfo.isSignIn? ( currentUserTitle.isTitled? <MusicTitled userTitle = {currentUserTitle.titleData}/> : <MakeTitleForSignedIn currentMusicId={currentMusicId}/>) : <RejectTitleForSignOut />}
          <div className="my-8">
            <audio controls src={currentMusic.music_url}/>
          </div>
        </div>
        <div>

        { userInfo.isSignIn && currentUserTitle.isTitled &&
          <div>
            <p className="text-lg">他の人がつけたタイトル</p>
            <ul className="overflow-y-auto p-4 h-96 m-12">
              { titleList }
            </ul>
          </div>
        }
        </div>
      </div>
      <div className= "flex justify-between items-center p-1 h-20">
        <div className="mx-4">
          ジャンル:{currentMusic.genreName}の{currentMusic.categoryName}
        </div>
        <Link to="/" className="bg-gray-800 flex justify-center items-center m-2 h-12 px-8 rounded-md shadow-bright hover:shadow-gold">別の曲を探す</Link>
      </div>
    </div>
  );
};

export default MusicShow;