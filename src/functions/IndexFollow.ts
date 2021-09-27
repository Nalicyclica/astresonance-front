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
      const responseData: FollowItemInfo = {
        ...successResponse("index"),
        followItem: followData
      };
      setFollow(responseData);
    } catch(errors){
      const responseData: FollowItemInfo = {
        ...defaultFollowItem,
        ...errorResponse(errors, "index")
      };
      setFollow(responseData);
    };
  };
  
  const followCreate = async (userId: string) => {
    setFollow(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/users/${userId}/follows`
    try{
      const response = await axios.post(url,{},{headers: currentAuth});
      const responseData: FollowItemInfo = {
        ...successResponse("create"),
        followItem: {
          ...followItem.followItem,
          followers: followItem.followItem.followers + 1,
          isFollowing: true
        }
      };
      setFollow(responseData)
    }catch(errors){
      setFollow(prev => prev = {...prev, ...errorResponse(errors, "create")});
    };
  };
  
  const followDelete = async (userId: string) => {
    setFollow(prev => prev = {...prev, ...loadingResponse});
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/users/${userId}/follows`
    try{
      const response = await axios.delete(url,{headers: currentAuth});
      const responseData: FollowItemInfo = {
        ...successResponse("delete"),
        followItem: {
          ...followItem.followItem,
          followers: followItem.followItem.followers - 1,
          isFollowing: false
        }
      };
      setFollow(responseData)
    }catch(errors){
      setFollow(prev => prev = {...prev, ...errorResponse(errors, "delete")});
    };
  };
  
  return [followItem, {followIndex, followCreate, followDelete}] as const;
}