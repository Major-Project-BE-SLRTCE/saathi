import { useState } from "react";
import io from "socket.io-client";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log("Connected to server.");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server.");
  });

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.emit("message", { text: "Hello world!" });

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Saathi</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
