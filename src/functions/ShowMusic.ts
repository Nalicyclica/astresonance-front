import { useState } from "react";
import axios from "axios";
import { AuthHeaders, getAuth } from "./Auth";
import { getGenreName, getCategoryName } from "./MusicGenre";
import { MusicInfo } from "./IndexMusic";
import {TitleInfo} from "./ShowTitle"

type MusicShowInfo = {
  musicItem: MusicInfo
  titleItems: TitleInfo[]
  userTitle: UserTitleInfo
  response: {
    valid: boolean
    errors: any
  }
};

export type UserTitleInfo = {
  titleData: TitleInfo
  isTitled: boolean
};

const  defaultTitleInfo: TitleInfo = {
  id: 0,
  title: "",
  color: "",
  user_id: 0,
  music_id: 0,
  nickname: "",
  icon_color: ""
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

export const defaultUserTitleInfo: UserTitleInfo = {
  titleData: defaultTitleInfo,
  isTitled: false
};

const defaultMusicShowInfo: MusicShowInfo = {
  musicItem: defaultMusicInfo,
  titleItems: [],
  userTitle: defaultUserTitleInfo,
  response: {
    valid: false,
    errors: {}
  }
};

export const useMusicShow = () => {
  const [musicShowItem, setMusicShow] = useState<MusicShowInfo>(defaultMusicShowInfo);


  const musicShow = async (musicId: string) => {
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/musics/${musicId}`
    try{
      const response = await axios.get(url,{headers: currentAuth});
      const data = response.data;
      const musicShowData: MusicShowInfo = {
        ...defaultMusicShowInfo,
        response:{
          valid: true,
          errors: {}
        }
      };

      const musicItemData = {
        ...data,
        genreName: getGenreName(data.genre_id),
        categoryName: getCategoryName(data.category_id),
      };
      musicShowData.musicItem = musicItemData;

      if(data.titles){
        musicShowData.titleItems = response.data.titles;
      }

      if(response.data.user_title){
        musicShowData.userTitle.titleData = {...response.data.user_title};
        musicShowData.userTitle.isTitled = true;
      }

      setMusicShow(musicShowData);      
    } catch(errors){
      const musicShowData: MusicShowInfo = {
        ...defaultMusicShowInfo,
        response: {
          valid: false,
          errors: {errors: errors}
        }
      };
      setMusicShow(musicShowData);
    };
  };
  return [musicShowItem, musicShow] as const;
};