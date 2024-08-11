import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [position, setPosition] = useState({});
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadHelloSVG, setLoadHelloSVG] = useState(false);
  const [helloSVGTimer, setHelloSVGTimer] = useState();
  const [costume, setCostume] = useState(false);
  const [changeSizeby, setChangeSizeby] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (loadHelloSVG) {
      setTimeout(() => {
        setLoadHelloSVG(false);
      }, helloSVGTimer);
    }
  }, [helloSVGTimer]);

  useEffect(() => {
    if (costume) {
      setPosition({ x: -200, y: -100 });
    } else {
      setPosition({ x: 50, y: 50 });
    }
  }, [costume]);

  const handleMove = (steps) => {
    const angleInRadians = (rotation * Math.PI) / 180;
    setPosition((prevPosition) => ({
      x: prevPosition.x + steps * Math.cos(angleInRadians),
      y: prevPosition.y + steps * Math.sin(angleInRadians),
    }));
  };

  const handleRotate = (direction, angle) => {
    setRotation((prevRotation) =>
      direction === "right" ? prevRotation + angle : prevRotation - angle
    );
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

  const animateMovement = (startX, startY, endX, endY, duration) => {
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
      const progress = Math.min(elapsedTime / duration, 1);

      const newX = startX + (endX - startX) * progress;
      const newY = startY + (endY - startY) * progress;

      setPosition({ x: newX, y: newY });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const glide = (seconds, x, y) => {
    if (!x && !y) {
      x = getRandomArbitrary(0, 480);
      y = getRandomArbitrary(0, 300);
    }
    if (!isAnimating) {
      setIsAnimating(true);
      animateMovement(position.x, position.y, x, y, seconds);
    }
  };

  const loadHello = (seconds) => {
    setLoadHelloSVG(true);
    if (seconds) {
      const ms = seconds * 1000;
      setHelloSVGTimer(ms);
    }
  };

  const handleCostume = () => {
    setChangeSizeby(0);
    setCostume(!costume);
  };

  const clearGraphics = () => {
    setLoadHelloSVG(false);
    setChangeSizeby(0);
    setReload(true);
  };

  const changeSize = (size) => {
    setChangeSizeby((prev) => {
      console.log(size, prev);
      setReload(true);
      return parseFloat(size) + prev;
    });
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar
            handleMove={handleMove}
            handleRotate={handleRotate}
            handleRandomPosition={handleRandomPosition}
            position={position}
            setPosition={setPosition}
            glide={glide}
            loadHello={loadHello}
            clearGraphics={clearGraphics}
            handleCostume={handleCostume}
            changeSize={changeSize}
          />{" "}
          <MidArea />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea
            position={position}
            setPosition={setPosition}
            rotation={rotation}
            loadHelloSVG={loadHelloSVG}
            costume={costume}
            changeSizeby={changeSizeby}
            reload={reload}
            setReload={setReload}
          />
        </div>
      </div>
    </div>
  );
}
