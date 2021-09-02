import { useState } from "react";
import axios from "axios";
import { AuthHeaders, getAuth } from "./Auth";
import { responseInfo, defaultResponseInfo } from "./DeleteMusic";

export const useCommentDelete = () => {
  const [responseState, setResponseInfo] = useState<responseInfo>(defaultResponseInfo);
  const commentDelete = async (commentId: number) => {
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/comments/${commentId}`
    try {
      const response = await axios.delete(
        url,
        { headers: currentAuth}
      );
      const responseData: responseInfo = {
        valid: true,
        id: commentId,
        errors: {}
      };
      setResponseInfo(responseData);
    } catch (error){
      const responseData: responseInfo = {
        valid: false,
        id: commentId,
        errors: {}
      };
      setResponseInfo(responseData);
    };
  };
  return [responseState, commentDelete] as const;
};