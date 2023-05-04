import { useState } from "react";

interface OperationProps {
  entered: boolean;
  onEnter: (name: string) => void;
  onLeave: () => void;
}

const Operation: React.FC<OperationProps> = ({ entered, onEnter, onLeave }) => {
  const [name, setName] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEnterClick = () => {
    onEnter(name);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="名前"
        value={name}
        disabled={entered}
        onChange={handleInputChange}
      />
      {entered ? (
        <>
          <button onClick={onLeave}>退室</button>
        </>
      ) : (
        <button disabled={!name} onClick={handleEnterClick}>
          入室
        </button>
      )}
    </div>
  );
};

export default Operation;
