import { useState } from "react";
import axios from "axios";
import { authToken, getAuth } from "./Auth";
import { responseInfo, defaultResponseInfo } from "./DeleteMusic";
import { selectIds } from "../render/Home";
import { getGenreName, getCategoryName } from "./MusicGenre";

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

type MusicItemsInfo = {
  musicItems: MusicInfo[]
  valid: boolean
  errors: any
};

const defaultMusicItemsInfo: MusicItemsInfo = {
  musicItems: [],
  valid: false,
  errors: {}
};

export const useMusicIndex = () => {
  const [musicItems, setMusicItems] = useState<MusicItemsInfo>(defaultMusicItemsInfo);

  const musicIndex = async (idParams: selectIds) => {
    let params: any = {...idParams};
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/musics/`
    if(params.genre_id<0){
      delete params.genre_id;
    }
    if(params.category_id<0){
      delete params.category_id;
    }
    try{
      const response = await axios.get(url,{params: params});
      const musicItemsData: MusicInfo[] = [];
      response.data.map((data: MusicInfo) => {
        data.genreName = getGenreName(data.genre_id);
        data.categoryName = getCategoryName(data.category_id);
        musicItemsData.push(data);
      });
      const musicInfoData = {
        musicItems: musicItemsData,
        valid: true,
        errors: {}
      };
      setMusicItems(musicInfoData);
    } catch(errors){
      const musicInfoData = {
        ...defaultMusicItemsInfo,
        valid: false,
        errors: {errors: errors}
      };
      setMusicItems(musicInfoData);
    };
  };
  return [musicItems, musicIndex] as const;
};