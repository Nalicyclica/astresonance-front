import React, {useEffect} from "react";

const TitleShow: React.FC<{titleId: number}> = ({titleId}) => {

  useEffect(()=>{
    console.log(titleId);
  },[titleId]);
  return(
    <div className="w-96 h-home bg-gray-600 absolute">
      <div className= "flex flex-col justify-start items-center w-screen h-home">
        <div className="m-2">選択したタイトル</div>
        <div className="m-2">あなたのタイトル</div>
        <ul className="overflow-auto p-4 h-96">
          コメントのリスト
        </ul>
        <form>
          <div>コメント投稿のフォーム</div>
          <div>
            <input type="text" />
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TitleShow