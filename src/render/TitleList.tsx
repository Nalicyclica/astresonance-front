import { TitleInfo } from "../functions/ShowTitle"
import { CurrentShow } from "./MusicShow";

const TitleItem: React.FC<{titleItem: TitleInfo, setTitleShow: (value: CurrentShow) => void}> = ({titleItem, setTitleShow}) => {
  const thisTitleShow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const setCurrent: CurrentShow = {
      showFlag: true,
      showId: titleItem.id,
    };
    setTitleShow(setCurrent);
  };
  
  return(
    <li key={titleItem.id} className="p-3 mb-3 w-72 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 backdrop-filter backdrop-blur-lg">
    <button onClick={(e) => thisTitleShow(e)} className="flex justify-start items-center">
      <div style={{backgroundColor: titleItem.icon_color}} className = "w-8 h-8 mr-4 rounded-full shadow-bright">
      </div>
      <div className="flex justify-start items-end">
        <p style={{textShadow: `1px 1px 1px ${titleItem.color}`}} className="font-extrabold text-lg mr-4">{titleItem.title}</p>
        <p className="text-sm">by {titleItem.nickname}</p>
      </div>
    </button>
  </li>
  );
};


const TitleList: React.FC<{titleItems: TitleInfo[], setTitleShow:(value: CurrentShow)=>void}> = ({titleItems, setTitleShow})=>{
  return(
    <ul className="overflow-y-auto w-96 px-4 py-5 flex flex-col justify-start items-center">
      {titleItems.map((titleItem) => 
        <TitleItem titleItem={titleItem} setTitleShow={setTitleShow} />
      )}
    </ul>
  );
};

export default TitleList