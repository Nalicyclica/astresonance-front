import axios from "axios";
import { useState } from "react";
import { AuthHeaders, getAuth } from "./Auth";
import { defaultResponse, errorResponse, loadingResponse, ResponseInfo, successResponse } from "./AxiosTypes";

type FollowUserInfo = {
  id: number
  nickname: string
  icon_color: string
};

type FollowUserListInfo = ResponseInfo & {
  followUserItems: FollowUserInfo[]
};

const defaultFollowUserList: FollowUserListInfo = {
  ...defaultResponse,
  followUserItems: []
};

export const useFollowList = () => {
  const [followItems, setFollows] = useState(defaultFollowUserList);

  const followersList = async (userId: string) => {
    setFollows(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/users/${userId}/followers`
    try{
      const response = await axios.get(url, {headers: currentAuth})
      const followUserData: FollowUserInfo[] = [...response.data];
      const responseData: FollowUserListInfo = {
        ...successResponse("followers"),
        followUserItems: followUserData
      };
      setFollows(responseData);
    }catch(errors){
      const responseData: FollowUserListInfo = {
        ...defaultFollowUserList,
        ...errorResponse(errors, "followers")
      };
      setFollows(responseData);
    };
  };

  const followingsList = async (userId: string) => {
    setFollows(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/users/${userId}/followings`
    try{
      const response = await axios.get(url, {headers: currentAuth})
      const followUserData: FollowUserInfo[] = [...response.data];
      const responseData: FollowUserListInfo = {
        ...successResponse("followings"),
        followUserItems: followUserData
      };
      setFollows(responseData);
    }catch(errors){
      const responseData: FollowUserListInfo = {
        ...defaultFollowUserList,
        ...errorResponse(errors, "followings")
      };
      setFollows(responseData);
    };
  };
  return [followItems, {followersList, followingsList}] as const;
};