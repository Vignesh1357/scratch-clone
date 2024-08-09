import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [rotation, setRotation] = useState(0);

  const handleMove = () => {
    const angleInRadians = (rotation * Math.PI) / 180;
    setPosition((prevPosition) => ({
      x: prevPosition.x + 10 * Math.cos(angleInRadians),
      y: prevPosition.y + 10 * Math.sin(angleInRadians),
    }));
  };

  const handleRotate = (direction) => {
    setRotation((prevRotation) =>
      direction === "right" ? prevRotation + 15 : prevRotation - 15
    );
    console.log("Rotate 15", direction);
  };

  const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const handleRandomPosition = () => {
    setPosition({
      x: getRandomArbitrary(0, 480),
      y: getRandomArbitrary(0, 300),
    });
  };

  useEffect(() => {
    console.log(position);
  }, [position]);
  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar
            handleMove={handleMove}
            handleRotate={handleRotate}
            handleRandomPosition={handleRandomPosition}
          />{" "}
          <MidArea />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea
            position={position}
            setPosition={setPosition}
            rotation={rotation}
          />
        </div>
      </div>
    </div>
  );
}
