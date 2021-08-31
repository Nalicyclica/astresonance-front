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
    }
  },[titleResponse]);
  
  useEffect(()=>{
    titleShow(titleId);
    commentIndex(titleId);
  },[titleId]);

  return(
    <div className= "flex flex-col justify-start relative h-home w-96 backdrop-filter backdrop-blur-xl">
      <button>
        <AiOutlineArrowRight size={40} onClick={closeTitleShow} className="absolute top-4 right-4" />
      </button>
      <div className="m-2 flex justify-center items-center">
        <p style={{color: titleItem.color}} className="text-lg mr-4">{titleItem.title}</p>
        <p className="text-sm mr-2">by</p>
        <div style={{backgroundColor: titleItem.icon_color}} className = "w-2 h-2 m-1 rounded-full shadow-bright"></div>
        <Link to={`/UserShow/${titleItem.user_id}`} className="text-sm">{titleItem.nickname}</Link>
      </div>
      { userInfo.id == titleItem.user_id && <TitleDelete titleId={titleItem.id} />}
      <CommentList commentItems={commentItems} currentUserId={userInfo.id} removeCommentItem={removeCommentItem} />
      <CommentCreate titleId={titleItem.id} userInfo={userInfo} commentCreate={commentCreate} />
    </div>
  );
};

export default TitleShow