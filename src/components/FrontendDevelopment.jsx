import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./FrontendDevelopment.css";

import Roadmap from "./FrontendRoadmap";
import Courses from "./FrontendCourse";
import Games from "./FrontendGames";
import Practice from "./FrontendPractice";

function FrontendDevelopment({ onBack }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();

  // Use the existing Redux store from App.jsx.
  const learning = useSelector((state) => state.learning || {});
  const xp = learning.xp ?? 0;
  const completedPaths = learning.completedPaths ?? [];
  const progressData = learning.progress ?? {};

  const frontendProgress = Math.max(
    0,
    Math.min(100, progressData["Frontend Development"] ?? 38)
  );

  const totalModules = 8;
  const completedModules = Math.min(
    totalModules,
    Math.round((frontendProgress / 100) * totalModules)
  );

  const [learnerName, setLearnerName] = useState("Harshita");
  const [learningGoal, setLearningGoal] = useState(
    "Complete Frontend Development"
  );
  const [nameInput, setNameInput] = useState("Harshita");
  const [goalInput, setGoalInput] = useState("Complete Frontend Development");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const currentPath = location.pathname.replace(/\/+$/, "");
  const subpage = params.subpage;
  const lastSegment = currentPath.split("/").pop();

  const activePage =
    subpage ||
    (lastSegment !== "frontend" &&
    lastSegment !== "frontend-development" &&
    lastSegment !== "dashboard"
      ? lastSegment
      : "");

  const isFrontendHome =
    !activePage ||
    currentPath === "/frontend" ||
    currentPath === "/frontend-development" ||
    currentPath === "/dashboard";

  const progress = frontendProgress;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const openPage = (page) => navigate(`/frontend/${page}`);
  const goBackToFrontend = () => navigate("/frontend");

  const handleBackToDashboard = () => {
    window.scrollTo(0, 0);
    if (typeof onBack === "function") {
      onBack();
    } else {
      navigate("/dashboard");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!nameInput.trim()) {
      setFormError("Please enter your name.");
      setFormSuccess("");
      return;
    }

    if (!goalInput.trim()) {
      setFormError("Please enter your learning goal.");
      setFormSuccess("");
      return;
    }

    setLearnerName(nameInput.trim());
    setLearningGoal(goalInput.trim());
    setFormError("");
    setFormSuccess("Your learning goal has been saved!");
  };

  const handleCompleteModule = () => {
    if (completedModules >= totalModules) {
      setFormError("");
      setFormSuccess("You have completed all modules!");
      return;
    }

    const nextProgress = Math.min(
      100,
      Math.round(((completedModules + 1) / totalModules) * 100)
    );

    dispatch({
      type: "learning/updateProgress",
      payload: {
        pathName: "Frontend Development",
        percentage: nextProgress,
      },
    });

    dispatch({ type: "learning/addXP", payload: 50 });

    if (
      nextProgress === 100 &&
      !completedPaths.includes("Frontend Development")
    ) {
      dispatch({
        type: "learning/completePath",
        payload: "Frontend Development",
      });
    }

    setFormError("");
    setFormSuccess(
      nextProgress === 100
        ? "Congratulations! You completed Frontend Development! 🎉"
        : "Your progress has been updated! You earned 50 XP."
    );
  };

  const childPages = {
    roadmap: Roadmap,
    courses: Courses,
    games: Games,
    practice: Practice,
  };

  if (!isFrontendHome) {
    const ChildComponent = childPages[activePage];

    if (ChildComponent) {
      return (
        <ChildComponent
          onBack={goBackToFrontend}
          onStartCourse={() => navigate("/frontend/courses")}
          onPractice={() => navigate("/frontend/practice")}
          onGames={() => navigate("/frontend/games")}
        />
      );
    }

    return (
      <div className="frontend-page">
        <h2>Page not found</h2>
        <button
          type="button"
          className="back-btn"
          onClick={goBackToFrontend}
        >
          Back to Frontend Development
        </button>
      </div>
    );
  }

  const options = [
    {
      icon: "🗺️",
      title: "Roadmap",
      description:
        "Follow a step-by-step path to master Frontend Development from basics to advanced concepts.",
      button: "View Roadmap",
      className: "roadmap",
      page: "roadmap",
    },
    {
      icon: "📚",
      title: "Courses",
      description:
        "Learn HTML, CSS, JavaScript, React and more through structured lessons and modules.",
      button: "Explore Courses",
      className: "courses",
      page: "courses",
    },
    {
      icon: "🎮",
      title: "Games",
      description:
        "Learn frontend concepts through interactive games, missions and fun challenges.",
      button: "Play Games",
      className: "games",
      page: "games",
    },
    {
      icon: "💻",
      title: "Practice",
      description:
        "Strengthen your skills by solving coding problems and completing frontend challenges.",
      button: "Start Practice",
      className: "practice",
      page: "practice",
    },
  ];

  return (
    <div className="frontend-page">
      <nav className="frontend-navbar">
        <button
          type="button"
          className="frontend-logo"
          onClick={() => navigate("/")}
          aria-label="Go to Levelix home"
        >
          <img src="/logo.png" alt="Levelix Logo" className="levelix-logo" />
          <span className="logo-text">Levelix</span>
        </button>

        <div className="frontend-navbar-title">Frontend Development</div>

        <button
          type="button"
          className="back-btn"
          onClick={handleBackToDashboard}
          aria-label="Back to Dashboard"
        >
          <span className="back-arrow">←</span>
          <span className="back-text">Back to Dashboard</span>
        </button>
      </nav>

      <section className="frontend-hero">
        <h1>
          Frontend <span>Development</span>
        </h1>

        <div className="learning-stats">
          <div className="stat-card"><strong>Beginner</strong><span>Level</span></div>
          <div className="stat-card"><strong>15 Hours</strong><span>Learning Time</span></div>
          <div className="stat-card"><strong>{totalModules} Modules</strong><span>Course Content</span></div>
          <div className="stat-card"><strong>{progress}%</strong><span>Progress</span></div>
        </div>
      </section>

      <section className="frontend-options">
        <div className="section-heading">
          <span>YOUR LEARNING EXPERIENCE</span>
          <h2>How do you want to learn?</h2>
          <p>Pick an option and continue building your frontend skills.</p>
        </div>

        <div className="options-grid">
          {options.map((option, index) => (
            <div className={`learning-option ${option.className}`} key={option.title}>
              <div className="option-top">
                <div className="option-icon">{option.icon}</div>
                <span className="option-number">0{index + 1}</span>
              </div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <button type="button" className="option-btn" onClick={() => openPage(option.page)}>
                <span className="option-btn-text">{option.button}</span>
                <span className="option-btn-arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="progress-section">
        <div className="progress-card">
          <div className="progress-content">
            <span>YOUR PERSONAL LEARNING PLAN</span>
            <h3>Set your learning goal</h3>
            <p>Enter your name and the goal you want to achieve.</p>

            <form onSubmit={handleFormSubmit}>
              <div className="form-field">
                <label htmlFor="learner-name">Your name</label>
                <input
                  id="learner-name"
                  type="text"
                  value={nameInput}
                  onChange={(event) => {
                    setNameInput(event.target.value);
                    setFormError("");
                    setFormSuccess("");
                  }}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="learning-goal">Learning goal</label>
                <input
                  id="learning-goal"
                  type="text"
                  value={goalInput}
                  onChange={(event) => {
                    setGoalInput(event.target.value);
                    setFormError("");
                    setFormSuccess("");
                  }}
                  placeholder="e.g. Learn React"
                  required
                />
              </div>

              <button type="submit" className="option-btn">Save Learning Goal</button>
              {formError && <p role="alert" className="goal-error">{formError}</p>}
              {formSuccess && <p role="status" className="goal-success">{formSuccess}</p>}
            </form>

            <p className="current-goal">Current goal: <strong>{learningGoal}</strong></p>
          </div>
        </div>
      </section>

      <section className="progress-section">
        <div className="progress-card progress-summary-card">
          <div className="progress-left">
            <div className="progress-icon">⚡</div>
            <div className="progress-content">
              <span>Your Frontend Progress</span>
              <h3>Keep going, you're doing great!</h3>
              <p>Earn 50 XP when you mark the next module as completed.</p>
            </div>
          </div>

          <div className="progress-right">
            <strong className="progress-percentage">{progress}%</strong>
            <div
              className="progress-bar"
              role="progressbar"
              aria-label="Frontend learning progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="module-count">{completedModules} of {totalModules} modules completed</span>
            <button
              type="button"
              className="option-btn"
              onClick={handleCompleteModule}
              disabled={completedModules >= totalModules}
            >
              {completedModules >= totalModules ? "All Modules Completed" : "Complete Next Module"}
            </button>
            <p className="xp-total">Total XP: {xp}</p>
            {formSuccess && <p role="status" className="goal-success">{formSuccess}</p>}
            {formError && <p role="alert" className="goal-error">{formError}</p>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FrontendDevelopment;
