
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login({ onBack, onSignup, onLogin }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleHome = (event) => {
    if (typeof onBack === "function") {
      event.preventDefault();
      onBack();
    }
  };

  const handleSignup = () => {
    if (typeof onSignup === "function") {
      onSignup();
    } else {
      navigate("/signup");
    }
  };

  /* LOGIN FORM HANDLING */

  const handleLogin = (event) => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const password = event.target.password.value;

    if (!name || !password) {
      alert("Please enter your username and password.");
      return;
    }

    // Demo credentials
    if (name === "Harshita" && password === "2007") {
      // Show success alert before opening Dashboard
      alert("Login successful! Welcome to Levelix.");

      const userData = { name };

      if (typeof onLogin === "function") {
        // App.jsx handles Context API login and dashboard navigation
        onLogin(userData);
      } else {
        // Fallback navigation if no onLogin prop is provided
        navigate("/dashboard");
      }
    } else {
      alert("Invalid username or password.");
    }
  };

  /* FORGOT PASSWORD FORM HANDLING */

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (!resetEmail.trim()) {
      alert("Please enter your email address.");
      return;
    }

    alert(
      "Password reset is a demo feature and is not connected to email."
    );

    setShowForgotPassword(false);
    setResetEmail("");
  };

  return (
    <div className="login-page">

      {/* NAVBAR */}

      <nav className="login-navbar">
        <Link
          to="/"
          className="login-logo"
          onClick={handleHome}
          aria-label="Levelix home"
        >
          <img src="/logo.png" alt="Levelix Logo" />
          <span>Levelix</span>
        </Link>

        <Link
          to="/"
          className="login-home-button"
          onClick={handleHome}
        >
          Home
        </Link>
      </nav>

      {/* LOGIN CONTENT */}

      <main className="login-main">
        <section className="login-card">

          <div className="login-heading">
            <h1>Welcome to Levelix</h1>

            <p className="login-subtitle">
              Continue your learning journey and keep building your skills.
            </p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>

            {/* USERNAME */}

            <div className="login-form-group">
              <label htmlFor="login-name">
                Username
              </label>

              <input
                type="text"
                id="login-name"
                name="name"
                placeholder="Enter your username"
                autoComplete="username"
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="login-form-group">
              <label htmlFor="login-password">
                Password
              </label>

              <div className="login-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* REMEMBER ME AND FORGOT PASSWORD */}

            <div className="login-form-options">

              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />

                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="login-forgot-link"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot password?
              </button>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-submit-button"
            >
              Login
            </button>

          </form>

          {/* DIVIDER */}

          <div className="login-divider">
            <span>OR</span>
          </div>

          {/* SIGNUP LINK */}

          <p className="login-signup-text">
            Don't have an account?{" "}

            <button
              type="button"
              className="login-signup-link"
              onClick={handleSignup}
            >
              Sign up
            </button>
          </p>

        </section>

        <p className="login-footer-text">
          Learn. Practice. Build. Level Up.
        </p>

      </main>

      {/* FORGOT PASSWORD POPUP */}

      {showForgotPassword && (
        <div
          className="login-modal-overlay"
          onClick={() => setShowForgotPassword(false)}
        >
          <section
            className="login-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-reset-title"
            onClick={(event) => event.stopPropagation()}
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="login-modal-close"
              onClick={() => setShowForgotPassword(false)}
              aria-label="Close dialog"
            >
              ×
            </button>

            <h2 id="login-reset-title">
              Forgot Password?
            </h2>

            <p>
              Enter your email address to continue with the password reset
              demo.
            </p>

            {/* RESET PASSWORD FORM */}

            <form onSubmit={handleResetPassword}>
              <label htmlFor="login-reset-email">
                Email Address
              </label>

              <input
                type="email"
                id="login-reset-email"
                value={resetEmail}
                onChange={(event) =>
                  setResetEmail(event.target.value)
                }
                placeholder="Enter your email"
                required
              />

              <button
                type="submit"
                className="login-submit-button"
              >
                Reset Password
              </button>
            </form>

          </section>
        </div>
      )}

    </div>
  );
}

export default Login;
