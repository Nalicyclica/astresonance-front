import React from "react";
import { useForm } from "react-hook-form";
import { UserInfo } from "../functions/UserInfo";

const CommentCreate: React.FC<{titleId: number, userInfo: UserInfo, commentCreate: (id: number, data: {text: string}, userInfo: UserInfo)=>void}> = ({titleId, userInfo, commentCreate}) => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  
  const onSubmit = (data: {text: string}) => {
    commentCreate(titleId, data, userInfo);
  };

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-4">
    <p className="mb-4 text-shadow-black">タイトルに対してコメントを投稿できます：</p>
    <div className="flex justify-between items-center">
      <input type="text" {...register("text")} className="w-full mr-4 p-2 bg-gray-300 focus:bg-gray-100 focus:outline-none focus:shadow-bright rounded-md text-black"/>
      <input type="submit" value="投稿" className="text-xl px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold" />
    </div>
  </form>
  )
};

export default CommentCreate