import React, {useState, useCallback, useEffect, useRef} from 'react';
import { useForm } from 'react-hook-form';
import {useDropzone} from 'react-dropzone'
import { genreItems, categoryItems } from '../functions/MusicGenre';
import { useHistory } from 'react-router-dom';
import { useMusicCreate } from '../functions/CreateMusic';
import { useContext } from 'react';
import { CurrentUser } from '../functions/UserInfo';
import { requiredErrorMessage } from '../functions/FormFunc';
import LoadingNow from './LoadingNow';

export type PostMusicInfo = {
  music: File
  category_id: number
  genre_id: number
};

const emptyFile = new File([],"",{});

const MusicCreate: React.FC = () => {
  const [{id, loading, result}, musicCreate] = useMusicCreate();
  const {userInfo} = useContext(CurrentUser);
  const history = useHistory();
  const {register, handleSubmit, watch, formState: {errors}, setValue} = useForm();
  const [selectedMusic, setSelectedMusic] = useState<File>(emptyFile);

  const onDropAccepted = useCallback((acceptedFiles) => {
    setValue("music", acceptedFiles[0]);
    setSelectedMusic(acceptedFiles[0]);
  }, []);

  const onDropRejected = useCallback((files)=>{
    alert('音楽ファイルをアップロードしてください');
  },[]);

  const {acceptedFiles, getRootProps, getInputProps, isDragAccept} = useDropzone({
    accept: ['audio/*'],
    onDropAccepted,
    onDropRejected,
  });

  useEffect(()=>{
    if(!userInfo.isSignIn){
      history.push('/');
    }else{
      register("music");
    }
  },[]);

  const onSubmit = (data: PostMusicInfo) => {
    musicCreate(data);
  };
  
  useEffect(() => {
    if(result.valid){
      history.push('/');
    }else{
      if(result.action != ""){
        alert("音楽を投稿できませんでした");
      }
    }
  }, [result]);
  
	return (
    <div className="flex justify-center backdrop-filter backdrop-blur">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start items-center p-6 w-120 mb-12">
        <h1 className="text-2xl mt-8 mb-2 px-4 text-yellow-400 border-b border-yellow-400">音楽を投稿してください</h1>
        {result.errors && <p className="text-red-600">音楽を投稿できませんでした</p>}
        <div className="mt-6 mb-4">
          <div {...getRootProps()} className="flex justify-center items-center w-96 h-48 bg-gray-300 text-black rounded-md shadow-bright hover:shadow-gold hover:bg-gray-100">
          <input {...getInputProps()} />
          { selectedMusic.name == ""? <p>Drag 'n' drop a mp3/ogg files</p> : <p>{selectedMusic.name}を投稿</p>}
          </div>
        </div>
        <label className="my-2">
          <p className="text-shadow-black">曲/歌:</p>
          <select {...register("category_id",{ validate: (value) => value > 0 || requiredErrorMessage})}
            className="my-2 p-2 border-b border-gray-100 focus:outline-none hover:bg-gray-700 bg-transparent backdrop-filter backdrop-blur-lg text-gray-100">
            <option value={-1} hidden>音楽の種類を選択してください</option>
            {categoryItems}
          </select>
          {errors.category_id && <p className="text-red-600 text-sm">{errors.category_id.message}</p>}
        </label>
        <label className="my-2">
          <p className="text-shadow-black">ジャンル:</p>
          <select {...register("genre_id", { validate: (value) => value > 0 || requiredErrorMessage})}
            className="my-2 p-2 border-b border-gray-100 focus:outline-none hover:bg-gray-700 bg-transparent backdrop-filter backdrop-blur-lg text-gray-100">
            <option hidden>音楽の種類を選択してください</option>
            {genreItems}
          </select>
          {errors.genre_id && <p className="text-red-600 text-sm">{errors.genre_id.message}</p>}
        </label>
        <input type="submit" value="音楽を投稿する" className="text-xl my-4 px-5 py-3 bg-gray-900 rounded-md text-yellow-400 shadow-bright hover:shadow-gold"/>
      </form>
      { loading && <LoadingNow />}
    </div>
	);
}

export default MusicCreate