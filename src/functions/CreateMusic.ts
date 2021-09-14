import { useState } from "react";
import axios from "axios";
import { AuthHeaders, getAuth } from "./Auth";
import { PostMusicInfo } from "../render/MusicCreate"
import { defaultIdResponse, errorResponse, IdResponseInfo, loadingResponse, successResponse } from "./AxiosTypes";

export const useMusicCreate = () => {
  const [responseState, setResponseInfo] = useState<IdResponseInfo>(defaultIdResponse);

  const musicCreate = async (postMusic: PostMusicInfo) => {
    setResponseInfo(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders & {"Content-Type": string} = {...getAuth(), "Content-Type": "multipart/form-data"};
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
      const responseData: IdResponseInfo = {
        ...successResponse(),
        id: response.data.id
      };
      setResponseInfo(responseData);
    } catch(errors){
      const responseData: IdResponseInfo = {
        ...errorResponse(errors),
        id: -1
      };
      setResponseInfo(responseData);
    };
  };
  return [responseState, musicCreate] as const;
};