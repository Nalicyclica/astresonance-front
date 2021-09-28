import React, { useEffect, useRef } from "react"
import ReactDOM from 'react-dom'
import {ListShow, defaultListShow} from './FollowIndex'

const FrontModal: React.FC<{title: string, setModalShow:(value: ListShow)=>void}> = ({title, setModalShow, children}) => {
  const backRef: any = useRef();
  const modalRef: any = useRef();

  useEffect(() => {
    backRef.current.addEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOutsideClick = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalShow(defaultListShow);
    }
  };

  return ReactDOM.createPortal(
    <div ref={backRef} className="bg-gray-900 bg-opacity-80 flex justify-center items-center w-screen h-screen">
      <div ref={modalRef} className="flex flex-col items-center w-96 p-8 rounded-md bg-gray-800 text-yellow-400">
        <div className="w-72 mb-8" >
          <p className="border-b border-yellow-400 text-3xl text-center pb-1">{title}</p>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('frontModal') as HTMLElement
  );
};

export default FrontModal