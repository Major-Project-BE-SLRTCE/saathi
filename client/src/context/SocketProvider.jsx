import socketio from "socket.io-client";
import { createContext, useEffect, useState } from "react";

export const socket = socketio.connect(import.meta.env.VITE_BACKEND_URL);
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
