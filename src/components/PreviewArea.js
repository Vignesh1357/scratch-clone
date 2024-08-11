import React, { useEffect, useRef, useState } from "react";
import catSprite, {
  catSpriteHello,
  costume2,
  costume2Hello,
} from "./CatSprite";

export default function PreviewArea({
  position,
  setPosition,
  rotation,
  loadHelloSVG,
  costume,
  changeSizeby,
  reload,
  setReload,
}) {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startOffset, setStartOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    drawSVGOnCanvas(ctx, position.x, position.y, rotation);
  }, [position, rotation, loadHelloSVG, costume]);

  useEffect(() => {
    if (reload) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      drawSVGOnCanvas(ctx, position.x, position.y, rotation, changeSizeby);
    }
  }, [reload]);

  const drawSVGOnCanvas = (ctx, x, y, angle, size) => {
    let svg = catSprite;
    size = size || 0;
    if (!costume) {
      if (loadHelloSVG) {
        svg = catSpriteHello;
      }
    } else {
      if (loadHelloSVG) {
        svg = costume2Hello;
      } else {
        svg = costume2;
      }
    }

    const img = new Image();
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.save();
      ctx.translate(x + img.width / 2, y + img.height / 2);
      ctx.rotate((angle * Math.PI) / 180);
      let scaledWidth;
      let scaledHeight;
      if (costume) {
        scaledWidth = img.width * 0.35;
        scaledHeight = img.height * 0.35;
        ctx.drawImage(
          img,
          -(scaledWidth / 2),
          -(scaledHeight / 2),
          scaledWidth + size,
          scaledHeight + size
        );
      } else {
        // setPosition({ x: 50, y: 50 });
        scaledWidth = img.width;
        scaledHeight = img.height;
        ctx.drawImage(
          img,
          -(scaledWidth / 2),
          -(scaledHeight / 2),
          scaledWidth * 2 + size,
          scaledHeight * 3 + size
        );
      }

      ctx.restore();
      URL.revokeObjectURL(url);
      setReload(false);
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
        // style={{ height: "306px", width: "408px" }}
        onMouseMove={doDrag}
        onMouseUp={endDrag}
        onMouseDown={startDrag}
      />

      {/* <CatSprite /> */}
    </div>
  );
}
