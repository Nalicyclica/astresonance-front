import React, {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {useDropzone} from 'react-dropzone'
import { genreItems, categoryItems } from './Home';
import { authToken, getAuth } from '../functions/Auth';
import { useHistory } from 'react-router-dom';

type postMusicInfo = {
  music: File
  category_id: number
  genre_id: number
}

const emptyFile = new File([],"",{});

const PostMusic: React.FC = () => {
  const history = useHistory();
  const [responseErrors, setErrors] = useState<object>({});
  const [selectedMusic, setSelectedMusic] = useState<File>(emptyFile);
  const {register, handleSubmit, watch, formState: {errors}, setValue} = useForm();

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

  const postMusic = async (postMusic: postMusicInfo) => {
    const currentAuth: any =  getAuth();
    currentAuth["Content-Type"] = "multipart/form-data";
    const formData = new FormData();
    formData.append("music", postMusic.music);
    formData.append("category_id", String(postMusic.category_id));
    formData.append("genre_id", String(postMusic.genre_id));
    try{
      const response = await axios.post("http://localhost:3000/musics",
      formData,
      {headers: currentAuth});
      console.log("successed!");
    } catch(errors){
      console.log("error!")
    };
  };
  const onSubmit = (data: postMusicInfo) => {
    setErrors({});
    postMusic(data);
    if(true){
      history.push('/');
    }else{
      console.log(responseErrors);
    }
  };

	return (
    <div className="flex-grow bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start items-center">
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

export default PostMusic