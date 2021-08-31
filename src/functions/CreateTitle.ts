import { useState } from "react";
import axios from "axios";
import { authToken, getAuth } from "./Auth";
import { responseInfo, defaultResponseInfo } from "./DeleteMusic";
import { TitleInput } from "../render/MusicShowForm";

export const useTitleCreate = () => {
  const [responseState, setResponseInfo] = useState<responseInfo>(defaultResponseInfo);

  const titleCreate = async (musicId: string, inputInfo: TitleInput) => {
    const currentAuth: authToken = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/musics/${musicId}/titles`
    try {
      const response = await axios.post(
        url,
        {title: inputInfo},
        {headers: currentAuth}
      );
      const responseData: responseInfo = {
        valid: true,
        id: response.data.id,
        errors: {}
      };
      setResponseInfo(responseData);
    } catch (errors) {
      const responseData: responseInfo = {
        valid: false,
        id: -1,
        errors: {errors}
      };
      setResponseInfo(responseData);
    };
  };
  return [responseState, titleCreate] as const;
};