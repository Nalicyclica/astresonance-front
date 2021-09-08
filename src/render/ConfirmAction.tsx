import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom'

export type ConfirmActionInfo = {
  modalShow: boolean
  response: boolean
};

export const defaultConfirmAction: ConfirmActionInfo = {
  modalShow: false,
  response: false
};

const ConfirmAction: React.FC<{message: string, setConfirmAction:(value: ConfirmActionInfo)=>void}> = ({message, setConfirmAction}) => {

  const handleSubmit = () => {
    const confirmActionData: ConfirmActionInfo = {
      modalShow: false,
      response: true
    };
    setConfirmAction(confirmActionData);
  };

  const handleDenied = () => {
    setConfirmAction({...defaultConfirmAction});
  };

  return ReactDOM.createPortal(
    <div className="bg-gray-900 bg-opacity-80 flex justify-center items-center w-screen h-screen">
      <div className="w-96 p-8 rounded-md bg-gray-600 text-yellow-400">
        <div className="w-full mb-8" >
          <p className="text-lg text-center">{message}してもよろしいですか？</p>
        </div>
        <div className="w-full flex justify-around items-center">
          <button onClick={handleDenied} className="px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold">
            キャンセル
          </button>
          <button onClick={handleSubmit} className="px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold">
            確認
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('confirmAction') as HTMLElement
  );
};

export default ConfirmAction