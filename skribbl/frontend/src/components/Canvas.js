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

// import React from "react";
// import { useRef } from "react";
// import { io } from "socket.io-client";
// export default function Canvas() {
//     const canvasRef=useRef(null);
//     const canvas = document.querySelector("canvas");
// let context=canvas.getContext('2d');
// let drawing=false;
// let eraser=false;
// let startX,startY;
// let col="black";

// context.fillStyle='white';

// const socket=io("http://localhost:3000");
// socket.on("connection",()=>{
//     console.log("coonected to backend");
// })

// socket.on("draw/command",(commands)=>{
//     commands.forEach(command=>{
//         if(command[0]==0)
//         {
//             drawOnCanvas(command[1],command[2],command[3],command[4],command[5]);
//         }
//         else if(command[0]==1)
//         {
//             eraseOnCanvas(command[3],command[4]);
//         }
//         else if(command[0]==2)
//         {
//             clearOnCanvas();
//         }
//     })
// })
// function drawOnCanvas(startX,startY,currentX,currentY,col)
// {
//     context.fillStyle=col;
//     context.beginPath();
//     context.moveTo(startX,startY);
//     context.lineTo(currentX,currentY);
//     context.strokeStyle = col;
//     context.lineWidth=5;
//     context.lineJoin="round";
//     context.lineCap="round";
//     context.stroke();
// }

// let batch=[];
// let isRequestTimed=null;
// function eraseOnCanvas(currentX,currentY)
// {
//     context.fillStyle='white';
//     context.fillRect(currentX,currentY,20,20);

// }
// function clearOnCanvas()
// {
//     context.clearRect(0,0,canvas.width,canvas.height);
// }

// function sendDrawCommand(command,currentX,currentY)
// {
//     batch.push([command,startX,startY,currentX,currentY,col]);
//     if(!isRequestTimed)
//     {
//         setTimeout(()=>{
//             socket.emit("draw/command",batch);
//             isRequestTimed=false;
//             batch=[];
//         },50);
//         isRequestTimed=true;
//     }

// }
// canvas.addEventListener('mousedown',e=>{
//     startX=e.offsetX;
//     startY=e.offsetY;
//     drawing=true;
// });

// canvas.addEventListener('mousemove',(e)=>{
//     let currentX=e.offsetX;
//     let currentY=e.offsetY;

//     if(drawing)
//     {
//         if(eraser)
//         {
//             eraseOnCanvas(currentX,currentY);
//             sendDrawCommand(1,currentX,currentY);
//         }
//         else{
//             drawOnCanvas(startX,startY,currentX,currentY,col);
//             sendDrawCommand(0,currentX,currentY);

//             startX=currentX;
//             startY=currentY;
//         }
//     }
// });

// canvas.addEventListener('mouseup',e=>{
//     drawing =false;

// });
// const toggleEraser=()=>{
//     eraser=true;
// }
// const selectPen=(element)=>{

//     col = element.style.background;
//     // console.log(col);
//     eraser=false;

// }
// const clearCanvas=()=>{

//     clearOnCanvas();
//     sendDrawCommand(2,canvas.width,canvas.height);
//     eraser=false;
// }

//   return (
//     <div>
//       <canvas id="canvas" height={500} width={800} ref={canvasRef} />
//       <div class="tools">

//         <div onClick={toggleEraser()} className="color-field" id="eraser" style="background: white;">Eraser</div>
//         <div onClick={selectPen(this)} className="color-field" style="background: red;"></div>
//         <div onClick={selectPen(this)} className="color-field" style="background: green;"></div>
//         <div onClick={selectPen(this)} className="color-field" style="background: yellow;"></div>
//         <div onClick={selectPen(this)} className="color-field" style="background: blue;"></div>
//         <div onClick={selectPen(this)} className="color-field" style="background: pink;"></div>
//         <button onClick={clearCanvas()} type="button" className="button">Clear</button>
//     </div>
//     </div>
//   );
// }
