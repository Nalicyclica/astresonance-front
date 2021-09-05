import React, {useEffect, useState, useContext} from "react";
import { Link } from "react-router-dom";
import {CurrentShow, defaultShow} from './MusicShow'
import { CurrentUser } from "../functions/UserInfo";
import {AiOutlineArrowRight} from 'react-icons/ai'
import { useTitleDelete } from "../functions/DeleteTitle";
import { useTitleShow } from "../functions/ShowTitle";
import { useCommentIndex } from "../functions/IndexComment";
import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";

const TitleDelete: React.FC<{titleId: number}> = ({titleId}) => {
  const [deleteResponse, titleDelete] = useTitleDelete();
  
  const handleClickDelete = () => {
    titleDelete(titleId);
  };

  useEffect(() => {
    if(deleteResponse.valid){
      alert("タイトルを削除しました");
      window.location.reload();
    }else{
      if(deleteResponse.id > 0){
        alert("削除できませんでした");
      }
    }
  }, [deleteResponse]);

  return(
    <button onClick={handleClickDelete}>
      タイトルを削除する
    </button>
  );
};

const TitleShow: React.FC<{titleId: number, musicId: number, setTitleShow: (setShow: CurrentShow)=> void}> = ({titleId, musicId, setTitleShow}) => {
  const [{titleItem, titleResponse}, titleShow] = useTitleShow();
  const [{commentItems, commentResponse}, {commentIndex, commentCreate, removeCommentItem}] = useCommentIndex();
  const {userInfo, setUserInfo} = useContext(CurrentUser);

  const closeTitleShow = () => {
    setTitleShow(defaultShow);
  };

  useEffect(()=>{
    if(titleResponse.valid){
      if(titleItem.music_id != musicId){
        setTitleShow(defaultShow);
      }
    }else{
      if(titleResponse.errors.errors){
        setTitleShow(defaultShow);
      }
    }
  },[titleResponse]);
  
  useEffect(()=>{
    if(!userInfo.isSignIn){
      setTitleShow(defaultShow);
    }else{
      titleShow(titleId);
      commentIndex(titleId);
    }
  },[titleId]);

  return(
    <div>
      <div className= "h-home w-96 flex flex-col justify-between items-center backdrop-filter backdrop-blur-xl shadow-header relative text-gray-100">
        <div className="flex flex-col justify-start items-center">
          <div className="m-2 flex justify-center items-end text-shadow-black">
            <p style={{color: titleItem.color}} className="text-xl mr-4 text-shadow-white text-xl font-extrabold">{titleItem.title}</p>
            <p className="text-sm mr-2">by</p>
            <div className="flex justify-start items-center pr-2">
              <div style={{backgroundColor: titleItem.icon_color}} className = "w-3 h-3 mr-1 rounded-full shadow-bright"></div>
              <Link to={`/UserShow/${titleItem.user_id}`} className="hover:text-yellow-400">{titleItem.nickname}</Link>
            </div>
          </div>
          { userInfo.id == titleItem.user_id && <TitleDelete titleId={titleItem.id} />}
          <CommentList commentItems={commentItems} currentUserId={userInfo.id} removeCommentItem={removeCommentItem} />
        </div>
        <CommentCreate titleId={titleItem.id} userInfo={userInfo} commentCreate={commentCreate} />
      </div>
      <button className="text-4xl text-yellow-400 hover:text-yellow-100">
        <AiOutlineArrowRight onClick={closeTitleShow} className="absolute top-4 left-4" />
      </button>
    </div>
  );
};

export default TitleShow