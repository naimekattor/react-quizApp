import { useRef, useState } from "react";
import "./QuizApp.css";
import { data } from "./data";
const QuizApp = () => {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const option_array = [option1, option2, option3, option4];
  const checkAnswer = (e, ans) => {
    if (lock === false) {
      if (data[index].ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prevScore) => prevScore + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[data[index].ans - 1].current.classList.add("correct");
      }
    }
  };
  const nextBtn = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      if (index === data.length - 1) {
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };
  const handleReset = () => {
    setResult(false);
    setIndex(0);
    setLock(false);
    setScore(0);
  };
  return (
    <div className="content-container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>
            You scored {score} out of {data.length}
          </h2>
          <button className="btn btn-info" onClick={handleReset}>
            Reset
          </button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {data[index].question}
          </h2>
          <ul className="list-group">
            <li
              ref={option1}
              className="list-group-item"
              onClick={(e) => checkAnswer(e, 1)}
            >
              {data[index].option1}
            </li>
            <li
              ref={option2}
              className="list-group-item"
              onClick={(e) => checkAnswer(e, 2)}
            >
              {data[index].option2}
            </li>
            <li
              ref={option3}
              className="list-group-item"
              onClick={(e) => checkAnswer(e, 3)}
            >
              {data[index].option3}
            </li>
            <li
              ref={option4}
              className="list-group-item"
              onClick={(e) => checkAnswer(e, 4)}
            >
              {data[index].option4}
            </li>
          </ul>
          <button className="btn btn-info" onClick={nextBtn}>
            Next
          </button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default QuizApp;
