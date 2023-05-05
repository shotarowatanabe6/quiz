import SendMessage from "../components/SendMessage";
import GameField from "../components/GameField";

const QuizPage = () => {
  return (
    <div>
      <h2>Welcome to the Quiz Page!</h2>
      <p>This is the home page of our React app.</p>
      <GameField />
      <hr></hr>
      <SendMessage />
    </div>
  );
};

export default QuizPage;
