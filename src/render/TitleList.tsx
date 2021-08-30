import { TitleInfo } from "./MusicShow";
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
    <li key={titleItem.id} className="bg-gray-800 p-2 mb-1 w-64 rounded-md shadow-bright hover:shadow-gold hover:bg-gray-600 text-gray-100">
    <button onClick={(e) => thisTitleShow(e)} className="flex justify-start">
      <div style={{backgroundColor: titleItem.icon_color}} className = "w-8 h-8 rounded-full shadow-bright">
      </div>
      <div style={{color: titleItem.color}} className ="flex justify-between items-center w-full pr-6 text-shadow-ar">
        <p>{titleItem.title}</p>
        <p className="text-sm">by {titleItem.nickname}</p>
      </div>
    </button>
  </li>
  );
};


const TitleList: React.FC<{titleItems: TitleInfo[], setTitleShow:(value: CurrentShow)=>void}> = ({titleItems, setTitleShow})=>{
  return(
    <ul className="overflow-y-auto p-4 h-96 m-12">
      {titleItems.map((titleItem) => 
        <TitleItem titleItem={titleItem} setTitleShow={setTitleShow} />
      )}
    </ul>
  );
};

export default TitleList