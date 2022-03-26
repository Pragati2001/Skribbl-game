
import Start from './components/Start'
import Main_Page from "./components/Main_Page";
import { io } from "socket.io-client";
import { useState } from 'react';

function App() {
  const [check,setCheck]=useState("true");
  function onstart()
  {
    setCheck("false");
  }
  return (
    <div className="App">
      {check==='true'&&<><Start onstart={onstart}/> </> }
      {check==='false'&&<>
      <Main_Page /></>}
    </div>
  );
}

export default App;
