import React, {useRef, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from 'react-icons/io'
import SignOut from "./SignOut";
import { useContext } from "react";
import { CurrentUser } from "./Main";

const UserMenuDrop: React.FC = () => {
  const { userInfo, setUserInfo } = useContext(CurrentUser);
  const [isOpen, setOpen] = useState<boolean>(false);
  const menuDropRef: any = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOutsideClick = (event: any) => {
    if (menuDropRef.current && !menuDropRef.current.contains(event.target)) {
      setOpen(false);
    }
  }

  const handleInsideClick = () => {
    setOpen(false);
  }

  return(
    <>
    <div ref={menuDropRef} className="relative inline-block text-left mr-4">
        <span className="rounded-md shadow-sm">
            <button onClick={() => setOpen(!isOpen)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150" id="options-menu" aria-haspopup="true" aria-expanded={isOpen}>
            MENU
            <IoIosArrowDown />
            </button>
        </span>

        {isOpen && (
            <div className='absolute top-12 right-2 w-64 p-4 bg-gray-900 z-50 shadow-bright border border-gray-100 rounded'>
                <ul>
                    <li onClick={handleInsideClick}><Link to="/PostMusic" className="h-full w-full">音楽を投稿する</Link></li>
                    <li onClick={handleInsideClick}><Link to="/AccountUpdate" className="h-full w-full">アカウント情報を確認する</Link></li>
                    <li onClick={handleInsideClick}><Link to={`/UserShow/${userInfo.id}`} className="h-full w-full">マイページに移動する</Link></li>
                    <li><a>menu2</a></li>
                    <li onClick={handleInsideClick}><SignOut /></li>
                </ul>
            </div>
        )}
    </div>
</>
  );
};

export default UserMenuDrop