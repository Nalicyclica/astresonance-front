import React, { useContext, useEffect } from "react";
import { useFollowIndex } from "../functions/IndexFollow";
import { CurrentUser } from "../functions/UserInfo";
import FollowCreateDelete from "./FollowCreateDelete ";
import LoadingNow from "./LoadingNow";

const FollowIndex: React.FC<{currentUserId: string}> = ({currentUserId}) => {
  const [{followItem, result: followResult, loading: followLoading}, setFollow] = useFollowIndex();
  const {userInfo} = useContext(CurrentUser);

  useEffect(()=>{
    setFollow.followIndex(currentUserId)
  }, []);

  useEffect(()=>{
    if(!followResult.valid){
      switch(followResult.action){
        case "create":
          alert(`フォローできませんでした${followResult.errors.response.data.errors}`);
          break;
        case "delete":
          alert(`フォロー解除できませんでした${followResult.errors.response.data.errors}`);
          break;
        default:
          break;
      }
    }
  }, [followResult])

  return(
    <div className="flex justify-center items-center text-shadow-black">
      <div className="mr-4 my-3">
        <span className="">フォロワー数：</span>
        <span className="">{followItem.followers}</span>
      </div>
      <div className="mr-8 my-3">
        <span className="">フォロー数：</span>
        <span className="">{followItem.followings}</span>
      </div>
      { userInfo.id != Number(currentUserId) &&
        <FollowCreateDelete userId = {currentUserId} isFollowing={followItem.isFollowing} setFollow={setFollow} />
      }
      { followLoading && <LoadingNow /> }
    </div>
  );
};

export default FollowIndex