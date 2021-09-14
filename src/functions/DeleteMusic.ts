import { useState } from "react";
import axios from "axios";
import { AuthHeaders, getAuth } from "./Auth";
import { defaultIdResponse, errorResponse, IdResponseInfo, loadingResponse, successResponse } from "./AxiosTypes";

export const useMusicDelete = () => {
  const [responseState, setResponseInfo] = useState<IdResponseInfo>(defaultIdResponse);
  const musicDelete = async (musicId: number) => {
    setResponseInfo(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/musics/${musicId}`
    try {
      const response = await axios.delete(
        url,
        { headers: currentAuth}
      );
      const responseData: IdResponseInfo = {
        ...successResponse(),
        id: response.data.id
      };
      setResponseInfo(responseData);
    } catch (errors) {
      const responseData: IdResponseInfo = {
        ...errorResponse(errors),
        id: -1
      };
      setResponseInfo(responseData);
    };
  };
  return [responseState, musicDelete] as const;
};