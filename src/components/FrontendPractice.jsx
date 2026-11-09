import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./FrontendPractice.css";

/* =====================================================
   QUESTIONS
===================================================== */

const questions = [
  {
    id: 1,
    topic: "JavaScript",
    difficulty: "Easy",
    question:
      "Which keyword is used to declare a variable that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: "const",
  },
  {
    id: 2,
    topic: "HTML",
    difficulty: "Easy",
    question: "Which HTML element is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>",
  },
  {
    id: 3,
    topic: "CSS",
    difficulty: "Easy",
    question: "Which CSS property is used to create a flexbox layout?",
    options: [
      "display: flex",
      "position: flex",
      "layout: flex",
      "flex: display",
    ],
    answer: "display: flex",
  },
  {
    id: 4,
    topic: "JavaScript",
    difficulty: "Medium",
    question: "What does Array.map() return?",
    options: [
      "The original array only",
      "A new array",
      "A number",
      "A string",
    ],
    answer: "A new array",
  },
  {
    id: 5,
    topic: "React",
    difficulty: "Medium",
    question:
      "Which hook is commonly used to manage state in a React component?",
    options: ["useEffect", "useState", "useContext", "useRef"],
    answer: "useState",
  },
];

/* =====================================================
   FRONTEND PRACTICE
   Uses the existing App.jsx Redux store and Router.
===================================================== */

