import React, { useEffect, useRef, useState } from "react";
import catSprite from "./CatSprite";

export default function PreviewArea({ position, setPosition, rotation }) {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startOffset, setStartOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    drawSVGOnCanvas(ctx, position.x, position.y, rotation);
  }, [position, rotation]);

  const drawSVGOnCanvas = (ctx, x, y, angle) => {
    const svg = catSprite;

    const img = new Image();
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.save();
      ctx.translate(x + img.width / 2, y + img.height / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const startDrag = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setStartOffset({
      x: e.clientX - rect.left - position.x,
      y: e.clientY - rect.top - position.y,
    });
    setIsDragging(true);
  };

  const doDrag = (e) => {
    if (isDragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left - startOffset.x,
        y: e.clientY - rect.top - startOffset.y,
      });
    }
  };

  const endDrag = () => {
    setIsDragging(false);
  };
  return (
    <div className="flex-none h-full overflow-y-auto p-2">
      <canvas
        ref={canvasRef}
        draggable
        width={510}
        height={382}
        style={{ height: "306px", width: "408px" }}
        onMouseMove={doDrag}
        onMouseUp={endDrag}
        onMouseDown={startDrag}
      />

      {/* <CatSprite /> */}
    </div>
  );
}
