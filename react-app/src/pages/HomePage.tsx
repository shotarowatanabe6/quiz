import React, { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3001";

interface Props {
  username: string;
}

interface ChatMessage {
  username: string;
  message: string;
}

const HomePage = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    // サーバーに接続する
    socketRef.current = io("http://localhost:3001");

    // サーバーからメッセージを受信した場合の処理
    socketRef.current.on("chat message", (msg: string) => {
      setMessages([...messages, msg]);
    });

    // コンポーネントがアンマウントされた場合に接続を切る
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "") {
      // サーバーにメッセージを送信する
      socketRef.current?.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Welcome to the Home Page!</h2>
      <p>This is the home page of our React app.</p>
      <a href="./quiz">Quiz Page</a>

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default HomePage;
