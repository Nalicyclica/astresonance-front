import React, { useEffect } from "react";
import { useFollowIndex } from "../functions/IndexFollow";
import LoadingNow from "./LoadingNow";

const FollowIndex: React.FC<{currentUserId: string}> = ({currentUserId}) => {
  const [{followItem, result: followResult, loading: followLoading}, followIndex] = useFollowIndex();

  useEffect(()=>{
    followIndex(currentUserId)
  }, []);

  return(
    <div className="flex justify-center items-center text-shadow-black">
      <div className="mr-4 my-3">
        <span className="">フォロワー数：</span>
        <span className="">{followItem.followers}</span>
      </div>
      <div className="mr-4 my-3">
        <span className="">フォロー数：</span>
        <span className="">{followItem.followings}</span>
      </div>
      { followLoading && <LoadingNow /> }
    </div>
  );
};

export default FollowIndex