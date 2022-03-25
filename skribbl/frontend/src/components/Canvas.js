import React, { useCallback, useEffect, useRef, useState } from "react";

const colors = ["red", "green", "yellow", "black", "blue"];

export default function Canvas() {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
    // let startX,startY,currentX,currentY;
  const [selectedColor, setSelectedColor] = useState("black");
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
    }
  }, []);

  const draw = useCallback(
    (currentX, currentY,col) => {
      if (mouseDown) {
          setSelectedColor(col);
          
        // context.fillStyle=col;
        //     context.beginPath();
        //     context.moveTo(startX,startY);
        //     context.lineTo(currentX,currentY);
        //     context.strokeStyle = col;
        //     context.lineWidth=5;
        //     context.lineJoin="round";
        //     context.lineCap="round";
        //     context.stroke();
        ctx.current.fillStyle=col;
        ctx.current.beginPath();
        // ctx.current.strokeStyle = selectedColor;
        ctx.current.lineWidth = 10;
        ctx.current.lineJoin = "round";
        ctx.current.moveTo(lastPosition.startX, lastPosition.startY);
        ctx.current.lineTo(currentX, currentY);
        ctx.current.closePath();
        ctx.current.stroke();

        setPosition({
          currentX,
          currentY,
        });
      }
    },
    [lastPosition, mouseDown, selectedColor, setPosition]
  );

  const download = async () => {
    const image = canvasRef.current.toDataURL("image/png");
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  };

  const clear = () => {
    ctx.current.clearRect(
      0,
      0,
      ctx.current.canvas.width,
      ctx.current.canvas.height
    );
  };

  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY,
    });
    setMouseDown(true);
  };

  const onMouseUp = (e) => {
    setMouseDown(false);
  };

  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY);
  };

  return (
    <div>
      <canvas
        style={{
          border: "1px solid #000",
        }}
        width={400}
        height={400}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      />
      <br />
      <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      >
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      <button onClick={clear}>Clear</button>
      <button onClick={download}>Download</button>
    </div>
  );
}
