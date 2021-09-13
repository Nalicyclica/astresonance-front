import React from "react";
import { Link } from "react-router-dom";
import { MusicInfo } from "../functions/IndexMusic";
import { UserTitleInfo } from "../functions/ShowMusic";
import { CurrentUserInfo } from "../functions/UserInfo";

const MusicFooter: React.FC<{musicItem: MusicInfo, userInfo: CurrentUserInfo, userTitle: UserTitleInfo}> = ({musicItem, userInfo, userTitle}) => {
  return(
    <div className= "flex justify-between items-center p-1 h-20 w-screen absolute bottom-0 backdrop-filter backdrop-blur-lg backdrop-contrast-75 shadow-header">
      <div className="flex justify-start items-center">
        <p className="mx-4">
          カテゴリー:{musicItem.genreName}の{musicItem.categoryName}
        </p>
        { userInfo.isSignIn && ( musicItem.user_id == userInfo.id || userTitle.isTitled ) &&
        <div className="flex justify-start items-end" >
          <p className="mr-3">投稿者:</p> 
          <div style={{backgroundColor: musicItem.icon_color}} className="w-6 h-6 mr-2 rounded-full shadow-bright hover:shadow-gold"></div>
          <Link to={`/UserShow/${musicItem.user_id}`}>
            {musicItem.nickname}
          </Link>
        </div>
        }
      </div>
      <Link to="/" className="m-2 bg-gray-800 px-6 py-4 rounded-md shadow-lg hover:shadow-bright">別の曲を探す</Link>
    </div>
  );
};

export default MusicFooter