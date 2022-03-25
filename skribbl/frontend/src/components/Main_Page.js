import React from 'react'
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { io } from "socket.io-client";
import '../styles/main_page.css';
import Canvas from "./Canvas";
const socket = io.connect("http://localhost:5000");
const userName = nanoid(4);


export default function Main_Page() {
    const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className='main_page'>
        <Canvas />
        <div className="chat-app">
          <div className="chat-div">
            {chat.map((payload, index) => {
              return (
                <p key={index}>
                  {payload.message}:<span>id:{payload.userName}</span>
                </p>
              );
            })}
          </div>
          <div className="input-area">
            <form onSubmit={sendChat}>
              <input
                type="text"
                name="inp"
                placeholder="enter message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></input>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
    </div>
  )
}
