import React, {
  createContext,
  useContext,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useSelector,
  useDispatch
} from "react-redux";

import "./techblog.css";

/* =====================================================
   CONTEXT API: BLOG STATE
===================================================== */

const BlogContext = createContext(null);

function BlogProvider({ children }) {
  const [search, setSearch] = useState("");
  const [savedItems, setSavedItems] = useState([]);

  const toggleSave = (id) => {
    setSavedItems((previousItems) => {
      if (previousItems.includes(id)) {
        return previousItems.filter((item) => item !== id);
      }

      return [...previousItems, id];
    });
  };

  return (
    <BlogContext.Provider
      value={{
        search,
        setSearch,
        savedItems,
        toggleSave
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

function useBlog() {
  return useContext(BlogContext);
}

/* =====================================================
   FEATURE DATA
===================================================== */

const features = [
  {
    id: 1,
    icon: "🎮",
    title: "Learn Through Games",
    category: "Learning",
    description:
      "Master programming through interactive games, missions and challenges.",
    link: "/frontend/games",
    button: "Explore Games"
  },
  {
    id: 2,
    icon: "🗺️",
    title: "Learning Paths",
    category: "Roadmaps",
    description:
      "Follow structured roadmaps from beginner to job-ready skills.",
    link: "/access",
    button: "Explore Paths"
  },
  {
    id: 3,
    icon: "💻",
    title: "Coding Practice",
    category: "Practice",
    description:
      "Practice programming through coding challenges and exercises.",
    link: "/frontend/practice",
    button: "Start Practicing"
  },
  {
    id: 4,
    icon: "⚡",
    title: "Daily Challenges",
    category: "Challenges",
    description:
      "Solve daily challenges to build consistency and strengthen skills.",
    link: "/frontend/practice",
    button: "Try Challenges"
  },
  {
    id: 5,
    icon: "📊",
    title: "Progress Tracking",
    category: "Progress",
    description:
      "Monitor completed challenges and overall skill development.",
    link: "/dashboard",
    button: "View Progress"
  },
  {
    id: 6,
    icon: "🏆",
    title: "Leaderboards",
    category: "Community",
    description:
      "Earn XP and stay motivated through friendly competition.",
    link: "/community",
    button: "Join Community"
  }
];

/* =====================================================
   TECH BLOG PAGE
===================================================== */

function TechBlogContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Context API
  const {
    search,
    setSearch,
    savedItems,
    toggleSave
  } = useBlog();

  // Redux Toolkit: use existing learning slice
  const xp = useSelector(
    (state) => state.learning.xp
  );

  const completedPaths = useSelector(
    (state) => state.learning.completedPaths
  );

  // Form handling state
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // React Router: navigation
  const handleBack = () => {
    navigate(-1);
  };

  // Context API: search and filter
  const filteredFeatures = features.filter((feature) => {
    const searchText = search.toLowerCase().trim();

    return (
      feature.title.toLowerCase().includes(searchText) ||
      feature.description.toLowerCase().includes(searchText) ||
      feature.category.toLowerCase().includes(searchText)
    );
  });

  // Redux Toolkit: record a learning milestone
  const handleExplore = (feature) => {
    if (completedPaths.includes(feature.title)) {
      alert("You have already explored this feature!");
      return;
    }

    // Uses the existing learningSlice reducer in App.jsx.
    dispatch({
      type: "learning/completePath",
      payload: feature.title
    });

    dispatch({
      type: "learning/addXP",
      payload: 10
    });

    alert(`${feature.title} explored! You earned 10 XP.`);
  };

  // Form handling: validate email
  const handleSubscribe = (event) => {
    event.preventDefault();

    setEmailError("");
    setMessage("");

    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedEmail === "") {
      setEmailError("Please enter your email address.");
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setSubscribed(true);
    setMessage(
      "Thank you for subscribing to Levelix updates!"
    );
    setEmail("");
  };

  // Clear search
  const handleClearSearch = () => {
    setSearch("");
  };

  // Show saved features
  const handleShowSaved = () => {
    const savedTitles = features
      .filter((feature) => savedItems.includes(feature.id))
      .map((feature) => feature.title);

    setSearch(savedTitles.join(" "));
  };

  return (
    <div className="techblog-page">

      {/* NAVIGATION */}

      <nav className="techblog-navbar">
        <Link to="/" className="techblog-logo">
          Levelix<span>.</span>
        </Link>

        <div className="techblog-nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/access">Learning Paths</Link>
          <Link to="/community">Community</Link>
        </div>

        <button
          type="button"
          className="techblog-back-button"
          onClick={handleBack}
        >
          Back
        </button>
      </nav>

      {/* HERO */}

      <header className="techblog-hero">
        <p className="techblog-eyebrow">
          DISCOVER LEVELIX
        </p>

        <h1>
          Learn smarter.
          <br />
          <span>Grow faster.</span>
        </h1>

        <p className="techblog-hero-description">
          Explore the tools and features that make learning
          programming interactive, structured and rewarding.
        </p>

        <Link
          to="/access"
          className="techblog-primary-button"
        >
          Start Learning
        </Link>
      </header>

      {/* MAIN CONTENT */}

      <main className="techblog-main">

        {/* FEATURES */}

        <section className="techblog-features-section">
          <div className="techblog-section-heading">
            <p className="techblog-eyebrow">
              EXPLORE OUR PLATFORM
            </p>

            <h2>Everything you need to level up</h2>

            <p>
              Build skills, practise consistently and track
              your learning journey with Levelix.
            </p>
          </div>

          {/* CONTEXT API SEARCH */}

          <div className="techblog-search-area">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search features..."
              aria-label="Search Levelix features"
            />

            {search.trim() !== "" && (
              <button
                type="button"
                onClick={handleClearSearch}
              >
                Clear
              </button>
            )}
          </div>

          <p className="techblog-results-count">
            Showing {filteredFeatures.length} of {features.length} features
          </p>

          {/* FEATURE CARDS */}

          <div className="techblog-grid">
            {filteredFeatures.map((feature) => {
              const isSaved = savedItems.includes(feature.id);

              const isExplored = completedPaths.includes(
                feature.title
              );

              return (
                <article
                  className="techblog-card"
                  key={feature.id}
                >
                  <div className="techblog-card-top">
                    <span className="techblog-feature-icon">
                      {feature.icon}
                    </span>

                    <button
                      type="button"
                      className={`techblog-save-button ${
                        isSaved ? "saved" : ""
                      }`}
                      onClick={() => toggleSave(feature.id)}
                      aria-pressed={isSaved}
                    >
                      {isSaved ? "♥ Saved" : "♡ Save"}
                    </button>
                  </div>

                  <span className="techblog-category">
                    {feature.category}
                  </span>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>

                  <Link
                    to={feature.link}
                    className="techblog-card-link"
                  >
                    {feature.button} →
                  </Link>

                  <button
                    type="button"
                    className="techblog-explore-button"
                    onClick={() => handleExplore(feature)}
                    disabled={isExplored}
                  >
                    {isExplored
                      ? "✓ Explored"
                      : "Mark as Explored (+10 XP)"}
                  </button>
                </article>
              );
            })}
          </div>

          {filteredFeatures.length === 0 && (
            <div className="techblog-empty-state">
              <h3>No features found</h3>

              <p>
                Try searching for games, practice, progress
                or learning.
              </p>

              <button
                type="button"
                onClick={handleClearSearch}
              >
                Show All Features
              </button>
            </div>
          )}
        </section>

        {/* SAVED FEATURES */}

        <section className="techblog-saved-section">
          <div>
            <p className="techblog-eyebrow">
              YOUR COLLECTION
            </p>

            <h2>Your saved features</h2>

            <p>
              {savedItems.length === 0
                ? "Save features you want to explore later."
                : `You have saved ${savedItems.length} feature${
                    savedItems.length === 1 ? "" : "s"
                  }.`}
            </p>
          </div>

          <button
            type="button"
            className="techblog-secondary-button"
            onClick={handleShowSaved}
            disabled={savedItems.length === 0}
          >
            Find Saved Features
          </button>

          {savedItems.length > 0 && (
            <button
              type="button"
              className="techblog-secondary-button"
              onClick={handleClearSearch}
            >
              Show All Features
            </button>
          )}
        </section>

        {/* REDUX TOOLKIT SUMMARY */}

        <section className="techblog-progress-section">
          <p className="techblog-eyebrow">
            YOUR LEARNING ACTIVITY
          </p>

          <h2>Keep moving forward</h2>

          <div className="techblog-progress-stats">
            <div>
              <span>⭐</span>
              <h3>{xp} XP</h3>
              <p>Total experience points</p>
            </div>

            <div>
              <span>✅</span>
              <h3>{completedPaths.length}</h3>
              <p>Completed milestones</p>
            </div>

            <div>
              <span>📚</span>
              <h3>{features.length}</h3>
              <p>Available features</p>
            </div>
          </div>

          <p>
            Your XP and completed milestones are read from
            your existing Redux learning state.
          </p>
        </section>

        {/* NEWSLETTER FORM */}

        <section className="techblog-newsletter">
          <p className="techblog-eyebrow">
            STAY IN THE LOOP
          </p>

          <h2>Keep growing with Levelix</h2>

          <p>
            Subscribe to receive updates about learning features,
            challenges and platform improvements.
          </p>

          <form
            className="techblog-newsletter-form"
            onSubmit={handleSubscribe}
            noValidate
          >
            <label htmlFor="techblog-email">
              Email address
            </label>

            <div className="techblog-form-row">
              <input
                id="techblog-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError("");
                  setMessage("");
                  setSubscribed(false);
                }}
                placeholder="you@example.com"
                aria-describedby="techblog-form-feedback"
                aria-invalid={emailError !== ""}
                required
              />

              <button
                type="submit"
                disabled={subscribed}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            <div
              id="techblog-form-feedback"
              className={
                emailError
                  ? "techblog-form-error"
                  : "techblog-form-success"
              }
              role="status"
              aria-live="polite"
            >
              {emailError || message}
            </div>
          </form>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="techblog-footer">
        <Link to="/" className="techblog-logo">
          Levelix<span>.</span>
        </Link>

        <p>Master skills, not just courses.</p>

        <div className="techblog-footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/cookies">Cookies</Link>
        </div>

        <p className="techblog-copyright">
          © 2026 Levelix. Keep learning, keep growing.
        </p>
      </footer>
    </div>
  );
}

/* =====================================================
   MAIN COMPONENT
===================================================== */

function TechBlog() {
  return (
    <BlogProvider>
      <TechBlogContent />
    </BlogProvider>
  );
}

export default TechBlog;
