import { useState } from "react";
import axios from "axios";
import { authToken, getAuth } from "./Auth";
import { responseInfo, defaultResponseInfo } from "./DeleteMusic";
import { PostMusicInfo } from "../render/MusicCreate"

export const useMusicCreate = () => {
  const [responseState, setResponseInfo] = useState<responseInfo>(defaultResponseInfo);

  const musicCreate = async (postMusic: PostMusicInfo) => {
    const currentAuth: authToken & {"Content-Type": string} = {...getAuth(), "Content-Type": "multipart/form-data"};
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/musics`
    const formData = new FormData();
    formData.append("music", postMusic.music);
    formData.append("category_id", String(postMusic.category_id));
    formData.append("genre_id", String(postMusic.genre_id));
    try{
      const response = await axios.post(
        url,
        formData,
        {headers: currentAuth}
      );
      const responseData: responseInfo = {
        valid: true,
        id: response.data.id,
        errors: {}
      };
      setResponseInfo(responseData);
    } catch(errors){
      const responseData: responseInfo = {
        valid: false,
        id: -1,
        errors: {errors}
      };
      setResponseInfo(responseData);
    };
  };
  return [responseState, musicCreate] as const;
};