import { useState } from "react";
import axios from "axios";
import { authToken, getAuth } from "./Auth";

export type responseInfo = {
  valid: boolean
  id: number
  errors: any
};

export const defaultResponseInfo: responseInfo = {
  valid: false,
  id: -1,
  errors: {}
};

export const useMusicDelete = () => {
  const [responseState, setResponseInfo] = useState<responseInfo>(defaultResponseInfo);
  const musicDelete = async (musicId: number) => {
    const currentAuth: authToken = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/musics/${musicId}`
    try {
      const response = await axios.delete(
        url,
        { headers: currentAuth}
      );
      const responseData: responseInfo = {
        valid: true,
        id: musicId,
        errors: {}
      };
      setResponseInfo(responseData);
    } catch (error){
      const responseData: responseInfo = {
        valid: false,
        id: musicId,
        errors: {}
      };
      setResponseInfo(responseData);
    };
  };
  return [responseState, musicDelete] as const;
};