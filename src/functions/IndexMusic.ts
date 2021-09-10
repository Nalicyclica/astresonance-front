import { useState } from "react";
import axios from "axios";
import { BasicAuthToken, getBasicAuth } from "./Auth";
import { selectIds } from "../render/Home";
import { getGenreName, getCategoryName } from "./MusicGenre";
import { defaultResponse, errorResponse, loadingResponse, ResponseInfo, successResponse } from "./AxiosTypes";

export type MusicInfo = {
  id: number
  genre_id: number
  genreName: string
  category_id: number
  categoryName: string 
  music_url: string
  user_id: number
  nickname: string
  icon_color: string
};

type MusicItemsInfo = ResponseInfo & {
  musicItems: MusicInfo[]
};

const defaultMusicItemsInfo: MusicItemsInfo = {
  ...defaultResponse,
  musicItems: []
};

export const useMusicIndex = () => {
  const [musicItems, setMusicItems] = useState<MusicItemsInfo>(defaultMusicItemsInfo);

  const musicIndex = async (idParams: selectIds) => {
    setMusicItems(prev => prev = {...prev, ...loadingResponse});
    let params: any = {...idParams};
    let basicAuth: BasicAuthToken = getBasicAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/musics/`
    if(params.genre_id<0){
      delete params.genre_id;
    }
    if(params.category_id<0){
      delete params.category_id;
    }
    try{
      const response = await axios.get(
        url,
        {
          params: params,
          headers: basicAuth
      });
      const musicItemsData: MusicInfo[] = [];
      response.data.map((data: MusicInfo) => {
        data.genreName = getGenreName(data.genre_id);
        data.categoryName = getCategoryName(data.category_id);
        musicItemsData.push(data);
      });
      const musicInfoData: MusicItemsInfo = {
        ...successResponse("requested"),
        musicItems: musicItemsData
      };
      setMusicItems(musicInfoData);
    } catch(errors){
      const musicInfoData: MusicItemsInfo = {
        ...defaultMusicItemsInfo,
        ...errorResponse(errors, "requested")
      };
      setMusicItems(musicInfoData);
    };
  };
  return [musicItems, musicIndex] as const;
};