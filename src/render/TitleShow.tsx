import React, {useEffect, useState} from "react";
import axios from "axios";
import { getAuth, authToken } from '../functions/Auth'
import {titleInfo, defaultTitleInfo} from './MusicShow'

type commentInfo = {
  id: number
  text: string
  user_id: number
  title_id: number
  nickname: string
  icon_color: string
};

const defaultCommentInfo: commentInfo = {
  id: -1,
  text: "",
  user_id: -1,
  title_id: -1,
  nickname: "",
  icon_color: ""
};

const TitleShow: React.FC<{titleId: number}> = ({titleId}) => {
  const [currentTitle, setTitle] = useState<titleInfo>(defaultTitleInfo);
  const [userTitle, setUserTitle] = useState<titleInfo>(defaultTitleInfo);
  const [titleComments, setComments] = useState<commentInfo[]>([]);

  const fetchComments = async (titleId: number) => {
    const musicShowUrl = `http://localhost:3000/titles/${titleId}`
    const currentAuth: authToken = getAuth();
    try{
      const response = await axios.get(musicShowUrl,{headers: currentAuth});
      const titleData: titleInfo = {...response.data};
      const userTitleData: titleInfo = {...response.data.user_title};
      const commentsData: commentInfo[] = {...response.data.comments};
      setTitle(titleData);
      setUserTitle(userTitleData);
      setComments(commentsData);
      console.log("success");
      console.log(titleData);
      console.log(userTitleData);
      console.log(commentsData);
      } catch(errors){
      console.log(errors);
    };
  };

  useEffect(()=>{
    fetchComments(titleId);
  },[titleId]);
  return(
    <div className="w-96 h-home bg-gray-600 absolute">
      <div className= "flex flex-col justify-start items-center w-screen h-home">
        <div className="m-2">選択したタイトル{titleId}</div>
        <div className="m-2">あなたのタイトル</div>
        <ul className="overflow-auto p-4 h-96">
          コメントのリスト
        </ul>
        <form>
          <div>コメント投稿のフォーム</div>
          <div>
            <input type="text" />
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TitleShow