import React, {useEffect} from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useMusicEdit } from "../functions/EditMusic";
import { genreItems, categoryItems, selectIds, musicInfo } from "./Home";
import { currentShow, defaultShow } from "./MusicShow";

const MusicEdit: React.FC<{musicItem: musicInfo, setEditShow: (setShow: boolean)=>void}> = ({musicItem, setEditShow}) => {
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
    <div ref={popUpRef} className="absolute top-20 h-main w-screen flex justify-center items-center backdrop-filter backdrop-blur-md">
      <div  ref={formRef} className="w-96 bg-gray-800 text-gray-100 rounded-md p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col justify-start items-center">
        <h1 className="text-2xl mb-6 px-4 text-yellow-300 border-b border-yellow-300">音楽情報の変更</h1>
        <label className="my-2">
          <p>ジャンル:</p>
          <select {...register("genre_id")} defaultValue={musicItem.genre_id} className="bg-gray-800 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
            {genreItems}
          </select>
        </label>
        <label className="my-2">
          <p>曲/歌:</p>
          <select {...register("category_id")} defaultValue={musicItem.category_id} className="bg-gray-800 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
            {categoryItems}
          </select>
        </label>
        <input type="submit" value="変更" className="text-xl my-4 px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold"/>
      </form>
      </div>
    </div>
	);
};

export default MusicEdit