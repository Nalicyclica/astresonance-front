import { useState } from "react";
import axios from "axios";
import { AuthHeaders, getAuth } from "./Auth";
import { responseInfo, defaultResponseInfo } from "./DeleteMusic";

export const useTitleDelete = () => {
  const [responseState, setResponseInfo] = useState<responseInfo>(defaultResponseInfo);
  const titleDelete = async (titleId: number) => {
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/titles/${titleId}`
    try {
      const response = await axios.delete(
        url,
        { headers: currentAuth}
      );
      const responseData: responseInfo = {
        valid: true,
        id: titleId,
        errors: {}
      };
      setResponseInfo(responseData);
    } catch (error){
      const responseData: responseInfo = {
        valid: false,
        id: titleId,
        errors: {}
      };
      setResponseInfo(responseData);
    };
  };
  return [responseState, titleDelete] as const;
};