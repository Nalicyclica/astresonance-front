import React, {useEffect} from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMusicEdit } from "../functions/EditMusic";
import { selectIds } from "./Home";
import { MusicInfo } from "../functions/IndexMusic";
import { genreItems, categoryItems } from "../functions/MusicGenre";

const MusicEdit: React.FC<{musicItem: MusicInfo, setEditShow: (setShow: boolean)=>void}> = ({musicItem, setEditShow}) => {
  const [editResponse, musicEdit] = useMusicEdit();
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const popUpRef: any = useRef();
  const formRef: any = useRef();
  
  const onSubmit = (data: selectIds) => {
    musicEdit(musicItem.id, data);
  };

  const handleOutsideClick = (event:any) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      console.log("no")
      setEditShow(false);
    }
  };

  useEffect(() => {
    if(editResponse.valid){
      alert("音楽情報を変更しました");
      window.location.reload();
    }else{
      if(editResponse.id > 0){
        alert("変更できませんでした");
      }
    }
  }, [editResponse]);

  useEffect(() => {
    popUpRef.current.addEventListener("mousedown", handleOutsideClick);
  }, []);

	return (
    <div ref={popUpRef} className="absolute top-20 h-home w-screen flex justify-center items-center backdrop-filter backdrop-blur-md">
      <div  ref={formRef} className="w-96 flex flex-col items-center bg-gray-800 text-gray-100 rounded-xl p-10">
        <h1 className="w-72 text-2xl mb-6 px-4 text-yellow-400 text-center border-b border-yellow-400">音楽情報の変更</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start items-center w-48">
          <label className="w-full my-2">
            <p className="w-full mb-1">ジャンル:</p>
            <select {...register("genre_id")} defaultValue={musicItem.genre_id} className="w-full bg-gray-800 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
              {genreItems}
            </select>
          </label>
          <label className="w-full my-2">
            <p className="w-full mb-1">曲/歌:</p>
            <select {...register("category_id")} defaultValue={musicItem.category_id} className="w-full bg-gray-800 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
              {categoryItems}
            </select>
          </label>
          <input type="submit" value="変更" className="text-xl mt-8 px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold"/>
        </form>
      </div>
    </div>
	);
};

export default MusicEdit