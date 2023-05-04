import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface ChatMessage {
  name: string;
  text: string;
}

type ChatService = [ChatMessage[], (name: string, text: string) => void];

const useChatService = (initialMessage: ChatMessage): ChatService => {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  const socketRef = useRef<Socket>();

  useEffect(() => {
    console.log("Connecting...");
    socketRef.current = io();
    console.log("socketRef.current: ", socketRef.current);
    socketRef.current.on("broadcast", (payload: ChatMessage) => {
      console.log("Received: " + payload);
      setMessages((prevMessages) => [...prevMessages, payload]);
    });

    return () => {
      if (socketRef.current) {
        console.log("Disconnecting...");
        socketRef.current.disconnect();
      }
    };
  }, []);

  const sendMessage = (name: string, text: string) => {
    const aMessage: ChatMessage = {
      name: name,
      text: text,
    };
    if (socketRef.current) {
      console.log("send");
      socketRef.current.emit("send", aMessage);
    }
    setMessages((prevMessages) => [...prevMessages, aMessage]);
  };

  return [messages, sendMessage];
};

export default useChatService;
