import React, {useEffect, useState} from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useCommentDelete } from "../functions/DeleteComment";
import ConfirmAction, { ConfirmActionInfo, defaultConfirmAction } from "./ConfirmAction";
import LoadingNow from "./LoadingNow";

const CommentDelete: React.FC<{commentId: number, removeCommentItem: (commentId: number)=>void}> = ({commentId, removeCommentItem}) => {
  const [{id, loading, result}, commentDelete] = useCommentDelete();
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
    if(result.valid){
      removeCommentItem(id);
    }else{
      if(result.action != ""){
        alert("削除できませんでした");
      }
    }
  }, [result]);

  return(
    <div className="mx-4">
      <button onClick={handleClickDelete}>
        <BsFillTrashFill size={20} className="hover:text-yellow-400"/>
      </button>
      {actionConfirm.modalShow && <ConfirmAction setConfirmAction={setConfirmAction} message={confirmMessage} />}
      { loading && <LoadingNow />}
    </div>
  );
};

export default CommentDelete