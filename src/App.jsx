import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./App.css";

const questions = [
  {
    questionText: "What is the capital of Pakistan?",
    answerOptions: [
      { answerText: "New York", isCorrect: false },
      { answerText: "London", isCorrect: false },
      { answerText: "Islamabad", isCorrect: true },
      { answerText: "Doha", isCorrect: false },
    ],
  },
  {
    questionText: "Which of these is the capital of Australia?",
    answerOptions: [
      { answerText: "Sydney", isCorrect: false },
      { answerText: "Canberra", isCorrect: true },
      { answerText: "Melbourne", isCorrect: false },
      { answerText: "Perth", isCorrect: false },
    ],
  },
  {
    questionText: "Thimphu is the capital city of which country?",
    answerOptions: [
      { answerText: "India", isCorrect: false },
      { answerText: "Nepal", isCorrect: false },
      { answerText: "Melbourne", isCorrect: false },
      { answerText: "Bhutan", isCorrect: true },
    ],
  },
  {
    questionText: "What is the capital of New Zealand?",
    answerOptions: [
      { answerText: "Wellington", isCorrect: true },
      { answerText: "Christchurch", isCorrect: false },
      { answerText: "Auckland", isCorrect: false },
      { answerText: "Queenstown", isCorrect: false },
    ],
  },
  {
    questionText: "Lima is the capital city of which South American country?",
    answerOptions: [
      { answerText: "Argentina", isCorrect: false },
      { answerText: "Peru", isCorrect: true },
      { answerText: "Brazil", isCorrect: false },
      { answerText: "Chile", isCorrect: false },
    ],
  },
  {
    questionText: "Baghdad is the capital of which Middle Eastern country?",
    answerOptions: [
      { answerText: "Iran", isCorrect: false },
      { answerText: "Saudi Arabia", isCorrect: false },
      { answerText: "Syria", isCorrect: false },
      { answerText: "Iraq", isCorrect: true },
    ],
  },
  {
    questionText: "What is the capital city of Malaysia?",
    answerOptions: [
      { answerText: "Kuala Lumpur", isCorrect: true },
      { answerText: "Penang", isCorrect: false },
      { answerText: "Malacca", isCorrect: false },
      { answerText: "Ipoh", isCorrect: false },
    ],
  },
  {
    questionText: "Athens is the capital of which European country?",
    answerOptions: [
      { answerText: "Italy", isCorrect: false },
      { answerText: "Greece", isCorrect: true },
      { answerText: "Spain", isCorrect: false },
      { answerText: "France", isCorrect: false },
    ],
  },
  {
    questionText: "Which city is the capital of Japan?",
    answerOptions: [
      { answerText: "Kyoto", isCorrect: false },
      { answerText: "Osaka", isCorrect: false },
      { answerText: "Tokyo", isCorrect: true },
      { answerText: "Hiroshima", isCorrect: false },
    ],
  },
  {
    questionText: "Amsterdam is the capital of which European country?",
    answerOptions: [
      { answerText: "Belgium", isCorrect: false },
      { answerText: "Netherlands", isCorrect: true },
      { answerText: "Germany", isCorrect: false },
      { answerText: "Denmark", isCorrect: false },
    ],
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnswerOption = (index, isCorrect) => {
    setAnswered(true);
    setSelectedAnswer(index);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const NextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  
  useEffect(() => {
    if (showScore) {
      let start = 0;
      const targetPercent = (score / questions.length) * 100;
      const interval = setInterval(() => {
        start += 1;
        if (start <= targetPercent) {
          setProgress(start);
        } else {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [showScore, score]);

  return (
    <>
      <div className="app-container">
        <div className="quiz-card">
          <div className="quiz-title">Quiz App</div>

          {showScore ? (
            <div className="score-section">
              
                {score > questions.length / 2 && <Confetti />}

              
              <div
                className="circular-progress"
                style={{
                  "--percent": progress,
                  "--progress-color":
                    progress < 50
                      ? "#ef4444"
                      : progress < 80
                      ? "#facc15"
                      : "#22c55e",
                }}
              >
                <div className="inner-circle">{Math.round(progress)}%</div>
              </div>

              <p>
                🎉 You Scored {score} of {questions.length}
              </p>

              <button
                className="restart-btn"
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowScore(false);
                  setAnswered(false);
                  setSelectedAnswer(null);
                  setProgress(0);
                }}
              >
                🔄 Restart Quiz
              </button>
            </div>
          ) : (
            <div>
              <div>{questions[currentQuestion].questionText}</div>

              {questions[currentQuestion].answerOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOption(index, option.isCorrect)}
                  className={`quiz-button ${
                    answered
                      ? option.isCorrect
                        ? "correct"
                        : selectedAnswer === index
                        ? "wrong"
                        : ""
                      : ""
                  }`}
                >
                  {option.answerText}
                </button>
              ))}

              <button
                className={`next-btn ${answered ? "answered" : "not-answered"}`}
                onClick={NextQuestion}
                disabled={answered ? "" : "disabled"}
              >
                Next Question
              </button>

              <p className="question-info">
                Question {currentQuestion + 1} of {questions.length}
              </p>

              
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
