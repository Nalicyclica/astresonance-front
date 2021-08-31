import React, {useState, useCallback, useEffect, useRef} from 'react';
import { useForm } from 'react-hook-form';
import {useDropzone} from 'react-dropzone'
import { genreItems, categoryItems } from '../functions/MusicGenre';
import { useHistory } from 'react-router-dom';
import { useMusicCreate } from '../functions/CreateMusic';

export type PostMusicInfo = {
  music: File
  category_id: number
  genre_id: number
};

const emptyFile = new File([],"",{});

const MusicCreate: React.FC = () => {
  const history = useHistory();
  const [responseState, musicCreate] = useMusicCreate();
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
    register("music");
  },[]);

  const onSubmit = (data: PostMusicInfo) => {
    musicCreate(data);
  };
  
  useEffect(() => {
    if(responseState.valid){
      history.push('/');
    }else{
      console.log(responseState.errors.errors);
    }
  }, [responseState]);
  
	return (
    <div className="flex justify-center h-main overflow-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start items-center p-12 w-120 rounded-lg backdrop-filter backdrop-blur-md">
        <h1 className="m-4 text-xl">音楽を投稿してください</h1>
        {responseState.errors.errors && <p className="text-red-600">音楽を投稿できませんでした</p>}
        <div className="mb-4">
          <div {...getRootProps()} className="flex justify-center items-center w-96 h-48 bg-gray-300 text-black rounded-md shadow-bright hover:shadow-gold hover:bg-gray-100">
          <input {...getInputProps()} />
          { selectedMusic.name == ""? <p>Drag 'n' drop a mp3/ogg files</p> : <p>{selectedMusic.name}を投稿</p>}
          </div>
        </div>
        <label className="my-2">
          <p>曲/歌:</p>
          <select {...register("category_id")} className="my-2 p-2 bg-gray-900 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
            <option hidden>音楽の種類を選択してください</option>
            {categoryItems}
          </select>
        </label>
        <label className="my-2">
          <p>ジャンル:</p>
          <select {...register("genre_id")} className="my-2 p-2  bg-gray-900 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
            <option hidden>音楽の種類を選択してください</option>
            {genreItems}
          </select>
        </label>
        <input type="submit" value="音楽を投稿する" className="text-xl my-4 px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold"/>
      </form>
    </div>
	);
}

export default MusicCreate