const canvas = document.querySelector("canvas");
let context=canvas.getContext('2d');
let drawing=false;
let eraser=false;
let startX,startY;
let col="black";

context.fillStyle='white';

const socket=io("http://localhost:3000");
socket.on("connection",()=>{
    console.log("coonected to backend");
})

socket.on("draw/command",(commands)=>{
    commands.forEach(command=>{
        if(command[0]==0)
        {
            drawOnCanvas(command[1],command[2],command[3],command[4],command[5]);
        }
        else if(command[0]==1) 
        {
            eraseOnCanvas(command[3],command[4]);
        }
        else if(command[0]==2)
        {
            clearOnCanvas();
        }
    })
})
function drawOnCanvas(startX,startY,currentX,currentY,col)
{
    context.fillStyle=col;
    context.beginPath();
    context.moveTo(startX,startY);
    context.lineTo(currentX,currentY);
    context.strokeStyle = col;
    context.lineWidth=5;
    context.lineJoin="round";
    context.lineCap="round";
    context.stroke();
}

let batch=[];
let isRequestTimed=null;
function eraseOnCanvas(currentX,currentY)
{
    context.fillStyle='white';
    context.fillRect(currentX,currentY,20,20);
    
}
function clearOnCanvas()
{
    context.clearRect(0,0,canvas.width,canvas.height);
}

function sendDrawCommand(command,currentX,currentY)
{
    batch.push([command,startX,startY,currentX,currentY,col]);
    if(!isRequestTimed)
    {
        setTimeout(()=>{
            socket.emit("draw/command",batch);
            isRequestTimed=false;
            batch=[];
        },50);
        isRequestTimed=true;
    }

}
canvas.addEventListener('mousedown',e=>{
    startX=e.offsetX;
    startY=e.offsetY;
    drawing=true;
});

canvas.addEventListener('mousemove',(e)=>{
    let currentX=e.offsetX;
    let currentY=e.offsetY;

    if(drawing)
    {
        if(eraser)
        {
            eraseOnCanvas(currentX,currentY);
            sendDrawCommand(1,currentX,currentY);
        }
        else{
            drawOnCanvas(startX,startY,currentX,currentY,col);
            sendDrawCommand(0,currentX,currentY);

            startX=currentX;
            startY=currentY;
        }
    }
});

canvas.addEventListener('mouseup',e=>{
    drawing =false;

});
const toggleEraser=()=>{
    eraser=true;
}
const selectPen=(element)=>{

    col = element.style.background;
    // console.log(col);
    eraser=false;

}
const clearCanvas=()=>{
    
    clearOnCanvas();
    sendDrawCommand(2,canvas.width,canvas.height);
    eraser=false;
}
