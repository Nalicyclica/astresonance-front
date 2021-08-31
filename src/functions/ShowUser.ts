import { useState } from "react";
import axios from "axios";
import { authToken, getAuth } from "./Auth";
import { MusicInfo } from "./IndexMusic"
import { TitleInfo } from "./ShowTitle"
import { CommentInfo } from "../functions/IndexComment"
import { getGenreName, getCategoryName } from "../functions/MusicGenre"

export type ProfileInfo = {
  nickname: string
  icon_color: string
  introduce: string
};

export type TitledMusicInfo = MusicInfo & {
  title: string
  color: string
};

export type PostedTitleInfo = Omit<TitleInfo, 'nickname' | 'icon_color' >


export type TitleCommentInfo = CommentInfo & {
  title: TitleInfo
};

type UserShowItemInfo = {
  profile: ProfileInfo
  musicItems: TitledMusicInfo[]
  titleItems: PostedTitleInfo[]
  commentItems: TitleCommentInfo[]
  response: {
    valid: boolean
    errors: any
  }
}

const defaultProfileInfo: ProfileInfo = {
  nickname: "",
  icon_color: "",
  introduce: ""
};

const defaultUserShowItemInfo: UserShowItemInfo = {
  profile: defaultProfileInfo,
  musicItems: [],
  titleItems: [],
  commentItems: [],
  response: {
    valid: false,
    errors: {}
  }
};

export const useUserShow = () => {
  const [userShowItem, setUserShowItem] = useState<UserShowItemInfo>(defaultUserShowItemInfo);
  
  
  const userShow = async (userId: string) => {
    const currentAuth: authToken = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/users/${userId}`
    try{  
      const response = await axios.get(url, {headers: currentAuth});
      const profileData: ProfileInfo = {...response.data};
      const titleData: PostedTitleInfo[] = [...response.data.titles];
      const commentData: TitleCommentInfo[] = [...response.data.comments];
      const musicData: TitledMusicInfo[] = [];
      response.data.musics.map((data: TitledMusicInfo) => {
        data.genreName = getGenreName(data.genre_id);
        data.categoryName = getCategoryName(data.category_id);
        musicData.push(data);
      });
      const userShowData: UserShowItemInfo = {
        profile: profileData,
        musicItems: musicData,
        titleItems: titleData,
        commentItems: commentData,
        response: {
          valid: true,
          errors: {}
        }
      };
      setUserShowItem(userShowData);
    }catch (errors) {
      const userShowData: UserShowItemInfo = {
        ...defaultUserShowItemInfo,
        response: {
          valid: false,
          errors: {errors}
        }
      };
      setUserShowItem(userShowData);
    }
  };
  return [userShowItem, userShow] as const;
};