function FrontendPractice({
  onBack,
  onGames,
  userName = "Learner",
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Read XP from the existing Redux store.
  const totalXP = useSelector(
    (state) => state.learning?.xp ?? 0
  );

  // Quiz state.
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Feedback form state.
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] =
    useState(false);

  const question = questions[current];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ================= NAVIGATION ================= */

  const handleBack = () => {
    window.scrollTo(0, 0);

    if (typeof onBack === "function") {
      onBack();
    } else {
      navigate("/frontend");
    }
  };

  const handleGames = () => {
    window.scrollTo(0, 0);

    if (typeof onGames === "function") {
      onGames();
    } else {
      navigate("/frontend/games");
    }
  };

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
    navigate("/dashboard");
  };

  const handleLogoKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleLogoClick();
    }
  };

  /* ================= ANSWER HANDLING ================= */

  const submitAnswer = () => {
    if (!selected || answered) {
      return;
    }

    setAnswered(true);

    if (selected === question.answer) {
      setScore((previous) => previous + 100);

      setCorrectAnswers((previous) => previous + 1);

      // Uses the existing Redux action from App.jsx.
      dispatch({
        type: "learning/addXP",
        payload: 100,
      });
    }
  };

  /* ================= NEXT QUESTION ================= */

  const nextQuestion = () => {
    if (current === questions.length - 1) {
      setFinished(true);
      window.scrollTo(0, 0);
      return;
    }

    setCurrent((previous) => previous + 1);
    setSelected("");
    setAnswered(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ================= RESET QUIZ ================= */

  const restartQuiz = () => {
    setCurrent(0);
    setSelected("");
    setAnswered(false);
    setFinished(false);
    setScore(0);
    setCorrectAnswers(0);
    setFeedback("");
    setFeedbackSubmitted(false);

    // Previously earned Redux XP is retained.
    window.scrollTo(0, 0);
  };

  /* ================= FEEDBACK FORM ================= */

  const submitFeedback = (event) => {
    event.preventDefault();

    if (!feedback.trim()) {
      return;
    }

    // Feedback is confirmed locally.
    // Backend integration can be added later.
    setFeedbackSubmitted(true);
  };

  const renderFeedbackForm = () => (
    <div className="course-form-card">
      <h2>💬 Share Your Feedback</h2>

      <p>
        Tell us how we can improve your learning experience.
      </p>

      <form onSubmit={submitFeedback}>
        <label htmlFor="practice-feedback">
          Your feedback
        </label>

        <textarea
          id="practice-feedback"
          name="feedback"
          value={feedback}
          onChange={(event) => {
            setFeedback(event.target.value);
            setFeedbackSubmitted(false);
          }}
          placeholder="Write your suggestions here..."
          rows={4}
          required
        />

        <button
          type="submit"
          disabled={!feedback.trim()}
        >
          Submit Feedback
        </button>

        {feedbackSubmitted && (
          <p role="status">
            Thank you! Your feedback has been submitted.
          </p>
        )}
      </form>
    </div>
  );

  /* ================= SHARED NAVBAR ================= */

  const renderNavbar = () => (
    <nav className="practice-navbar">
      <div
        className="practice-logo"
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleLogoKeyDown}
        aria-label="Go to Levelix dashboard"
      >
        <img src="/logo.png" alt="Levelix" />
        <span>Levelix</span>
      </div>

      <div className="practice-navbar-title">
        Frontend Practice
      </div>

      <button
        type="button"
        className="practice-back-btn"
        onClick={handleBack}
      >
        <span>←</span>
        <span>Back</span>
      </button>
    </nav>
  );

  /* =====================================================
     RESULT SCREEN
  ===================================================== */

  if (finished) {
    return (
      <div className="practice-page">
        {renderNavbar()}

        <main className="practice-result">
          <div className="result-icon">🏆</div>

          <span>PRACTICE COMPLETE</span>

          <h1>Great Work!</h1>

          <p>
            You completed all frontend practice questions.
          </p>

          <div className="final-score">
            <strong>{score}</strong>
            <span>XP Earned</span>
          </div>

          <p>
            Correct answers: {correctAnswers} /{" "}
            {questions.length}
          </p>

          <p>
            Learner: {userName} · Total XP:{" "}
            {totalXP.toLocaleString()}
          </p>

          <div className="result-buttons">
            <button type="button" onClick={handleBack}>
              ← Back to Course
            </button>

            <button type="button" onClick={handleGames}>
              Play Games →
            </button>

            <button type="button" onClick={restartQuiz}>
              Try Again ↻
            </button>
          </div>

          {renderFeedbackForm()}
        </main>
      </div>
    );
  }

  /* =====================================================
     PRACTICE SCREEN
  ===================================================== */

  return (
    <div className="practice-page">
      {renderNavbar()}

      <main className="practice-container">
        <div className="practice-heading">
          <span>FRONTEND PRACTICE</span>

          <h1>Test Your Skills</h1>

          <p>
            Solve problems, earn XP and strengthen what you learned.
          </p>
        </div>

        {/* QUESTION PROGRESS */}

        <div className="question-progress">
          <div className="progress-info">
            <span>
              Question {current + 1} of {questions.length}
            </span>

            <strong>{question.difficulty}</strong>
          </div>

          <div className="question-progress-track">
            <div
              style={{
                width: `${
                  ((current + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* QUESTION CARD */}

        <div className="question-card">
          <div className="question-meta">
            <span>{question.topic}</span>
            <span>+100 XP</span>
          </div>

          <h2>{question.question}</h2>

          <div className="answer-options">
            {question.options.map((option) => {
              let className = "answer-option";

              if (selected === option) {
                className += " selected";
              }

              if (
                answered &&
                option === question.answer
              ) {
                className += " correct";
              }

              if (
                answered &&
                selected === option &&
                option !== question.answer
              ) {
                className += " wrong";
              }

              return (
                <button
                  key={option}
                  type="button"
                  className={className}
                  disabled={answered}
                  onClick={() => setSelected(option)}
                >
                  <span>{option}</span>

                  {answered &&
                    option === question.answer && (
                      <span className="option-icon">
                        ✓
                      </span>
                    )}

                  {answered &&
                    selected === option &&
                    option !== question.answer && (
                      <span className="option-icon wrong-icon">
                        ✕
                      </span>
                    )}
                </button>
              );
            })}
          </div>

          {/* ANSWER FEEDBACK */}

          {answered && (
            <div
              className={
                selected === question.answer
                  ? "answer-feedback correct-feedback"
                  : "answer-feedback wrong-feedback"
              }
              role="status"
            >
              {selected === question.answer
                ? "🎉 Correct! You earned 100 XP."
                : `❌ Not quite. The correct answer is ${question.answer}.`}
            </div>
          )}

          {/* ACTION BUTTON */}

          {!answered ? (
            <button
              type="button"
              className="submit-answer"
              onClick={submitAnswer}
              disabled={!selected}
            >
              Check Answer →
            </button>
          ) : (
            <button
              type="button"
              className="submit-answer"
              onClick={nextQuestion}
            >
              {current === questions.length - 1
                ? "Finish Practice"
                : "Next Question →"}
            </button>
          )}
        </div>

        {renderFeedbackForm()}
      </main>
    </div>
  );
}

export default FrontendPractice;
