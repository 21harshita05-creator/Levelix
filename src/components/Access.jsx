import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../App";
import "./Access.css";

function Access() {
  const navigate = useNavigate();

  // Context API: Get authentication information
  const { user, isAuthenticated } = useAuth();

  // Redux Toolkit: Get shared learning information
  const xp = useSelector((state) => state.learning.xp);

  const completedPaths = useSelector(
    (state) => state.learning.completedPaths
  );

  const progress = useSelector(
    (state) => state.learning.progress
  );

  const frontendProgress =
    progress["Frontend Development"] ?? 38;

  return (
    <div className="access-page">
      {/* NAVBAR */}
      <nav className="access-navbar">
        <button
          className="access-logo"
          onClick={() => navigate("/")}
          aria-label="Go to Levelix home"
        >
          <img src="/logo.png" alt="Levelix Logo" />
          <span>Levelix</span>
        </button>

        <button
          className="access-home-btn"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="access-main">
        <section className="access-card">
          <div className="access-decoration">✦</div>

          <p className="access-eyebrow">
            YOUR NEXT LEVEL STARTS HERE
          </p>

          <h1>
            {isAuthenticated ? (
              <>
                Welcome back,
                <span> {user?.name || "Learner"}!</span>
              </>
            ) : (
              <>
                Ready to start
                <span> learning?</span>
              </>
            )}
          </h1>

          <p className="access-description">
            {isAuthenticated
              ? "Continue your learning journey, practice your skills, and keep making progress."
              : "Build real skills through structured learning paths, coding practice, games, and daily challenges."}
          </p>

          {/* AUTHENTICATED USER */}
          {isAuthenticated ? (
            <>
              <div className="access-stats">
                <div className="access-stat">
                  <span className="access-stat-icon">⚡</span>
                  <strong>{xp.toLocaleString()}</strong>
                  <span className="access-stat-label">
                    Total XP
                  </span>
                </div>

                <div className="access-stat">
                  <span className="access-stat-icon">🏆</span>
                  <strong>{completedPaths.length}</strong>
                  <span className="access-stat-label">
                    Completed Paths
                  </span>
                </div>
              </div>

              <div className="access-progress">
                <div className="access-progress-heading">
                  <span>Frontend Development</span>
                  <strong>{frontendProgress}%</strong>
                </div>

                <div
                  className="access-progress-track"
                  role="progressbar"
                  aria-label="Frontend Development progress"
                  aria-valuenow={frontendProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="access-progress-fill"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, frontendProgress)
                      )}%`
                    }}
                  />
                </div>
              </div>

              <button
                className="access-primary-btn"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard →
              </button>

              <button
                className="access-secondary-btn"
                onClick={() => navigate("/frontend")}
              >
                Continue Learning
              </button>
            </>
          ) : (
            /* VISITOR ACTIONS */
            <div className="access-actions">
              <button
                className="access-primary-btn"
                onClick={() => navigate("/login")}
              >
                Login to Levelix →
              </button>

              <button
                className="access-secondary-btn"
                onClick={() => navigate("/signup")}
              >
                Create Account
              </button>
            </div>
          )}

          {/* DIVIDER */}
          <div className="access-divider">
            <span></span>
            <p>LEARN · PRACTICE · BUILD</p>
            <span></span>
          </div>

          {/* FEATURES */}
          <div className="access-features">
            <div className="access-feature">
              <span className="access-feature-icon">📚</span>
              <p>Structured Learning</p>
            </div>

            <div className="access-feature">
              <span className="access-feature-icon">💻</span>
              <p>Coding Practice</p>
            </div>

            <div className="access-feature">
              <span className="access-feature-icon">📈</span>
              <p>Track Progress</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Access;
