import React, {useEffect, useState} from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useCommentDelete } from "../functions/DeleteComment";
import ConfirmAction, { ConfirmActionInfo, defaultConfirmAction } from "./ConfirmAction";


const CommentDelete: React.FC<{commentId: number, removeCommentItem: (commentId: number)=>void}> = ({commentId, removeCommentItem}) => {
  const [deleteResponse, commentDelete] = useCommentDelete();
  const [actionConfirm, setConfirmAction] = useState(defaultConfirmAction);
  const confirmMessage: string = "コメントを削除";
  
  const handleClickDelete = () => {
    const confirmShowData: ConfirmActionInfo = {
      modalShow: true,
      response: false
    };
    setConfirmAction(confirmShowData);
  };

  useEffect(() => {
    if(actionConfirm.response){
      commentDelete(commentId);
    }
  }, [actionConfirm]);

  useEffect(() => {
    if(deleteResponse.valid){
      removeCommentItem(commentId);
    }else{
      if(deleteResponse.id > 0){
        alert("削除できませんでした");
      }
    }
  }, [deleteResponse]);

  return(
    <div className="mx-4">
      <button onClick={handleClickDelete}>
        <BsFillTrashFill size={20} className="hover:text-yellow-400"/>
      </button>
      {actionConfirm.modalShow && <ConfirmAction setConfirmAction={setConfirmAction} message={confirmMessage} />}
    </div>
  );
};

export default CommentDelete