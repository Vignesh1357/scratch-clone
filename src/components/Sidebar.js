import React, { useEffect } from "react";
import Icon from "./Icon";

export default function Sidebar({
  handleMove,
  handleRotate,
  handleRandomPosition,
  position,
  setPosition,
  glide,
  loadHello,
  clearGraphics,
  handleCostume,
  changeSize,
}) {
  useEffect(() => {
    document.getElementsByName("x-pos")[0].value = position.x;
    document.getElementsByName("y-pos")[0].value = position.y;
    document.getElementsByName("x-pos-glide")[0].value = position.x;
    document.getElementsByName("y-pos-glide")[0].value = position.y;
  }, [position]);

  const handlePosition = () => {
    setPosition({
      x: parseFloat(document.getElementsByName("x-pos")[0].value || 50),
      y: parseFloat(document.getElementsByName("y-pos")[0].value || 50),
    });
  };
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() =>
          handleMove(parseInt(document.getElementsByName("steps")[0].value))
        }
      >
        {"Move "}
        <input
          style={{ width: "30px", color: "black" }}
          name="steps"
          defaultValue={10}
          onClick={(e) => e.stopPropagation()}
        />
        {"steps"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() =>
          handleRotate(
            "left",
            parseFloat(document.getElementsByName("left-degree")[0].value)
          )
        }
      >
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        <input
          style={{ width: "30px", color: "black" }}
          name="left-degree"
          defaultValue={15}
          onClick={(e) => e.stopPropagation()}
        />
        {" degrees"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() =>
          handleRotate(
            "right",
            parseFloat(document.getElementsByName("right-degree")[0].value)
          )
        }
      >
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        <input
          style={{ width: "30px", color: "black" }}
          name="right-degree"
          defaultValue={15}
          onClick={(e) => e.stopPropagation()}
        />
        {" degrees"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleRandomPosition}
      >
        {"Go to Random Position"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handlePosition}
      >
        {"Go to x : "}
        <input
          style={{ width: "30px", color: "black" }}
          name="x-pos"
          onClick={(e) => e.stopPropagation()}
        />
        {"  "}
        {" y : "}
        <input
          style={{ width: "30px", color: "black" }}
          name="y-pos"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => {
          glide(parseInt(document.getElementsByName("seconds")[0].value) || 0);
        }}
      >
        {"Glide "}
        <input
          style={{ width: "30px", color: "black" }}
          name="seconds"
          defaultValue={5}
          onClick={(e) => e.stopPropagation()}
        />
        {" sec to random position"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => {
          glide(
            parseInt(document.getElementsByName("seconds-glide")[0].value) || 0,
            parseInt(document.getElementsByName("x-pos-glide")[0].value) || 0,
            parseInt(document.getElementsByName("y-pos-glide")[0].value) || 0
          );
        }}
      >
        {"Glide "}
        <input
          style={{ width: "30px", color: "black" }}
          name="seconds-glide"
          defaultValue={5}
          onClick={(e) => e.stopPropagation()}
        />
        {" sec to x : "}

        <input
          style={{ width: "30px", color: "black" }}
          name="x-pos-glide"
          onClick={(e) => e.stopPropagation()}
        />
        {"  "}
        {" y : "}
        <input
          style={{ width: "30px", color: "black" }}
          name="y-pos-glide"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className="font-bold"> {"Looks"} </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() =>
          loadHello(parseInt(document.getElementsByName("looks-sec")[0].value))
        }
      >
        {"Say Hello for "}
        <input
          style={{ width: "30px", color: "black" }}
          name="looks-sec"
          onClick={(e) => e.stopPropagation()}
          defaultValue={10}
        />
        {" seconds"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => loadHello()}
      >
        {"Say Hello!"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => changeSize(document.getElementsByName("size")[0].value)}
      >
        {"Change size by "}
        <input
          style={{ width: "30px", color: "black" }}
          name="size"
          onClick={(e) => e.stopPropagation()}
          defaultValue={10}
        />
      </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleCostume}
      >
        Next Costume
      </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={clearGraphics}
      >
        Clear Graphics
      </div>
    </div>
  );
}
