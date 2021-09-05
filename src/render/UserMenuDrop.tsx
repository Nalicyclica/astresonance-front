import React, {useRef, useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { IoIosArrowDown } from 'react-icons/io'
import SignOut from "./SignOut";
import { useContext } from "react";
import { CurrentUser } from "../functions/UserInfo";

const UserMenuDrop: React.FC = () => {
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const [isOpen, setOpen] = useState<boolean>(false);
  const menuDropRef: any = useRef();
  const history = useHistory();

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOutsideClick = (event: any) => {
    if (menuDropRef.current && !menuDropRef.current.contains(event.target)) {
      setOpen(false);
    }
  }

  const handleInsideClick = (linkUrl: string) => {
    setOpen(false);
    history.push(linkUrl);
  }

  return(
    <div ref={menuDropRef} className="relative inline-block text-left mr-4">
      <button onClick={() => setOpen(!isOpen)} type="button" className="flex items-center bg-gray-800 px-4 py-3 rounded-md shadow-lg hover:shadow-bright">
        <p>メニュー</p>
        <IoIosArrowDown />
      </button>
      {isOpen &&
          <div className='absolute top-12 right-2 p-4 bg-gray-800 shadow-bright rounded-lg'>
              <ul className="flex flex-col justify-start items-center">
                  <button onClick={e => handleInsideClick("/MusicCreate")} className="w-64 p-1 hover:bg-gray-700">音楽を投稿する</button>
                  <button onClick={e => handleInsideClick("/AccountUpdate")} className="w-full p-1 hover:bg-gray-700">アカウント情報を確認する</button>
                  <button onClick={e => handleInsideClick(`/UserShow/${userInfo.id}`)} className="w-full p-1 hover:bg-gray-700">マイページに移動する</button>
                  <button onClick={e => handleInsideClick("/")} className="w-full p-1 hover:bg-gray-700"><SignOut /></button>
              </ul>
          </div>
      }
    </div>
  );
};

export default UserMenuDrop