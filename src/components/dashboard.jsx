
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import FrontendDevelopment from "./FrontendDevelopment";

function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showFrontend, setShowFrontend] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  /* ================= LEARNING PATHS ================= */

  const learningPaths = [
    {
      icon: "🎨",
      title: "Frontend Development",
      description: "HTML, CSS, JavaScript, React and modern frontend development.",
      level: "Beginner",
      hours: "15 Hours",
      totalModules: 8,
      completedModules: 5,
      progress: 68,
    },
    {
      icon: "🖥️",
      title: "Backend Development",
      description: "APIs, databases, authentication, servers and backend concepts.",
      level: "Intermediate",
      hours: "18 Hours",
      totalModules: 8,
      completedModules: 0,
      progress: 0,
    },
    {
      icon: "🔗",
      title: "Full Stack Development",
      description: "Frontend and backend development for complete web applications.",
      level: "Advanced",
      hours: "20 Hours",
      totalModules: 10,
      completedModules: 0,
      progress: 0,
    },
    {
      icon: "🧩",
      title: "Data Structures & Algorithms",
      description: "Arrays, strings, trees, graphs, recursion and algorithms.",
      level: "Intermediate",
      hours: "14 Hours",
      totalModules: 7,
      completedModules: 2,
      progress: 35,
    },
    {
      icon: "🧠",
      title: "AI & Machine Learning",
      description: "Machine learning, neural networks, AI algorithms and applications.",
      level: "Advanced",
      hours: "20 Hours",
      totalModules: 9,
      completedModules: 0,
      progress: 0,
    },
    {
      icon: "🐍",
      title: "Python Programming",
      description: "Python fundamentals, functions, OOP, modules and problem solving.",
      level: "Beginner",
      hours: "12 Hours",
      totalModules: 6,
      completedModules: 6,
      progress: 100,
    },
    {
      icon: "☕",
      title: "Java Development",
      description: "Java programming, OOP, collections and application development.",
      level: "Intermediate",
      hours: "16 Hours",
      totalModules: 8,
      completedModules: 0,
      progress: 0,
    },
    {
      icon: "🛡️",
      title: "Cyber Security",
      description: "Security fundamentals, networks, vulnerabilities and defense.",
      level: "Advanced",
      hours: "18 Hours",
      totalModules: 18,
      completedModules: 0,
      progress: 0,
    },
    {
      icon: "☁️",
      title: "Cloud Computing",
      description: "Cloud platforms, deployment, virtual machines and architecture.",
      level: "Intermediate",
      hours: "14 Hours",
      totalModules: 7,
      completedModules: 0,
      progress: 0,
    },
  ];

  /* ================= CHALLENGES ================= */

  const challenges = [
    {
      icon: "⚡",
      title: "JavaScript Arrays",
      difficulty: "Easy",
      xp: 50,
    },
    {
      icon: "🧠",
      title: "Python Logic Challenge",
      difficulty: "Medium",
      xp: 75,
    },
    {
      icon: "💻",
      title: "CSS Flexbox Challenge",
      difficulty: "Easy",
      xp: 50,
    },
  ];

  /* ================= SKILLS ================= */

  const skills = [
    { name: "JavaScript", percentage: 82 },
    { name: "React", percentage: 68 },
    { name: "CSS", percentage: 91 },
    { name: "DSA", percentage: 54 },
  ];

  /* ================= ACHIEVEMENTS ================= */

  const achievements = [
    {
      icon: "🔥",
      title: "7 Day Streak",
      description: "Learned for 7 days in a row",
    },
    {
      icon: "⚡",
      title: "XP Hunter",
      description: "Earned 2,000+ XP",
    },
    {
      icon: "🏆",
      title: "First Challenge",
      description: "Completed your first challenge",
    },
    {
      icon: "🎯",
      title: "Focused Learner",
      description: "Completed 10 learning activities",
    },
  ];

  /* ================= NAVIGATION ================= */

  const handlePathAction = (path) => {
    if (path.title === "Frontend Development") {
      setShowFrontend(true);
      return;
    }

    if (path.progress === 100) {
      window.alert(`${path.title} is already completed!`);
    } else if (path.progress > 0) {
      window.alert(`Continue learning: ${path.title}`);
    } else {
      window.alert(`Start learning: ${path.title}`);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate("/");
    }
  };

  const handleChallenge = (challenge) => {
    if (completedChallenges.includes(challenge.title)) return;

    setCompletedChallenges((previous) => [
      ...previous,
      challenge.title,
    ]);
  };

  /* ================= FRONTEND PAGE ================= */

  if (showFrontend) {
    return (
      <div className="frontend-page-wrapper">
        <FrontendDevelopment
          onBack={() => setShowFrontend(false)}
        />
      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  return (
    <div className="dashboard-page">
      {/* NAVBAR */}

      <nav className="dashboard-navbar">
        <div
          className="dashboard-logo"
          onClick={() => navigate("/dashboard")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter") navigate("/dashboard");
          }}
        >
          <img src="/logo.png" alt="Levelix Logo" />
          <span>Levelix</span>
        </div>

        <div className="dashboard-nav-links">
          <a href="#dashboard" className="active">
            Dashboard
          </a>
          <a href="#learning">Learning Paths</a>
          <a href="#challenges">Challenges</a>
          <a href="#practice">Practice</a>
        </div>

        <div className="dashboard-nav-right">
          <div className="nav-stat">
            <span className="nav-stat-icon">🔥</span>
            <div>
              <span className="nav-stat-value">7</span>
              <span className="nav-stat-label">Day Streak</span>
            </div>
          </div>

          <div className="nav-stat">
            <span className="nav-stat-icon">⚡</span>
            <div>
              <span className="nav-stat-value">2,990</span>
              <span className="nav-stat-label">XP</span>
            </div>
          </div>

          <div className="nav-level">
            <span>Level</span>
            <strong>8</strong>
          </div>

          {/* NOTIFICATIONS */}

          <div className="notification-wrapper">
            <button
              className="notification-button"
              aria-label="Toggle notifications"
              aria-expanded={notificationsOpen}
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
            >
              🔔
              <span className="notification-dot"></span>
            </button>

            {notificationsOpen && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h4>Notifications</h4>
                  <span>3 New</span>
                </div>

                <div className="notification-item">
                  <span>🔥</span>
                  <div>
                    <strong>Keep your streak alive!</strong>
                    <p>Complete today's challenge.</p>
                  </div>
                </div>

                <div className="notification-item">
                  <span>🏆</span>
                  <div>
                    <strong>New achievement unlocked</strong>
                    <p>You earned XP Hunter.</p>
                  </div>
                </div>

                <div className="notification-item">
                  <span>⚡</span>
                  <div>
                    <strong>Daily challenge ready</strong>
                    <p>Earn XP by practicing today.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PROFILE */}

          <div className="profile-wrapper">
            <button
              className="profile-button"
              aria-expanded={profileOpen}
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
            >
              <div className="profile-avatar">H</div>
              <div className="profile-name">
                <span>Harshita</span>
              </div>
              <span className="profile-arrow">⌄</span>
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-user">
                  <div className="profile-large-avatar">H</div>
                  <div>
                    <strong>Harshita</strong>
                    <span>Level 8 Learner</span>
                  </div>
                </div>

                <div className="dropdown-divider"></div>

                <button onClick={() => setProfileOpen(false)}>
                  👤 Profile
                </button>
                <button onClick={() => setProfileOpen(false)}>
                  ⚙️ Settings
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    document
                      .getElementById("practice")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  🎯 My Progress
                </button>

                <div className="dropdown-divider"></div>

                <button
                  className="logout-button"
                  onClick={handleLogout}
                >
                  🚪 Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}

      <main id="dashboard" className="dashboard-content">
        {/* WELCOME */}

        <section className="dashboard-welcome">
          <div className="welcome-copy">
            <span className="welcome-label">👋 WELCOME BACK</span>
            <h1>Ready to level up your skills?</h1>
            <p>
              Continue learning, complete challenges and keep
              building your skills every day.
            </p>
            <button
              className="welcome-cta"
              onClick={() => setShowFrontend(true)}
            >
              Continue Learning <span>→</span>
            </button>
          </div>

          <div className="welcome-streak">
            <div className="big-streak">🔥</div>
            <div>
              <strong>7 Days</strong>
              <span>Current Streak</span>
            </div>
          </div>
          <span className="welcome-decoration">✦</span>
        </section>

        {/* OVERVIEW */}

        <section className="overview-grid">
          <div className="overview-card xp-overview">
            <div className="overview-card-top">
              <div>
                <span className="overview-label">TOTAL XP</span>
                <h2>2,990</h2>
              </div>
              <div className="overview-icon">⚡</div>
            </div>

            <div className="xp-progress-info">
              <span>Level 8 Progress</span>
              <span>2,990 / 4,000 XP</span>
            </div>

            <div className="dashboard-progress">
              <div
                className="dashboard-progress-fill"
                style={{ width: "74.75%" }}
              ></div>
            </div>

            <span className="progress-hint">
              1,010 XP until Level 9
            </span>
          </div>

          <div className="overview-card">
            <div className="overview-card-top">
              <div>
                <span className="overview-label">CURRENT STREAK</span>
                <h2>7 Days</h2>
              </div>
              <div className="overview-icon streak-icon">🔥</div>
            </div>

            <div className="streak-days">
              {["M", "T", "W", "T", "F", "S", "S"].map(
                (day, index) => (
                  <span
                    className={index === 6 ? "today" : "completed"}
                    key={`${day}-${index}`}
                  >
                    {day}
                  </span>
                )
              )}
            </div>

            <span className="progress-hint">
              Keep going! Don't break your streak.
            </span>
          </div>

          <div className="overview-card">
            <div className="overview-card-top">
              <div>
                <span className="overview-label">CURRENT LEVEL</span>
                <h2>Level 8</h2>
              </div>
              <div className="level-circle">8</div>
            </div>

            <div className="level-stats">
              <div>
                <span>Completed</span>
                <strong>24</strong>
              </div>
              <div>
                <span>Challenges</span>
                <strong>{18 + completedChallenges.length}</strong>
              </div>
              <div>
                <span>Projects</span>
                <strong>4</strong>
              </div>
            </div>
          </div>
        </section>

        {/* CONTINUE LEARNING AND DAILY CHALLENGE */}

        <section className="dashboard-main-grid">
          <div className="dashboard-section continue-section">
            <div className="section-title-row">
              <h2>Continue Learning</h2>
              <button
                className="view-all-button"
                onClick={() =>
                  document
                    .getElementById("learning")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View All →
              </button>
            </div>

            <div className="continue-card">
              <div className="continue-icon">🎨</div>

              <div className="continue-details">
                <span className="continue-tag">CURRENT PATH</span>
                <h3>Frontend Development</h3>
                <p>
                  HTML, CSS, JavaScript, React and modern
                  frontend development.
                </p>

                <div className="continue-progress-info">
                  <span>68% Complete</span>
                  <span>5 / 8 Modules</span>
                </div>

                <div className="dashboard-progress">
                  <div
                    className="dashboard-progress-fill"
                    style={{ width: "68%" }}
                  ></div>
                </div>
              </div>

              <button
                className="continue-button"
                onClick={() => setShowFrontend(true)}
              >
                Continue →
              </button>
            </div>
          </div>

          <div className="dashboard-section challenge-card-section">
            <div className="section-title-row">
              <h2>Today's Challenge</h2>
              <span className="challenge-xp">+50 XP</span>
            </div>

            <div className="daily-challenge-card">
              <div className="daily-challenge-icon">⚡</div>
              <span className="challenge-difficulty">EASY</span>
              <h3>Practice JavaScript Arrays</h3>
              <p>
                Test your understanding of arrays and solve a
                quick coding problem.
              </p>

              <button
                className="challenge-button"
                onClick={() => navigate("/games")}
              >
                Start Challenge →
              </button>
            </div>
          </div>
        </section>

        {/* LEARNING PATHS */}

        <section id="learning" className="dashboard-section">
          <div className="section-title-row">
            <div>
              <span className="section-eyebrow">YOUR NEXT ADVENTURE</span>
              <h2>Learning Paths</h2>
            </div>
            <button
              className="view-all-button"
              onClick={() => navigate("/roadmap")}
            >
              Explore Paths →
            </button>
          </div>

          <div className="dashboard-path-grid">
            {learningPaths.map((path) => (
              <article className="dashboard-path-card" key={path.title}>
                <div className="dashboard-path-top">
                  <div className="dashboard-path-icon">{path.icon}</div>
                  <span className="dashboard-path-level">
                    {path.level}
                  </span>
                </div>

                <h3>{path.title}</h3>
                <p>{path.description}</p>

                <div className="dashboard-path-meta">
                  <span>🕒 {path.hours}</span>
                  <span>📚 {path.totalModules} Modules</span>
                </div>

                <div className="path-progress-info">
                  <span>{path.progress}%</span>
                  <span>
                    {path.completedModules} / {path.totalModules} Modules
                  </span>
                </div>

                <div className="dashboard-progress">
                  <div
                    className="dashboard-progress-fill"
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>

                {path.progress === 100 && (
                  <span className="completed-badge">✓ Completed</span>
                )}

                <button
                  className={`path-action-button ${
                    path.progress === 100 ? "completed-action" : ""
                  }`}
                  onClick={() => handlePathAction(path)}
                >
                  {path.progress === 100
                    ? "Review Path"
                    : path.progress > 0
                    ? "Continue →"
                    : "Start Learning →"}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* RECENT CHALLENGES */}

        <section id="challenges" className="dashboard-section">
          <div className="section-title-row">
            <div>
              <span className="section-eyebrow">PRACTICE EVERY DAY</span>
              <h2>Recent Challenges</h2>
            </div>
            <button
              className="view-all-button"
              onClick={() => navigate("/games")}
            >
              View Challenges →
            </button>
          </div>

          <div className="challenge-list">
            {challenges.map((challenge) => {
              const completed = completedChallenges.includes(
                challenge.title
              );

              return (
                <div
                  className={`challenge-list-item ${
                    completed ? "challenge-is-completed" : ""
                  }`}
                  key={challenge.title}
                >
                  <div className="challenge-list-icon">
                    {challenge.icon}
                  </div>

                  <div className="challenge-list-details">
                    <h3>{challenge.title}</h3>
                    <span>{challenge.difficulty}</span>
                  </div>

                  <strong className="challenge-list-xp">
                    +{challenge.xp} XP
                  </strong>

                  <button
                    className="challenge-small-button"
                    disabled={completed}
                    onClick={() => handleChallenge(challenge)}
                  >
                    {completed ? "✓ Completed" : "Complete"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* SKILLS AND ACHIEVEMENTS */}

        <section id="practice" className="dashboard-bottom-grid">
          <div className="dashboard-section skills-section">
            <div className="section-title-row">
              <div>
                <span className="section-eyebrow">YOUR GROWTH</span>
                <h2>Your Skills</h2>
              </div>
            </div>

            <div className="skills-list">
              {skills.map((skill) => (
                <div className="dashboard-skill" key={skill.name}>
                  <div className="skill-header">
                    <span>{skill.name}</span>
                    <strong>{skill.percentage}%</strong>
                  </div>

                  <div className="dashboard-progress">
                    <div
                      className="dashboard-progress-fill"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-section achievements-section">
            <div className="section-title-row">
              <div>
                <span className="section-eyebrow">CELEBRATE YOUR WINS</span>
                <h2>Achievements</h2>
              </div>
            </div>

            <div className="achievement-grid">
              {achievements.map((achievement, index) => (
                <div className="achievement-card" key={achievement.title}>
                  <div className="achievement-icon">
                    {index === 2 && completedChallenges.length > 0
                      ? "🏆"
                      : achievement.icon}
                  </div>

                  <div>
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}

        <section className="dashboard-final-cta">
          <div>
            <span>🚀 KEEP GOING</span>
            <h2>Your next level is closer than you think.</h2>
            <p>
              Complete today's challenge and keep your 7-day streak alive.
            </p>
          </div>

          <button onClick={() => navigate("/games")}>
            Start Today's Challenge →
          </button>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="dashboard-footer">
        <div className="dashboard-footer-container">
          <div className="dashboard-footer-brand">
            <div className="dashboard-logo">
              <img src="/logo.png" alt="Levelix Logo" />
              <span>Levelix</span>
            </div>
            <p>Learn. Practice. Build. Level Up.</p>
          </div>

          <div className="dashboard-footer-links">
            <div className="footer-column">
              <h4>Learn</h4>
              <button onClick={() => navigate("/roadmap")}>
                Learning Paths
              </button>
              <button onClick={() => navigate("/games")}>
                Challenges
              </button>
              <button onClick={() => navigate("/practice")}>
                Practice
              </button>
            </div>

            <div className="footer-column">
              <h4>Levelix</h4>
              <button onClick={() => navigate("/")}>About Us</button>
              <button onClick={() => navigate("/")}>Contact</button>
              <button onClick={() => navigate("/")}>Help Center</button>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <button onClick={() => navigate("/")}>
                Privacy Policy
              </button>
              <button onClick={() => navigate("/")}>
                Terms & Conditions
              </button>
              <button onClick={() => navigate("/")}>
                Cookie Policy
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-footer-bottom">
          <span>© {new Date().getFullYear()} Levelix. All rights reserved.</span>
          <span>Made for learners who want to level up 🚀</span>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
