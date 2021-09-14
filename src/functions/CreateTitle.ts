import { useState } from "react";
import axios from "axios";
import { AuthHeaders, getAuth } from "./Auth";
import { TitleInput } from "../render/MusicShowForm";
import { defaultIdResponse, errorResponse, IdResponseInfo, loadingResponse, successResponse } from "./AxiosTypes";

export const useTitleCreate = () => {
  const [responseState, setResponseInfo] = useState<IdResponseInfo>(defaultIdResponse);

  const titleCreate = async (musicId: string, inputInfo: TitleInput) => {
    setResponseInfo(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/musics/${musicId}/titles`
    try {
      const response = await axios.post(
        url,
        {title: inputInfo},
        {headers: currentAuth}
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
  return [responseState, titleCreate] as const;
};