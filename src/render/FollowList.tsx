import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import { useFollowList } from "../functions/FollowersFollowings";
import { defaultListShow, ListShow } from "./FollowIndex";
import FrontModal from "./FrontModal";
import LoadingNow from "./LoadingNow";

const FollowList: React.FC<{userId: string, listType: string, setListShow:(value: ListShow)=>void}> = ({userId, listType, setListShow}) => {
  const [{followUserItems, loading, result}, setFollows] = useFollowList();
  
  useEffect(()=>{
    switch(listType){
      case "フォロワーリスト":
        setFollows.followersList(userId);
        break;
      case "フォローリスト":
        setFollows.followingsList(userId);
        break;
      default:
        break;
    };
  },[]);

  useEffect(()=>{
    if(!result.valid){
      switch(result.action){
        case "followers":
          alert(`フォロワーリストを取得できませんでした${result.errors.response.data.errors}`);
          setListShow(defaultListShow);
          break;
        case "followings":
          alert(`フォローリストを取得できませんでした${result.errors.response.data.errors}`);
          setListShow(defaultListShow);
          break;
        default:
          break;
      }
    }
  },[result])

  return(
    <div>
      <FrontModal title={listType} setModalShow = {setListShow}>
        <ul className="w-72 h-96 rounded-md overflow-auto">{
          followUserItems.map((followUserItem) =>
          <li key={followUserItem.id} className="w-full p-4 border-b border-yellow-400 hover:shadow-bright hover:bg-gray-600">
            <Link to={`/UserShow/${followUserItem.id}`} className="flex justify-start items-center">
              <div style={{backgroundColor: followUserItem.icon_color}} className = "w-8 h-8 mr-2 rounded-full shadow-bright"></div>
              <p className="text-xl text-center">{followUserItem.nickname}</p>
            </Link>
          </li>
          )
        }</ul>
      </ FrontModal>
      { loading && <LoadingNow /> }
    </div>
  )
};

export default FollowList