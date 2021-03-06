import React from "react";
import { Link } from "react-router-dom";
import { CommentInfo } from "../functions/IndexComment";
import CommentDelete from "./CommentDelete";

const CommentList: React.FC<{commentItems: CommentInfo[], currentUserId: number, removeCommentItem: (commentId: number) => void}> = ({commentItems, currentUserId, removeCommentItem})=> {

  return(
    <ul className="overflow-auto p-4 h-72">
      {
        commentItems.map((commentItem) =>
          <li key={commentItem.id} className="flex justify-between items-center bg-gray-800 px-2 py-1 mb-2 w-72 rounded-md shadow-bright text-gray-100">
            <div className="flex flex-col items-start">
              <div className="flex justify-start items-center ml-2 pr-2 hover:text-yellow-400">
                <div style={{backgroundColor: commentItem.icon_color}} className = "w-3 h-3 mr-2 rounded-full shadow-bright"></div>
                <Link to={`/UserShow/${commentItem.user_id}`} className="text-sm text-center">{commentItem.nickname}</Link>
              </div>
              <div>
                <p className ="pl-4">{commentItem.text}</p>
              </div>
            </div>
            { commentItem.user_id == currentUserId && <CommentDelete commentId={commentItem.id} removeCommentItem={removeCommentItem}/>}
          </li>
        )
      }
    </ul>
  );
};

export default CommentList