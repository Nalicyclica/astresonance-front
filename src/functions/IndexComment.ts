import { useState } from "react";
import axios from "axios";
import { AuthHeaders, getAuth } from "./Auth";
import { UserInfo } from "./UserInfo";

export type CommentInfo = {
  id: number
  text: string
  user_id: number
  title_id: number
  nickname: string
  icon_color: string
};

type CommentItemsInfo = {
  commentItems: CommentInfo[]
  commentResponse: {
    valid: boolean
    errors: any
  }
};

export const defaultCommentInfo: CommentInfo = {
  id: -1,
  text: "",
  user_id: -1,
  title_id: -1,
  nickname: "",
  icon_color: ""
};

const defaultCommentItemsInfo: CommentItemsInfo = {
  commentItems: [],
  commentResponse: {
    valid: false,
    errors: []
  }
};

export const useCommentIndex = () => {
  const [commentItems, setCommentItems] = useState<CommentItemsInfo>(defaultCommentItemsInfo);
  
  const commentIndex = async (titleId: number) => {
    const currentAuth: AuthHeaders = getAuth();
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/titles/${titleId}/comments`
    try{
      const response = await axios.get(url, {headers: currentAuth});
      const commentsData: CommentInfo[] = [...response.data];
      const responseData: CommentItemsInfo = {
        commentItems: commentsData,
        commentResponse: {
          valid: true,
          errors: {}
        }
      };
      setCommentItems(responseData);
    } catch(errors){
      const responseData: CommentItemsInfo = {
        ...defaultCommentItemsInfo,
        commentResponse: {
          valid: false,
          errors: {errors}
        }
      };
      setCommentItems(responseData);
    };
  };

  const commentCreate = async (titleId: number, comment: {text: string}, userInfo: UserInfo) => {
    const url: string = `${process.env.REACT_APP_SERVER_DOMAIN}/titles/${titleId}/comments`;
    const currentAuth: AuthHeaders = getAuth();
    try {
      const response = await axios.post(
        url,
        comment,
        { headers: currentAuth}
        );
        const addComment: CommentInfo = {...response.data};
        addComment.icon_color = userInfo.icon_color;
        addComment.nickname = userInfo.nickname;
        setCommentItems(prev => prev = {...prev, commentItems: [...prev.commentItems, addComment]});
      } catch (errors){
        const errorResponse = {
          valid: false,
          errors: {errors}
        };
        setCommentItems(prev => prev = {...prev, commentResponse: errorResponse});
      };
    };

  const removeCommentItem = (commentId: number) => {
    const otherComments = commentItems.commentItems.filter(commentItem => commentItem.id != commentId);
    setCommentItems(prev => prev = {...prev, commentItems: otherComments});
  };

  
  return [commentItems, {commentIndex, commentCreate, removeCommentItem}] as const;
};