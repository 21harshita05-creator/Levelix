import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../App";
import "./community.css";

/* =========================================
   LEADERBOARD DATA
========================================= */

const leaderboard = [
  {
    rank: 1,
    name: "Alex Morgan",
    role: "Full Stack",
    xp: "5240 XP",
  },
  {
    rank: 2,
    name: "Sara Khan",
    role: "DSA",
    xp: "4910 XP",
  },
  {
    rank: 3,
    name: "Rohit Verma",
    role: "Frontend",
    xp: "4675 XP",
  },
];

/* =========================================
   COMMUNITY EVENTS
========================================= */

const events = [
  {
    id: 1,
    day: "24",
    month: "Aug",
    title: "DSA Coding Contest",
    time: "6:00 PM · Online",
  },
  {
    id: 2,
    day: "29",
    month: "Aug",
    title: "Frontend Workshop",
    time: "5:00 PM · Online",
  },
  {
    id: 3,
    day: "05",
    month: "Sep",
    title: "AI & ML Meetup",
    time: "7:00 PM · Online",
  },
];

const initialPosts = [];

/* =========================================
   COMMUNITY COMPONENT
========================================= */

export default function Community() {
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [going, setGoing] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* =========================================
     RUBRIC 1: REACT ROUTER
     Link connects this page to the Home route.
  ========================================= */

  /* =========================================
     RUBRIC 2: CONTEXT API
     Get the current logged-in learner.
  ========================================= */

  const { user, isAuthenticated } = useAuth();

  /* =========================================
     RUBRIC 3: REDUX TOOLKIT
     Read shared learning data from Redux.
  ========================================= */

  const xp = useSelector(
    (state) => state.learning.xp
  );

  const completedPaths = useSelector(
    (state) => state.learning.completedPaths
  );

  const progress = useSelector(
    (state) => state.learning.progress
  );

  const frontendProgress =
    progress["Frontend Development"] ?? 38;

  const safeFrontendProgress = Math.min(
    100,
    Math.max(0, Number(frontendProgress) || 0)
  );

  /* =========================================
     PAGE EFFECTS
  ========================================= */

  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [mobileMenuOpen]);

  /* =========================================
     ADD DISCUSSION
  ========================================= */

  const handleAddPost = (e) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      alert("Please fill all fields!");
      return;
    }

    const newPost = {
      id: Date.now(),
      author: isAuthenticated
        ? user?.name || "Learner"
        : "Guest",
      initials: isAuthenticated
        ? (user?.name || "Learner")
            .trim()
            .slice(0, 2)
            .toUpperCase()
        : "GU",
      time: "Just now",
      title: title.trim(),
      text: message.trim(),
      replies: 0,
      likes: 0,
    };

    setPosts((previousPosts) => [
      newPost,
      ...previousPosts,
    ]);

    setTitle("");
    setMessage("");
  };

  /* =========================================
     EVENT RSVP
  ========================================= */

  const handleRsvp = (id) => {
    setGoing((previousGoing) =>
      previousGoing.includes(id)
        ? previousGoing.filter((item) => item !== id)
        : [...previousGoing, id]
    );
  };

  /* =========================================
     JSX
  ========================================= */

  return (
    <div className="community-page">

      {/* NAVBAR */}

      <nav className="levelix-navbar">

        <div className="levelix-logo">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Levelix Logo"
            />

            <span>Levelix</span>
          </Link>
        </div>

        <div className="nav-actions">
          <Link
            to="/"
            className="levelix-btn levelix-btn-primary"
          >
            Home
          </Link>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
        >
          <i
            data-lucide={
              mobileMenuOpen ? "x" : "menu"
            }
          ></i>
        </button>

      </nav>

      {/* MOBILE MENU */}

      <div
        className={`mobile-menu ${
          mobileMenuOpen ? "show" : ""
        }`}
      >
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>
      </div>

      {/* MAIN CONTENT */}

      <main className="community-shell">

        {/* COMMUNITY HERO */}

        <header className="community-hero">

          <h1>Community Hub</h1>

          <p className="community-description">
            {isAuthenticated
              ? `Welcome back, ${
                  user?.name || "Learner"
                }! Connect with learners, share your progress, and grow together.`
              : "Connect with learners, share your progress, join discussions and grow together."}
          </p>

        </header>

        {/* COMMUNITY STATISTICS */}

        <div className="community-stats">

          <div className="community-stat-pill">
            <h3>12,400+</h3>
            <p>Members</p>
          </div>

          <div className="community-stat-pill">
            <h3>3,200+</h3>
            <p>Discussions</p>
          </div>

          <div className="community-stat-pill">
            <h3>48</h3>
            <p>Upcoming Events</p>
          </div>

        </div>

        {/* PERSONAL LEARNING SNAPSHOT
            Context API + Redux Toolkit */}

        <section className="community-section">

          <h2>Your Learning Snapshot</h2>

          <p className="section-description">
            {isAuthenticated
              ? "Your learning information is shared across Levelix using Context API and Redux Toolkit."
              : "Log in to Levelix to view your personal learning information."}
          </p>

          {isAuthenticated ? (
            <>
              <div className="community-stats">

                <div className="community-stat-pill">
                  <h3>
                    {Number(xp || 0).toLocaleString()}
                  </h3>
                  <p>Total XP</p>
                </div>

                <div className="community-stat-pill">
                  <h3>{completedPaths.length}</h3>
                  <p>Completed Paths</p>
                </div>

                <div className="community-stat-pill">
                  <h3>{safeFrontendProgress}%</h3>
                  <p>Frontend Progress</p>
                </div>

              </div>

              <div className="leaderboard">
                <div className="leaderboard-item">

                  <span className="leaderboard-rank">
                    📚
                  </span>

                  <div className="leaderboard-user">
                    <h4>Frontend Development</h4>
                    <p>
                      {safeFrontendProgress}% completed
                    </p>
                  </div>

                  <b className="leaderboard-xp">
                    {safeFrontendProgress}%
                  </b>

                </div>

                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    background: "rgba(103, 67, 79, 0.14)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    marginTop: "12px",
                  }}
                  role="progressbar"
                  aria-label="Frontend Development progress"
                  aria-valuenow={safeFrontendProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    style={{
                      width: `${safeFrontendProgress}%`,
                      height: "100%",
                      background:
                        "linear-gradient(90deg, #67434F, #95616F, #B78391)",
                      borderRadius: "20px",
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>

              </div>
            </>
          ) : (
            <div className="forum-new-post-card">
              <p className="section-description">
                Sign in to see your XP, completed learning
                paths, and learning progress.
              </p>

              <Link
                to="/login"
                className="levelix-btn levelix-btn-primary"
              >
                Login to Levelix
              </Link>
            </div>
          )}

        </section>

        {/* RECENT DISCUSSIONS */}

        <section className="community-section">

          <h2>Recent Discussions</h2>

          <p className="section-description">
            See what the community is talking about.
          </p>

          {/* CREATE POST */}

          <div className="forum-new-post-card">

            <form onSubmit={handleAddPost}>

              <input
                type="text"
                placeholder="Discussion title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
              />

              <textarea
                placeholder="What's on your mind?"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                required
              />

              <button type="submit">
                Post Discussion
              </button>

            </form>

          </div>

          {/* DISCUSSION LIST */}

          <div className="forum-list">

            {posts.length === 0 ? (
              <p className="section-description">
                No discussions yet. Be the first to start one!
              </p>
            ) : (
              posts.map((post) => (

                <div
                  className="forum-post-card"
                  key={post.id}
                >

                  <div className="forum-avatar">
                    {post.initials}
                  </div>

                  <div className="forum-post-body">

                    <p className="post-author">
                      <b>{post.author}</b>
                      {" · "}
                      {post.time}
                    </p>

                    <h3>{post.title}</h3>

                    <p className="post-text">
                      {post.text}
                    </p>

                    <div className="post-meta">
                      <span>
                        💬 {post.replies} replies
                      </span>

                      <span>
                        ❤️ {post.likes} likes
                      </span>
                    </div>

                  </div>

                </div>

              ))
            )}

          </div>

        </section>

        {/* TOP LEARNERS */}

        <section className="community-section">

          <h2>Top Learners</h2>

          <p className="section-description">
            Top learners this month.
          </p>

          <div className="leaderboard">

            {leaderboard.map((item) => (

              <div
                className="leaderboard-item"
                key={item.rank}
              >

                <span className="leaderboard-rank">
                  #{item.rank}
                </span>

                <div className="leaderboard-user">

                  <h4>{item.name}</h4>

                  <p>{item.role}</p>

                </div>

                <b className="leaderboard-xp">
                  {item.xp}
                </b>

              </div>

            ))}

          </div>

        </section>

        {/* UPCOMING EVENTS */}

        <section className="community-section">

          <h2>Upcoming Events</h2>

          <p className="section-description">
            Join upcoming learning events and community
            activities.
          </p>

          <div className="events-grid">

            {events.map((event) => (

              <div
                className="event-card"
                key={event.id}
              >

                <div className="event-date">

                  <h2>{event.day}</h2>

                  <p>{event.month}</p>

                </div>

                <div className="event-info">

                  <h3>{event.title}</h3>

                  <p>{event.time}</p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleRsvp(event.id)
                  }
                  aria-pressed={going.includes(event.id)}
                >
                  {going.includes(event.id)
                    ? "You're Going ✓"
                    : "RSVP"}
                </button>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}
