import axios from "axios";
import { useState } from "react";
import { AuthHeaders, getAuth } from "./Auth";
import { defaultIdResponse, errorResponse, loadingResponse, ResponseInfo, successResponse } from "./AxiosTypes";

export type FollowInfo = {
  isFollowing: boolean
  followings: number
  followers: number
};

export type FollowItemInfo = ResponseInfo & {
  followItem: FollowInfo
};

const defaultFollow: FollowInfo = {
  isFollowing: false,
  followings: -1,
  followers: -1
};

const defaultFollowItem: FollowItemInfo = {
  ...defaultIdResponse,
  followItem: defaultFollow
};

export const useFollowIndex = () => {
  const [followItem, setFollow] = useState(defaultFollowItem)

  const followIndex = async (userId: string) => {
    setFollow(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/users/${userId}/follows`
    try{
      const response = await axios.get(url, {headers: currentAuth});
      const followData: FollowInfo = {...response.data};
      const followItemData: FollowItemInfo = {
        ...successResponse("index"),
        followItem: followData
      };
      setFollow(followItemData);
    } catch(errors){
      const responseData: FollowItemInfo = {
        ...defaultFollowItem,
        ...errorResponse(errors, "index")
      };
      setFollow(responseData);
    };
  };

  return [followItem, followIndex] as const;
}