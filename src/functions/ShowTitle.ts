import { useState } from "react";
import axios from "axios";
import { authToken, getAuth } from "./Auth";

export type TitleInfo = {
  id: number
  title: string
  color: string
  user_id: number
  music_id: number
  nickname: string
  icon_color: string
};

type TitleItemInfo = {
  titleItem: TitleInfo
  titleResponse: {
    valid: boolean
    errors: any
  }
};

export const  defaultTitleInfo: TitleInfo = {
  id: 0,
  title: "",
  color: "",
  user_id: 0,
  music_id: 0,
  nickname: "",
  icon_color: ""
};

const defaultTitleItemInfo: TitleItemInfo = {
  titleItem: defaultTitleInfo,
  titleResponse: {
    valid: false,
    errors: {}
  }
};

export const useTitleShow = () => {
  const [titleItem, setTitleShowItem] = useState<TitleItemInfo>(defaultTitleItemInfo);

  const titleShow = async (titleId: number) => {
    const currentAuth: authToken = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/titles/${titleId}`
    try{
      const response = await axios.get(url, {headers: currentAuth});
      const titleData: TitleInfo = {...response.data};
      const responseData: TitleItemInfo = {
        titleItem: titleData,
        titleResponse: {
          valid: true,
          errors: {}
        }
      };
      setTitleShowItem(responseData);
    } catch(errors){
      const responseData: TitleItemInfo = {
        ...defaultTitleItemInfo,
        titleResponse: {
          valid: false,
          errors: {errors}
        }
      };
      setTitleShowItem(responseData);
    };
  };
  
  return [titleItem, titleShow] as const;
};