
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FrontendRoadmap.css";

const roadmap = [
  {
    number: "01",
    icon: "🌐",
    title: "HTML Fundamentals",
    duration: "2 Hours",
    topics: [
      "HTML structure",
      "Semantic HTML",
      "Forms & inputs",
      "Links & media",
    ],
    status: "completed",
  },
  {
    number: "02",
    icon: "🎨",
    title: "CSS Fundamentals",
    duration: "3 Hours",
    topics: [
      "Selectors",
      "Box model",
      "Flexbox",
      "Grid",
      "Responsive design",
    ],
    status: "completed",
  },
  {
    number: "03",
    icon: "⚡",
    title: "JavaScript Basics",
    duration: "3 Hours",
    topics: [
      "Variables",
      "Functions",
      "Arrays & objects",
      "DOM",
      "Events",
    ],
    status: "current",
  },
  {
    number: "04",
    icon: "⚛️",
    title: "React Fundamentals",
    duration: "3 Hours",
    topics: [
      "Components",
      "Props",
      "State",
      "Hooks",
      "Events",
    ],
    status: "locked",
  },
  {
    number: "05",
    icon: "📱",
    title: "Responsive UI",
    duration: "1 Hour",
    topics: [
      "Media queries",
      "Mobile layouts",
      "Responsive components",
    ],
    status: "locked",
  },
  {
    number: "06",
    icon: "🚀",
    title: "Frontend Project",
    duration: "3 Hours",
    topics: [
      "Build a real website",
      "Use React",
      "Responsive design",
      "Deploy project",
    ],
    status: "locked",
  },
];

function FrontendRoadmap({ onBack, onStartCourse }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    } else {
      navigate("/frontend");
    }
  };

  const handleStartCourse = () => {
    if (typeof onStartCourse === "function") {
      onStartCourse();
    } else {
      navigate("/frontend/courses");
    }
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="frontend-roadmap-page">
      {/* NAVBAR */}
      
      
<nav className="frontend-nav">
  <div
    className="frontend-logo"
    onClick={goHome}
    role="button"
    tabIndex={0}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        goHome();
      }
    }}
  >
    <img src="/logo.png" alt="Levelix Logo" />
    <span>Levelix</span>
  </div>

  <div className="roadmap-navbar-title">
    Frontend Roadmap
  </div>

  <button
    className="back-button"
    onClick={handleBack}
    type="button"
  >
    <span className="back-icon">←</span>
    <span className="back-text">Back</span>
  </button>
</nav>



      {/* HERO */}
      <section className="roadmap-hero">
        <h1>Become a Frontend Developer</h1>

        <p>
          Follow a practical roadmap to learn HTML, CSS,
          JavaScript and React — then build real projects
          that prove your skills.
        </p>

        {/* STATS */}
        <div className="roadmap-stats">
          <div className="roadmap-stat">
            <strong>15</strong>
            <span>Hours</span>
          </div>

          <div className="roadmap-stat">
            <strong>6</strong>
            <span>Stages</span>
          </div>

          <div className="roadmap-stat">
            <strong>30+</strong>
            <span>Challenges</span>
          </div>

          <div className="roadmap-stat">
            <strong>1</strong>
            <span>Project</span>
          </div>
        </div>

        <button
          className="start-course-button"
          onClick={handleStartCourse}
          type="button"
        >
          Start Course
          <span>→</span>
        </button>
      </section>

      {/* ROADMAP SECTION */}
      <section className="roadmap-section">
        <div className="roadmap-heading">
          <span>YOUR JOURNEY</span>

          <h2>
            From Beginner to
            <span> Job-Ready</span>
          </h2>

          <p>
            Complete each stage, practice your skills,
            and unlock the next level.
          </p>
        </div>

        {/* ROADMAP LIST */}
        <div className="roadmap-list">
          <div className="roadmap-line" />

          {roadmap.map((item) => (
            <div
              className={`roadmap-item ${item.status}`}
              key={item.number}
            >
              <div className="roadmap-number">
                {item.status === "completed" ? (
                  <span className="check-icon">✓</span>
                ) : (
                  item.number
                )}
              </div>

              <div className="roadmap-card">
                <div className="roadmap-card-top">
                  <div className="roadmap-title">
                    <div className="roadmap-icon">
                      {item.icon}
                    </div>

                    <div className="roadmap-title-text">
                      <span>STAGE {item.number}</span>
                      <h3>{item.title}</h3>
                    </div>
                  </div>

                  <div className="roadmap-duration">
                    <span>🕒</span>
                    {item.duration}
                  </div>
                </div>

                {/* TOPICS */}
                <div className="roadmap-topics">
                  {item.topics.map((topic) => (
                    <span key={topic}>
                      <small>✓</small>
                      {topic}
                    </span>
                  ))}
                </div>

                {/* STATUS */}
                <div className="roadmap-status">
                  {item.status === "completed" && (
                    <span className="completed-status">
                      <span>✓</span>
                      Completed
                    </span>
                  )}

                  {item.status === "current" && (
                    <span className="current-status">
                      <span>⚡</span>
                      Current Stage
                    </span>
                  )}

                  {item.status === "locked" && (
                    <span className="locked-status">
                      <span>🔒</span>
                      Locked
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="roadmap-bottom">
        <div className="roadmap-bottom-content">
          <div className="bottom-icon">🚀</div>

          <h2>Ready to start building?</h2>

          <p>
            Your journey from beginner to frontend developer
            starts with one step.
          </p>

          <button
            className="start-course-button"
            onClick={handleStartCourse}
            type="button"
          >
            Continue Learning
            <span>→</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default FrontendRoadmap;
