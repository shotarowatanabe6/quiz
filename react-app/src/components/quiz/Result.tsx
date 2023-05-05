interface ResultProps {
  correctAnswer: string;
  result?: string;
}

function Result({ correctAnswer, result }: ResultProps) {
  return (
    <div className="result">
      {/* <p>Correct Answer: {correctAnswer}</p> */}
      <p>Result: {result}</p>
    </div>
  );
}

export default Result;
