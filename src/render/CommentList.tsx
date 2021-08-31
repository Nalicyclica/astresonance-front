import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { CommentInfo } from "../functions/IndexComment";
import { useCommentDelete } from "../functions/DeleteComment";


const CommentDelete: React.FC<{commentId: number, removeCommentItem: (commentId: number)=>void}> = ({commentId, removeCommentItem}) => {
  const [deleteResponse, commentDelete] = useCommentDelete();
  
  const handleClickDelete = () => {
    commentDelete(commentId);
  };

  useEffect(() => {
    if(deleteResponse.valid){
      alert("コメントを削除しました");
      removeCommentItem(commentId);
    }else{
      if(deleteResponse.id > 0){
        alert("削除できませんでした");
      }
    }
  }, [deleteResponse]);

  return(
    <button onClick={handleClickDelete} className="mr-4">
      <ImCross size={16} />
    </button>
  );
};

const CommentList: React.FC<{commentItems: CommentInfo[], currentUserId: number, removeCommentItem: (commentId: number) => void}> = ({commentItems, currentUserId, removeCommentItem})=> {

  return(
    <ul className="overflow-auto p-4 h-96">
      {
        commentItems.map((commentItem) =>
          <li key={commentItem.id} className="flex justify-between bg-gray-800 p-1 mb-1 h-12 w-72 rounded-md shadow-bright text-gray-100">
            <div>
              <div className="flex justify-start items-center pl-2">
                <div style={{backgroundColor: commentItem.icon_color}} className = "w-2 h-2 m-1 rounded-full shadow-bright"></div>
                <Link to={`/UserShow/${commentItem.user_id}`} className="text-sm text-center">{commentItem.nickname}</Link>
              </div>
              <div>
                <p className ="w-full pl-4">{commentItem.text}</p>
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