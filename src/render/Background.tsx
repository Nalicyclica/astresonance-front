import React from "react";

const Background: React.FC = () => {
  return(
    <div className="absolute w-screen h-screen bg-gray-900 overflow-hidden flex justify-center items-center z-10">
      <div className="w-full h-full flex justify-center items-center relative">
        <div className= "relative w-72 h-72">
          <div className = "absolute rounded-full w-full h-full animate-twinkleBase z-10"></div>
          <div className = "absolute rounded-full w-full h-full animate-twinkleGold z-10"></div>
          <div className = "absolute rounded-full w-full h-full shadow-blueInnerOne animate-spinBlinkOne z-10"></div>
          <div className = "absolute rounded-full w-full h-full shadow-redInnerOne animate-spinBlinkTwo z-10"></div>
        </div>
        <div className = "absolute rounded-full w-200 h-200 animate-twinkleEclipse z-10"></div>
      </div>
    </div>
  )
};

export default Background