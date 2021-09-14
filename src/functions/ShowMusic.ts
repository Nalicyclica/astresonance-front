import { useState } from "react";
import axios from "axios";
import { AuthHeaders, getAuth } from "./Auth";
import { getGenreName, getCategoryName } from "./MusicGenre";
import { MusicInfo } from "./IndexMusic";
import {defaultTitleInfo, TitleInfo} from "./ShowTitle"
import { defaultResponse, errorResponse, loadingResponse, ResponseInfo, successResponse } from "./AxiosTypes";

export type UserTitleInfo = {
  titleData: TitleInfo
  isTitled: boolean
};

type MusicShowInfo = ResponseInfo & {
  musicItem: MusicInfo
  titleItems: TitleInfo[]
  userTitle: UserTitleInfo
};

export const defaultUserTitleInfo: UserTitleInfo = {
  titleData: defaultTitleInfo,
  isTitled: false
};

export const defaultMusicInfo: MusicInfo = {
  id: -1,
  genre_id: -1,
  genreName: "",
  category_id: -1,
  categoryName: "", 
  music_url: "",
  user_id: -1,
  nickname: "",
  icon_color: "",
};

const defaultMusicShowInfo: MusicShowInfo = {
  ...defaultResponse,
  musicItem: defaultMusicInfo,
  titleItems: [],
  userTitle: defaultUserTitleInfo
};

export const useMusicShow = () => {
  const [musicShowItem, setMusicShow] = useState<MusicShowInfo>(defaultMusicShowInfo);

  const musicShow = async (musicId: string) => {
    setMusicShow(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/musics/${musicId}`
    try{
      const response = await axios.get(url,{headers: currentAuth});
      const data = response.data;
      const musicShowData: MusicShowInfo = {
        ...defaultMusicShowInfo,
        ...successResponse()
      };

      const musicItemData = {
        ...data,
        genreName: getGenreName(data.genre_id),
        categoryName: getCategoryName(data.category_id),
      };
      musicShowData.musicItem = musicItemData;

      if(data.titles){
        musicShowData.titleItems = data.titles;
      }
      if(data.user_title){
        const userTitleData: UserTitleInfo = {
          titleData: {...data.user_title},
          isTitled: true
        }
        musicShowData.userTitle = userTitleData;
      }
      setMusicShow(musicShowData);      
    } catch(errors){
      const musicShowData: MusicShowInfo = {
        ...defaultMusicShowInfo,
        ...errorResponse(errors)
      };
      setMusicShow(musicShowData);
    };
  };
  return [musicShowItem, musicShow] as const;
};