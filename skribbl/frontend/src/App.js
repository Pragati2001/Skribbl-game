import "./App.css";
import Start from './components/Start'
import Main_Page from "./components/Main_Page";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {useEffect} from 'react';
import { io } from "socket.io-client";

function App() {
  const { gameState } = useSelector((state) => state.RoomStore);
  const dispatch = useDispatch();

  useEffect(() => {

    const newSocket = io("http://localhost:5000");
    dispatch(connectSocket(newSocket));
    return () => newSocket.close();
  }, [dispatch]);
  return (
    <div className="App">
      {gameState === "none" && <Start />}
      {gameState === "lobby" && <Main_Page />}
        
    </div>
  );
}

export default App;
