import { useState } from "react";
import axios from "axios";
import { AuthHeaders, getAuth } from "./Auth";
import { defaultIdResponse, errorResponse, IdResponseInfo, loadingResponse, successResponse } from "./AxiosTypes";

export const useTitleDelete = () => {
  const [responseState, setResponseInfo] = useState<IdResponseInfo>(defaultIdResponse);
  const titleDelete = async (titleId: number) => {
    setResponseInfo(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/titles/${titleId}`
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
  return [responseState, titleDelete] as const;
};