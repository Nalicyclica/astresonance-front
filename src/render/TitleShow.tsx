import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getAuth, authToken } from '../functions/Auth'
import {titleInfo, defaultTitleInfo} from './MusicShow'
import { CurrentUser } from "./Main";

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
  const [responseErrors, setErrors] = useState<object>({});
  const {userInfo, setUserInfo} = useContext(CurrentUser);
  const { register, handleSubmit, watch, formState: {errors} } = useForm();

  const fetchComments = async (titleId: number) => {
    const musicShowUrl = `http://localhost:3000/titles/${titleId}`
    const currentAuth: authToken = getAuth();
    try{
      const response = await axios.get(musicShowUrl,{headers: currentAuth});
      const titleData: titleInfo = {...response.data};
      const userTitleData: titleInfo = {...response.data.user_title};
      const commentsData: commentInfo[] = [...response.data.comments];
      setTitle(titleData);
      setUserTitle(userTitleData);
      setComments(commentsData);
      } catch(errors){
      console.log(errors);
    };
  };

  useEffect(()=>{
    fetchComments(titleId);
  },[titleId]);

  
  const postComment = async (titleId: number, comment: {text: string}) => {
    const postUrl=`http://localhost:3000/titles/${titleId}/comments`
    const currentAuth: authToken = getAuth();
    try {
      const response = await axios.post(
        postUrl,
        comment,
        { headers: currentAuth}
        );
        const addComment: commentInfo = {...response.data};
        addComment.icon_color = userInfo.iconColor;
        addComment.nickname = userInfo.nickname;
        setComments([...titleComments, addComment]);
        console.log("success");
      } catch (error){
        setErrors(error)
      };
    };
    
    const onSubmit = (data: {text: string}) => {
      postComment(currentTitle.id, data);
    };

    const commentList = titleComments.map((commentItem) =>
    <li key={commentItem.id} className="bg-gray-800 p-1 mb-1 h-12 w-72 rounded-md shadow-bright text-gray-100">
    <div className="flex justify-start items-center pl-2">
      <div style={{backgroundColor: commentItem.icon_color}} className = "w-2 h-2 m-1 rounded-full shadow-bright"></div>
      <p className="text-sm text-center">{commentItem.nickname}</p>
    </div>
    <div>
      <p className ="w-full pl-4">{commentItem.text}</p>
    </div>
  </li>
  );

  return(
    <div className= "flex flex-col justify-start h-home w-96 bg-gray-600 absolute">
      <div className="m-2 flex justify-center items-center">
        <p style={{color: currentTitle.color}} className="text-lg mr-4">{currentTitle.title}</p>
        <p className="text-sm mr-2">by</p>
        <div style={{backgroundColor: currentTitle.icon_color}} className = "w-2 h-2 m-1 rounded-full shadow-bright"></div>
        <p className="text-sm">{currentTitle.nickname}</p>
      </div>
      <ul className="overflow-auto p-4 h-96">
        {commentList}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-4">
        <p>タイトルに対してコメントを投稿できます：</p>
        <div className="flex justify-between items-center">
          <input type="text" {...register("text")} className="w-full mr-4 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
          <input type="submit" value="投稿" className="text-xl px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold" />
        </div>
      </form>
    </div>
  );
};

export default TitleShow