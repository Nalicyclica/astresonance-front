import React, { useContext, useEffect, useState } from "react";
import { useFollowIndex } from "../functions/IndexFollow";
import { CurrentUser } from "../functions/UserInfo";
import FollowCreateDelete from "./FollowCreateDelete ";
import FollowList from "./FollowList";
import LoadingNow from "./LoadingNow";

export type ListShow = {
  showFlag: boolean
  listType: string
};

export const defaultListShow: ListShow = {
  showFlag: false,
  listType: ""
};

const showListWithType = (type: string) => {
  const listShow: ListShow = {
    showFlag: true,
    listType: type
  };
  return listShow;
};

const FollowIndex: React.FC<{currentUserId: string}> = ({currentUserId}) => {
  const [{followItem, result: followResult, loading: followLoading}, setFollow] = useFollowIndex();
  const [listShow, setListShow] = useState(defaultListShow);
  const {userInfo} = useContext(CurrentUser);

  useEffect(()=>{
    setFollow.followIndex(currentUserId);
    setListShow(defaultListShow);
  }, [currentUserId]);

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
  }, [followResult]);

  const followerShowHandler = () => {
    setListShow(showListWithType("フォロワーリスト"));
  };

  const followingShowHandler = () => {
    setListShow(showListWithType("フォローリスト"));
  };

  return(
    <div className="flex justify-center items-center text-shadow-black">
      <button onClick={followerShowHandler} className="mr-4 my-3 hover:text-gray-100">
        <span className="">フォロワー数：</span>
        <span className="">{followItem.followers}</span>
      </button>
      <button onClick={followingShowHandler} className="mr-8 my-3 hover:text-gray-100">
        <span className="">フォロー数：</span>
        <span className="">{followItem.followings}</span>
      </button>
      { userInfo.id != Number(currentUserId) &&
        <FollowCreateDelete userId = {currentUserId} isFollowing={followItem.isFollowing} setFollow={setFollow} />
      }
      { listShow.showFlag && <FollowList userId={currentUserId} listType={listShow.listType} setListShow={setListShow} /> }
      { followLoading && <LoadingNow /> }
    </div>
  );
};

export default FollowIndex