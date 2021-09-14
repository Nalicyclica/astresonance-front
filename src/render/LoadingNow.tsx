import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { VscLoading } from 'react-icons/vsc'

const LoadingNow: React.FC = () => {
  return ReactDOM.createPortal(
    <div className="h-screen w-screen flex justify-center items-center bg-gray-900 bg-opacity-80">
      <VscLoading size={100} className="animate-spin2s text-yellow-400"/>
    </div>,
  document.getElementById("loadingNow") as HTMLElement);
};

export default LoadingNow