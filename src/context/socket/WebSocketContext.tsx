import { createContext } from "react";
import { Socket, io } from "socket.io-client";


export const socket= io('http://localhost:5000')
export const websocketContext= createContext<Socket>(socket);
export const WebSocketProvider= websocketContext.Provider;