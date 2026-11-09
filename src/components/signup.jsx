import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

function Signup({ onBack, onLogin, onSignup }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleHome = (event) => {
    if (typeof onBack === "function") {
      event.preventDefault();
      onBack();
    }
  };

  const handleLogin = () => {
    if (typeof onLogin === "function") {
      onLogin();
    } else {
      navigate("/login");
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (typeof onSignup !== "function") {
      setError("Signup is not connected to the app yet.");
      return;
    }

    try {
      setSubmitting(true);

      await onSignup({
        name: cleanName,
        email: cleanEmail,
        password,
      });

      navigate("/login", { replace: true });
    } catch (err) {
      setError(
        err?.message || "Unable to create your account. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      {/* NAVBAR — SAME DESIGN AS LOGIN PAGE */}

      <nav className="signup-navbar">
        <Link
          to="/"
          className="signup-logo"
          onClick={handleHome}
          aria-label="Levelix home"
        >
          <img src="/logo.png" alt="Levelix Logo" />
          <span>Levelix</span>
        </Link>

        <Link
          to="/"
          className="signup-home-button"
          onClick={handleHome}
        >
          Home
        </Link>
      </nav>

      {/* SIGNUP CONTENT */}

      <main className="signup-main">
        <section className="signup-card">
          <div className="signup-heading">
            <h1>Create Account</h1>

            <p className="signup-subtitle">
              Start building real skills with Levelix.
            </p>
          </div>

          <form className="signup-form" onSubmit={handleSignup}>
            <div className="signup-form-group">
              <label htmlFor="signup-name">Full Name</label>

              <input
                type="text"
                id="signup-name"
                name="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <div className="signup-form-group">
              <label htmlFor="signup-email">Email Address</label>

              <input
                type="email"
                id="signup-email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="signup-form-group">
              <label htmlFor="signup-password">Password</label>

              <div className="signup-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
                  name="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>
            </div>

            <div className="signup-form-group">
              <label htmlFor="signup-confirm-password">
                Confirm Password
              </label>

              <div className="signup-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-confirm-password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="signup-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="signup-submit-button"
              disabled={submitting}
            >
              {submitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="signup-divider">
            <span>OR</span>
          </div>

          <p className="signup-login-text">
            Already have an account?{" "}
            <button
              type="button"
              className="signup-login-link"
              onClick={handleLogin}
            >
              Login
            </button>
          </p>
        </section>

        <p className="signup-footer-text">
          Learn. Practice. Build. Level Up.
        </p>
      </main>
    </div>
  );
}

export default Signup;