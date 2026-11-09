
import { createContext, useContext, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

import "./App.css";

import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import FrontendDevelopment from "./components/FrontendDevelopment";
import FrontendRoadmap from "./components/FrontendRoadmap";
import FrontendCourse from "./components/FrontendCourse";
import FrontendGames from "./components/FrontendGames";
import FrontendPractice from "./components/FrontendPractice";
import Contact from "./components/contact";
import Community from "./components/community";
import About from "./components/about";
import Access from "./components/Access";
import Help from "./components/help";
import Privacy from "./components/privacy";
import TechBlog from "./components/techblog";
import Cookies from "./components/cookies";

/* =====================================================
   CONTEXT API: AUTHENTICATION
===================================================== */

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =====================================================
   REDUX TOOLKIT: LEARNING STATE
===================================================== */

const learningSlice = createSlice({
  name: "learning",

  initialState: {
    xp: 0,
    completedPaths: [],
    progress: {}
  },

  reducers: {
    addXP: (state, action) => {
      state.xp += action.payload;
    },

    completePath: (state, action) => {
      if (!state.completedPaths.includes(action.payload)) {
        state.completedPaths.push(action.payload);
      }
    },

    updateProgress: (state, action) => {
      const { pathName, percentage } = action.payload;
      state.progress[pathName] = percentage;
    }
  }
});

const { addXP, completePath, updateProgress } =
  learningSlice.actions;

const store = configureStore({
  reducer: {
    learning: learningSlice.reducer
  }
});

/* =====================================================
   LEARNING PATH DATA
===================================================== */

const learningPaths = [
  {
    icon: "🎨",
    name: "Frontend Development",
    level: "Beginner",
    description:
      "Learn HTML, CSS, JavaScript, React and modern frontend development.",
    hours: "15 Hours",
    modules: "8 Modules",
    focus: "Build & Design",
    button: "Start Learning"
  },
  {
    icon: "🖥️",
    name: "Backend Development",
    level: "Intermediate",
    description:
      "Learn APIs, databases, authentication, servers and backend concepts.",
    hours: "18 Hours",
    modules: "8 Modules",
    focus: "Logic & APIs",
    button: "Start Learning"
  },
  {
    icon: "🔗",
    name: "Full Stack Development",
    level: "Advanced",
    description:
      "Build complete web applications using frontend and backend technologies.",
    hours: "20 Hours",
    modules: "10 Modules",
    focus: "End-to-End",
    button: "Start Learning"
  },
  {
    icon: "🧩",
    name: "Data Structures & Algorithms",
    level: "Intermediate",
    description:
      "Practice arrays, strings, trees, graphs, recursion and algorithms.",
    hours: "14 Hours",
    modules: "7 Modules",
    focus: "Problem Solving",
    button: "Continue Learning"
  },
  {
    icon: "🧠",
    name: "AI & Machine Learning",
    level: "Advanced",
    description:
      "Learn machine learning, neural networks and intelligent applications.",
    hours: "20 Hours",
    modules: "9 Modules",
    focus: "Intelligent Systems",
    button: "Start Learning"
  },
  {
    icon: "🐍",
    name: "Python Programming",
    level: "Beginner",
    description:
      "Learn Python fundamentals, functions, OOP and problem solving.",
    hours: "12 Hours",
    modules: "6 Modules",
    focus: "Core Programming",
    button: "Start Learning"
  },
  {
    icon: "☕",
    name: "Java Development",
    level: "Intermediate",
    description:
      "Learn Java, OOP, collections and exception handling.",
    hours: "16 Hours",
    modules: "8 Modules",
    focus: "Object-Oriented",
    button: "Start Learning"
  },
  {
    icon: "🛡️",
    name: "Cyber Security",
    level: "Advanced",
    description:
      "Learn networks, vulnerabilities, ethical hacking and defense.",
    hours: "18 Hours",
    modules: "8 Modules",
    focus: "Security Fundamentals",
    button: "Start Learning"
  },
  {
    icon: "☁️",
    name: "Cloud Computing",
    level: "Intermediate",
    description:
      "Learn cloud platforms, deployment, storage and architecture.",
    hours: "14 Hours",
    modules: "7 Modules",
    focus: "Cloud Essentials",
    button: "Start Learning"
  }
];

/* =====================================================
   HOMEPAGE
===================================================== */

function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const xp = useSelector((state) => state.learning.xp);

  const completedPaths = useSelector(
    (state) => state.learning.completedPaths
  );

  const progress = useSelector(
    (state) => state.learning.progress
  );

  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  const goToAccess = () => {
    setMenuOpen(false);
    navigate("/access");
  };

  const goToSignup = () => {
    setMenuOpen(false);
    navigate("/signup");
  };

  const selectPath = (path) => {
    if (completedPaths.includes(path.name)) {
      alert(`${path.name} is already completed!`);
      return;
    }

    navigate("/access");
  };

  const features = [
    {
      icon: "🎮",
      title: "Learn Through Games",
      description:
        "Master programming through interactive games, missions and challenges."
    },
    {
      icon: "🗺️",
      title: "Learning Paths",
      description:
        "Follow structured roadmaps from beginner to job-ready skills."
    },
    {
      icon: "💻",
      title: "Coding Practice",
      description:
        "Practice programming through coding challenges and exercises."
    },
    {
      icon: "⚡",
      title: "Daily Challenges",
      description:
        "Solve daily challenges to build consistency and strengthen skills."
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description:
        "Monitor completed challenges and overall skill development."
    },
    {
      icon: "🏆",
      title: "Leaderboards",
      description:
        "Earn XP and stay motivated through friendly competition."
    }
  ];

  const steps = [
    ["01", "Choose Your Goal", "Select the skill you want to improve."],
    ["02", "Learn Step by Step", "Follow structured lessons."],
    ["03", "Practice Daily", "Solve challenges to strengthen your skills."],
    ["04", "Track Your Progress", "Earn XP and complete milestones."]
  ];

  const stages = [
    ["📖", "Learn", "Understand the concepts"],
    ["⚡", "Practice", "Apply what you learn"],
    ["🎯", "Challenge", "Test your skills"],
    ["🏆", "Master", "Build real confidence"]
  ];

  return (
    <div className="levelix-app">

      {/* NAVBAR */}

      <nav className="levelix-navbar">
        <div className="levelix-logo">
          <img src="/logo.png" alt="Levelix Logo" />
          <span>Levelix</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#process">Process</a>
          <a href="#learning-paths">Learning Paths</a>
          <a href="#challenges">Challenges</a>
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <span>Welcome, {user.name}</span>

              <button
                className="levelix-btn levelix-btn-secondary"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="levelix-btn levelix-btn-secondary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="levelix-btn levelix-btn-primary"
                onClick={goToSignup}
              >
                Get Started →
              </button>
            </>
          )}
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}

      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <a href="#features" onClick={() => setMenuOpen(false)}>
          Features
        </a>

        <a href="#process" onClick={() => setMenuOpen(false)}>
          Process
        </a>

        <a href="#learning-paths" onClick={() => setMenuOpen(false)}>
          Learning Paths
        </a>

        <a href="#challenges" onClick={() => setMenuOpen(false)}>
          Challenges
        </a>

        <button
          className="levelix-btn levelix-btn-secondary"
          onClick={() => {
            setMenuOpen(false);
            navigate("/login");
          }}
        >
          Login
        </button>

        <button
          className="levelix-btn levelix-btn-primary"
          onClick={goToSignup}
        >
          Get Started
        </button>
      </div>

      {/* HERO */}

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            ✨ The Next-Gen Skill Platform
          </div>

          <h1 className="hero-title">
            Master Skills,
            <br />
            <span>Not Just Courses.</span>
          </h1>

          <p className="hero-description">
            Learn through practice, games, and challenges —
            so you don't just finish courses, you actually
            build skills.
          </p>

          <div className="hero-buttons">
            <button
              className="levelix-btn levelix-btn-primary"
              onClick={goToAccess}
            >
              🚀 Start Learning Free
            </button>

            <button
              className="levelix-btn levelix-btn-secondary"
              onClick={goToAccess}
            >
              🧭 Explore Learning Paths
            </button>
          </div>

          <div className="hero-benefits">
            <span>🕒 Learn at your own pace</span>
            <span>☑️ Solve challenges regularly</span>
            <span>📈 Track your progress</span>
          </div>
        </div>

        {/* DASHBOARD PREVIEW */}

        <div className="dashboard-preview">
          <div className="dashboard-header">
            <div className="dashboard-user">
              <div className="dashboard-avatar">
                {user?.name?.slice(0, 2).toUpperCase() || "AM"}
              </div>

              <div>
                <h3>{user?.name || "Alex Morgan"}</h3>
                <span>Level 12 Learner</span>
              </div>
            </div>

            <div className="streak">🔥 18 Day Streak</div>
          </div>

          <div className="xp-box">
            <div className="xp-header">
              <span>XP Progress</span>
              <span>{xp.toLocaleString()} XP</span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min((xp / 5000) * 100, 100)}%`
                }}
              />
            </div>
          </div>

          <div className="mini-cards">
            <div className="mini-card">
              <span className="mini-card-label">
                TODAY'S CHALLENGE
              </span>

              <p>Practice JavaScript Arrays</p>

              <button
                className="mini-card-bottom"
                onClick={() => dispatch(addXP(50))}
              >
                ⚡ Complete Challenge (+50 XP)
              </button>
            </div>

            <div className="mini-card">
              <span className="mini-card-label">CURRENT PATH</span>
              <p>Frontend Development</p>

              <span className="mini-card-bottom">
                {progress["Frontend Development"] ?? 38}% Progress
              </span>
            </div>
          </div>

          <span className="active-skill-label">
            Active Skill Mastery
          </span>

          <div className="skills-grid">
            {[
              ["JavaScript", "82%"],
              ["React", "68%"],
              ["CSS", "91%"],
              ["DSA", "54%"]
            ].map(([skill, score]) => (
              <div className="skill-item" key={skill}>
                <span>{skill}</span>
                <span>{score}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section id="features" className="features-section">
        <div className="section-heading">
          <h2>Everything You Need to Build Real Skills</h2>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}

      <section id="process" className="process-section">
        <div className="process-container">
          <div className="process-heading">
            <h2>Learn. Practice. Build. Level Up.</h2>
          </div>

          <div className="journey">
            <div className="journey-line" />

            {steps.map(([number, title, description]) => (
              <div className="step" key={number}>
                <div className="step-number">{number}</div>

                <div className="step-content">
                  <span className="step-label">STEP {number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING PATHS */}

      <section id="learning-paths" className="learning-paths">
        <div className="section-heading">
          <h2>Choose Your Learning Path</h2>
          <p>
            Follow a structured path and build skills step by step.
          </p>
        </div>

        <div className="learning-paths-grid">
          {learningPaths.map((path) => {
            const completed = completedPaths.includes(path.name);

            return (
              <div className="learning-path-card" key={path.name}>
                <div className="path-top">
                  <div className="path-icon">{path.icon}</div>
                  <span className="path-level">{path.level}</span>
                </div>

                <h3>{path.name}</h3>
                <p>{path.description}</p>

                <div className="path-info">
                  <span>🕒 {path.hours}</span>
                  <span>📚 {path.modules}</span>
                </div>

                <div className="path-focus">
                  <span className="focus-label">Focus</span>
                  <span className="focus-badge">{path.focus}</span>
                </div>

                <button
                  className="path-button"
                  onClick={() => selectPath(path)}
                >
                  {completed ? "✓ Completed" : path.button + " →"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* CHALLENGES */}

      <section id="challenges" className="challenges-section">
        <div className="challenge-heading">
          <h2>Your Skills Get Stronger</h2>
        </div>

        <div className="challenge-container">
          <div className="level-labels">
            <span>Beginner</span>
            <span>Advanced</span>
          </div>

          <div className="challenge-stages">
            <div className="challenge-line" />

            {stages.map(([icon, title, description]) => (
              <div className="challenge-stage" key={title}>
                <div className="challenge-circle">{icon}</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="skill-growth-message">
          <p>
            <strong>Learning Path</strong> →{" "}
            <strong>Challenges</strong> →{" "}
            <strong>Skill Growth</strong>
          </p>
        </div>
      </section>

      {/* CTA */}

      <section className="cta-section">
        <div className="cta-box">
          <h2>Your Next Level Starts Here.</h2>
          <p>Stop collecting courses. Start building skills.</p>

          <div className="cta-buttons">
            <button
              className="levelix-btn cta-primary"
              onClick={goToAccess}
            >
              🚀 Start Learning Free
            </button>

            <button
              className="levelix-btn cta-secondary"
              onClick={goToAccess}
            >
              🧭 Explore Learning Paths
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="levelix-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <div className="levelix-logo">
                <img src="/logo.png" alt="Levelix Logo" />
                <span>Levelix</span>
              </div>

              <p className="footer-description">
                Build real skills through learning, practice,
                challenges and consistent growth.
              </p>

              <div className="footer-socials">
                <button onClick={() => alert("GitHub link selected.")}>
                  💻
                </button>

                <button onClick={() => alert("LinkedIn link selected.")}>
                  💼
                </button>

                <button onClick={() => navigate("/community")}>
                  👥
                </button>
              </div>
            </div>

            <div className="footer-column">
              <h4>Product</h4>

              <p className="footer-link" onClick={goToAccess}>
                Learning Paths
              </p>

              <p className="footer-link" onClick={goToAccess}>
                Challenges
              </p>

              <p className="footer-link" onClick={goToAccess}>
                Coding Practice
              </p>

              <p className="footer-link" onClick={goToAccess}>
                Progress Tracking
              </p>
            </div>

            <div className="footer-column">
              <h4>Learn</h4>

              <p className="footer-link" onClick={goToAccess}>
                Frontend Development
              </p>

              <p className="footer-link" onClick={goToAccess}>
                Backend Development
              </p>

              <p className="footer-link" onClick={goToAccess}>
                DSA
              </p>

              <p className="footer-link" onClick={goToAccess}>
                AI & Machine Learning
              </p>
            </div>

            <div className="footer-column">
              <h4>Company</h4>

              <p
                className="footer-link"
                onClick={() => navigate("/about")}
              >
                About Levelix
              </p>

              <p
                className="footer-link"
                onClick={() => navigate("/community")}
              >
                Community
              </p>

              <p
                className="footer-link"
                onClick={() => navigate("/help")}
              >
                Help Center
              </p>

              <p
                className="footer-link"
                onClick={() => navigate("/contact")}
              >
                Contact
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Levelix. All rights reserved.</span>

            <div className="footer-legal">
              <span
                className="footer-legal-link"
                onClick={() => navigate("/privacy")}
              >
                Privacy
              </span>

              <span
                className="footer-legal-link"
                onClick={() => alert("Terms and Conditions coming soon!")}
              >
                Terms
              </span>

              <span
  className="footer-legal-link"
  onClick={() => navigate("/cookies")}
>
  Cookies
</span>

<span
  className="footer-legal-link"
  onClick={() => navigate("/techblog")}
>
  Tech Blog
</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =====================================================
   ROUTES
===================================================== */

function AppRoutes() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (userData) => {
    login(userData);
    navigate("/dashboard");
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <Login
            onBack={() => navigate("/")}
            onSignup={() => navigate("/signup")}
            onLogin={handleLogin}
          />
        }
      />

      <Route
        path="/signup"
        element={
          <Signup
            onBack={() => navigate("/")}
            onLogin={() => navigate("/login")}
            onSignup={handleLogin}
          />
        }
      />

      <Route
        path="/access"
        element={
          <Access
            onBack={() => navigate("/")}
            onLogin={() => navigate("/login")}
            onSignup={() => navigate("/signup")}
          />
        }
      />

      <Route
        path="/dashboard"
        element={<Dashboard onLogout={() => navigate("/")} />}
      />

      <Route
        path="/frontend"
        element={<FrontendDevelopment onBack={() => navigate("/dashboard")} />}
      />

      <Route
        path="/frontend-development"
        element={<FrontendDevelopment onBack={() => navigate("/dashboard")} />}
      />

      <Route
        path="/frontend/:subpage"
        element={<FrontendDevelopment onBack={() => navigate("/dashboard")} />}
      />

      <Route
        path="/roadmap"
        element={
          <FrontendRoadmap
            onBack={() => navigate("/frontend")}
            onStartCourse={() => navigate("/frontend/courses")}
          />
        }
      />

      <Route
        path="/courses"
        element={
          <FrontendCourse
            onBack={() => navigate("/frontend")}
            onPractice={() => navigate("/frontend/practice")}
          />
        }
      />

      <Route
        path="/games"
        element={<FrontendGames onBack={() => navigate("/frontend")} />}
      />

      <Route
        path="/practice"
        element={
          <FrontendPractice
            onBack={() => navigate("/frontend")}
            onGames={() => navigate("/frontend/games")}
          />
        }
      />

      <Route
        path="/contact"
        element={<Contact onBack={() => navigate(-1)} />}
      />

      <Route
        path="/community"
        element={<Community onBack={() => navigate(-1)} />}
      />

      <Route
        path="/about"
        element={<About onBack={() => navigate(-1)} />}
      />

      <Route
        path="/help"
        element={<Help onBack={() => navigate(-1)} />}
      />

      <Route
        path="/privacy"
        element={<Privacy onBack={() => navigate(-1)} />}
      />
      <Route
  path="/techblog"
  element={<TechBlog />}
/>

<Route
  path="/cookies"
  element={<Cookies onBack={() => navigate(-1)} />}
/>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/* =====================================================
   MAIN APP: ALL PROVIDERS IN THIS FILE
===================================================== */

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
