import React, {useEffect, useState} from "react";
import { FollowItemInfo, useFollowIndex } from "../functions/IndexFollow";
import ConfirmAction, { beforeConfirmAction, defaultConfirmAction } from "./ConfirmAction";

type SetFollow = ReturnType<typeof useFollowIndex>[1]

const FollowCreateDelete: React.FC<{userId: string, isFollowing: boolean, setFollow: SetFollow}> = ({userId, isFollowing, setFollow}) => {
  const [actionConfirm, setConfirmAction] = useState(defaultConfirmAction)
  const confirmMessage: string = "フォローを解除";

  const createClickHandler = () => {
    setFollow.followCreate(userId);
  };
  const deleteClickHandler = () => {
    setConfirmAction(beforeConfirmAction);
  };
  
  useEffect(() => {
    if(actionConfirm.response){
      setFollow.followDelete(userId);
    }
  },[actionConfirm]);

  return(
    <div>
      {isFollowing? 
        <button  onClick={deleteClickHandler} className="my-2 px-5 py-2 bg-gray-600 rounded-md shadow-bright hover:shadow-gold">
          フォロー中
        </button> : 
        <button  onClick={createClickHandler} className="my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold">
          フォローする
        </button>
      }
      {actionConfirm.modalShow && <ConfirmAction setConfirmAction={setConfirmAction} message={confirmMessage} />}
    </div>
  );
};

export default FollowCreateDelete