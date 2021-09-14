import { useState } from "react";
import axios from "axios";
import { AuthHeaders, getAuth } from "./Auth";
import { defaultResponse, errorResponse, loadingResponse, ResponseInfo, successResponse } from "./AxiosTypes";

export type TitleInfo = {
  id: number
  title: string
  color: string
  user_id: number
  music_id: number
  nickname: string
  icon_color: string
};

type TitleItemInfo = ResponseInfo & {
  titleItem: TitleInfo
};

export const  defaultTitleInfo: TitleInfo = {
  id: -1,
  title: "",
  color: "",
  user_id: -1,
  music_id: -1,
  nickname: "",
  icon_color: ""
};

const defaultTitleItemInfo: TitleItemInfo = {
  ...defaultResponse,
  titleItem: defaultTitleInfo,
};

export const useTitleShow = () => {
  const [titleItem, setTitleShowItem] = useState<TitleItemInfo>(defaultTitleItemInfo);

  const titleShow = async (titleId: number) => {
    setTitleShowItem(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/titles/${titleId}`
    try{
      const response = await axios.get(url, {headers: currentAuth});
      const titleData: TitleInfo = {...response.data};
      const responseData: TitleItemInfo = {
        ...successResponse(),
        titleItem: titleData
      };
      setTitleShowItem(responseData);
    } catch(errors){
      const responseData: TitleItemInfo = {
        ...defaultTitleItemInfo,
        ...errorResponse(errors)
      };
      setTitleShowItem(responseData);
    };
  };
  
  return [titleItem, titleShow] as const;
};