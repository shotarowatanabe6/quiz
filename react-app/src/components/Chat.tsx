import { useState } from "react";
import useChatService from "./hooks/useChatService";
import Message from "./Message";

interface ChatProps {
  name: string;
}

const Chat: React.FC<ChatProps> = ({ name }) => {
  const [messages, sendMessage] = useChatService({
    name: "管理人",
    text: `ようこそ、${name}さん`,
  });

  const [text, setText] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sendMessage(name, text);
    setText("");
  };

  return (
    <div>
      <div className="input">
        <input
          type="text"
          placeholder="メッセージ"
          value={text}
          onChange={handleInputChange}
        />
        <button disabled={!text} onClick={handleButtonClick}>
          送信
        </button>
      </div>
      <ul>
        {messages.map((msg: message, idx: number) => {
          return <Message key={idx} name={msg.name} text={msg.text} />;
        })}
      </ul>
    </div>
  );
};

export default Chat;

interface message {
  name: string;
  text: string;
}
