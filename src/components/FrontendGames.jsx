
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./FrontendGames.css";

function FrontendGames({ onBack }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use the existing Redux store configured in App.jsx
  const learning = useSelector(
    (state) => state.learning || {}
  );

  const xp = learning.xp ?? 0;
  const completedPaths = learning.completedPaths ?? [];

  const [activeGame, setActiveGame] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState([]);

  // Get the user name from the existing authentication setup
  // Pass user as a prop from App.jsx if you want the logged-in name.
  const [learnerName] = useState("Learner");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    window.scrollTo(0, 0);

    if (typeof onBack === "function") {
      onBack();
    } else {
      navigate("/frontend");
    }
  };

  const games = [
    {
      id: "html",
      icon: "🌐",
      title: "HTML Challenge",
      difficulty: "Easy",
      description:
        "Test your knowledge of HTML tags, structure and semantic elements.",
      challenges: 10,
      question: "Which HTML tag creates a hyperlink?",
      options: ["<p>", "<a>", "<h1>", "<img>"],
      correctAnswer: "<a>",
    },
    {
      id: "css",
      icon: "🎨",
      title: "CSS Master",
      difficulty: "Easy",
      description:
        "Complete styling challenges and master CSS layouts and designs.",
      challenges: 10,
      question: "Which CSS property changes text color?",
      options: ["font-size", "background", "color", "margin"],
      correctAnswer: "color",
    },
    {
      id: "javascript",
      icon: "⚡",
      title: "JavaScript Quest",
      difficulty: "Medium",
      description:
        "Solve JavaScript challenges and level up your programming skills.",
      challenges: 15,
      question: "Which keyword declares a block-scoped variable?",
      options: ["var", "let", "print", "echo"],
      correctAnswer: "let",
    },
    {
      id: "react",
      icon: "⚛️",
      title: "React Mission",
      difficulty: "Advanced",
      description:
        "Complete interactive React missions and build reusable components.",
      challenges: 15,
      question: "Which hook manages state in a React component?",
      options: ["useState", "useRoute", "usePage", "useStyle"],
      correctAnswer: "useState",
    },
  ];

  const startGame = (game) => {
    setActiveGame(game);
    setAnswer("");
    setFeedback("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!answer) {
      setFeedback("Please select an answer first.");
      return;
    }

    if (completed.includes(activeGame.id)) {
      setFeedback("You have already completed this challenge!");
      return;
    }

    if (answer === activeGame.correctAnswer) {
      setFeedback("Correct answer! 🎉 You earned 10 XP.");

      setCompleted((previous) => [
        ...previous,
        activeGame.id,
      ]);

      // Update XP using the existing slice in App.jsx
      dispatch({
        type: "learning/addXP",
        payload: 10,
      });
    } else {
      setFeedback("Incorrect answer. Try again!");
    }
  };

  const closeGame = () => {
    setActiveGame(null);
    setAnswer("");
    setFeedback("");
  };

  return (
    <div className="frontend-games-page">
      {/* NAVBAR */}

      <nav className="frontend-games-navbar">
        <div
          className="frontend-games-logo"
          onClick={() => navigate("/dashboard")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              navigate("/dashboard");
            }
          }}
        >
          <img
            src="/logo.png"
            alt="Levelix"
            className="levelix-logo"
          />

          <span>Levelix</span>
        </div>

        <div className="frontend-games-title">
          Frontend Games
        </div>

        <button
          type="button"
          className="games-back-btn"
          onClick={handleBack}
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </nav>

      <main className="frontend-games-content">
        {/* HERO */}

        <section className="games-hero">
          <div className="games-badge">
            🎮 Interactive Learning
          </div>

          <h1>Frontend Games</h1>

          <p>
            Learn frontend development through fun games,
            missions, quizzes and interactive challenges.
          </p>

          <div className="games-xp">
            <strong>
              👤 {learnerName}
            </strong>

            <strong>
              ⚡ {xp.toLocaleString()} XP
            </strong>

            <strong>
              🏆 {completed.length} Games Completed
            </strong>
          </div>
        </section>

        {/* GAME CARDS */}

        {!activeGame ? (
          <section className="games-grid">
            {games.map((game) => (
              <div className="game-card" key={game.id}>
                <div className="game-icon">
                  {game.icon}
                </div>

                <div className="game-card-top">
                  <h2>{game.title}</h2>
                  <span>{game.difficulty}</span>
                </div>

                <p>{game.description}</p>

                <strong>
                  {game.challenges} Challenges
                </strong>

                {completed.includes(game.id) && (
                  <p>✅ Challenge completed</p>
                )}

                <button
                  type="button"
                  onClick={() => startGame(game)}
                >
                  {completed.includes(game.id)
                    ? "Completed ✓"
                    : "Play Game →"}
                </button>
              </div>
            ))}
          </section>
        ) : (
          /* QUIZ FORM */

          <section className="games-grid">
            <div className="game-card">
              <div className="game-icon">
                {activeGame.icon}
              </div>

              <div className="game-card-top">
                <h2>{activeGame.title}</h2>
                <span>{activeGame.difficulty}</span>
              </div>

              <p>{activeGame.question}</p>

              <form onSubmit={handleSubmit}>
                {activeGame.options.map((option) => (
                  <label
                    key={option}
                    style={{
                      display: "block",
                      margin: "12px 0",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="gameAnswer"
                      value={option}
                      checked={answer === option}
                      onChange={(event) =>
                        setAnswer(event.target.value)
                      }
                      disabled={completed.includes(activeGame.id)}
                    />

                    {" "}{option}
                  </label>
                ))}

                <button
                  type="submit"
                  disabled={completed.includes(activeGame.id)}
                >
                  Submit Answer
                </button>
              </form>

              {feedback && (
                <p role="status">{feedback}</p>
              )}

              <button
                type="button"
                onClick={closeGame}
              >
                ← Back to Games
              </button>
            </div>
          </section>
        )}

        {/* BOTTOM CTA */}

        <section className="games-bottom">
          <div className="games-bottom-icon">🚀</div>

          <h2>Ready to level up?</h2>

          <p>
            Play, learn and earn XP while mastering
            frontend development.
          </p>
        </section>
      </main>
    </div>
  );
}

export default FrontendGames;
