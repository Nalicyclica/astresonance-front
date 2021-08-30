import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form";
import { TitleInfo } from "./MusicShow";
import { useTitleCreate } from "../functions/CreateTitle";
import { useMusicDelete } from "../functions/DeleteMusic";

export type TitleInput = {
  title: string
  color: string
};

export const MusicTitled: React.FC<{userTitle: TitleInfo}> = props => {
  return(
    <div className="flex flex-col items-center w-96 h-16 mx-8 my-6 rounded-md text-gray-100 px-3 py-1 shadow-bright">
      <div className="">あなたがつけたタイトル:</div>
      <p>{props.userTitle.title}</p>
    </div>
  )
};

export const MakeTitleForSignedIn: React.FC<{currentMusicId: string}> = ({currentMusicId}) => {
  const [responseState, titleCreate] = useTitleCreate();
  const { register, handleSubmit, watch, formState: {errors} } = useForm();

  const onSubmit = (data: TitleInput) => {
        titleCreate(currentMusicId, data);
  };

  useEffect(() => {
    if(responseState.valid){
      window.location.reload();
    }
  }, [responseState])

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="w-96 mx-8 my-6 rounded-md text-gray-100 px-3 py-1 shadow-bright">
      <div className="">曲を聴いたイメージでタイトルをつけて下さい</div>
      {responseState.errors.errors && <p className="text-red-600">タイトルを再入力してください</p>}
      <label className="my-2">
        <input type="text" {...register("title")} placeholder="タイトルを入力してください" className="w-full my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
      </label>
      <div className="flex justify-between items-center px-8">
        <label className="text-center my-2">
            <span>Text color:</span>
            <input type="color" {...register("color")} className="h-8 w-16 my-2 px-0.5 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md"/>
          </label>
        <input type="submit" value="投稿" className="text-xl my-4 px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold"/>
      </div>
    </form>
  );
};

export const RejectTitleForSignOut: React.FC = () => {
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

export const YourPostedMusic: React.FC<{musicId: number, setEditShow: (setShow: boolean)=>void}> = ({musicId, setEditShow}) => {
  const history = useHistory();
  const [deleteResponse, musicDelete] = useMusicDelete();
  
  const handleClickDelete = () => {
    musicDelete(musicId);
  };

  const handleClickEdit = () => {
    setEditShow(true);
  };

  useEffect(() => {
    if(deleteResponse.valid){
      alert("音楽を削除しました");
      history.push('/');
    }else{
      if(deleteResponse.id > 0){
        alert("削除できませんでした");
      }
    }
  }, [deleteResponse]);

  return(
    <div className="flex flex-col items-center w-96 h-16 mx-8 my-6 rounded-md text-gray-100 px-3 py-1 shadow-bright">
      <p className="text-lg"> あなたが投稿した音楽</p>
      <div className="flex justify-between w-full">
        <button onClick={handleClickEdit}>音楽情報を編集する</button>
        <button onClick={handleClickDelete} >音楽を削除する</button>
      </div>
    </div>
  );
};