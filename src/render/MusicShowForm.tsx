import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form";
import { TitleInfo } from "../functions/ShowTitle"
import { useTitleCreate } from "../functions/CreateTitle";
import { useMusicDelete } from "../functions/DeleteMusic";
import { useContext } from "react";
import { MusicLoading } from "./MusicShow";
import ConfirmAction, { ConfirmActionInfo, defaultConfirmAction } from "./ConfirmAction";
import LoadingNow from "./LoadingNow";

export type TitleInput = {
  title: string
  color: string
};

export const MusicTitled: React.FC<{userTitle: TitleInfo}> = ({userTitle}) => {
  return(
    <div className="flex flex-col items-center">
      <div className="">あなたがつけたタイトル:</div>
      <p  style={{textShadow: `2px 2px 2px ${userTitle.color}`}} className="text-4xl font-extrabold">{userTitle.title}</p>
    </div>
  )
};

export const MakeTitleForSignedIn: React.FC<{currentMusicId: string}> = ({currentMusicId}) => {
  const [{id, loading, result}, titleCreate] = useTitleCreate();
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const setMusicLoading = useContext(MusicLoading);

  const onSubmit = (data: TitleInput) => {
        titleCreate(currentMusicId, data);
  };

  useEffect(() => {
    if(result.valid){
      setMusicLoading(true);
    }else{
      if(result.action != ""){
        alert("タイトルを投稿できませんでした");
      }
    }
  }, [result])

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="text-shadow-black">
      <div className="">曲を聴いたイメージでタイトルをつけて下さい</div>
      {result.errors && <p className="text-red-600">タイトルを再入力してください</p>}
      <label className="my-2">
        <input type="text" {...register("title")} placeholder="タイトルを入力してください" className="w-full my-2 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
      </label>
      <div className="flex justify-between items-center px-8">
        <label className="my-2 flex justify-start items-center">
            <span className="mr-3">タイトルの色:</span>
            <input type="color" {...register("color")} className="h-8 w-16 my-2 px-0.5 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md"/>
          </label>
        <input type="submit" value="投稿" className="text-xl my-4 px-5 py-3 bg-gray-800 rounded-md shadow-bright hover:shadow-gold"/>
      </div>
      { loading && <LoadingNow />}
    </form>
  );
};

export const RejectTitleForSignOut: React.FC = () => {
  return(
    <div className="flex flex-col items-center">
      <div className="">タイトルをつけるにはログインして下さい:</div>
      <div>
      <Link to="/SignUp" className="hover:text-yellow-300">新規登録</Link>
      <span className="text-sm">  または  </span>
      <Link to="/SignIn" className="hover:text-yellow-300">ログイン</Link>
      </div>
    </div>
  )
};

export const YourPostedMusic: React.FC<{musicId: number, setEditShow: (setShow: boolean)=>void}> = ({musicId, setEditShow}) => {
  const history = useHistory();
  const [{id, loading, result}, musicDelete] = useMusicDelete();
  const [actionConfirm, setConfirmAction] = useState(defaultConfirmAction);
  const confirmMessage = "音楽を削除";
  
  const handleClickDelete = () => {
    const confirmShowData: ConfirmActionInfo = {
      modalShow: true,
      response: false
    };
    setConfirmAction(confirmShowData);
  };

  const handleClickEdit = () => {
    setEditShow(true);
  };
  
  useEffect(() => {
    if(actionConfirm.response){
      musicDelete(musicId);
    }
  }, [actionConfirm]);

  useEffect(() => {
    if(result.valid){
      history.push('/');
    }else{
      if(result.action != ""){
        alert("削除できませんでした");
      }
    }
  }, [result]);

  return(
    <div className="flex flex-col items-center text-shadow-black">
      <p className="text-lg"> あなたが投稿した音楽</p>
      <div className="flex justify-between w-full">
        <button onClick={handleClickEdit} className="border-b hover:text-yellow-300">音楽情報を編集する</button>
        <button onClick={handleClickDelete} className="border-b hover:text-yellow-300">音楽を削除する</button>
      </div>
      {actionConfirm.modalShow && <ConfirmAction setConfirmAction={setConfirmAction} message={confirmMessage} />}
      { loading && <LoadingNow />}
    </div>
  );
};