import { useState } from "react";
import axios from "axios";
import { AuthHeaders, getAuth } from "./Auth";
import { responseInfo, defaultResponseInfo } from "./DeleteMusic";
import { selectIds } from "../render/Home";

export const useMusicEdit = () => {
  const [responseState, setResponseInfo] = useState<responseInfo>(defaultResponseInfo);
  const musicEdit = async (musicId: number, selectedIds: selectIds) => {
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/musics/${musicId}`
    try {
      const response = await axios.patch(
        url,
        selectedIds,
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
  return [responseState, musicEdit] as const;
};