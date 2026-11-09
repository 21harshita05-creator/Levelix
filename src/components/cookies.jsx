import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Cookies({ onBack }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="cookies-page">
      <nav className="cookies-navbar">
        <Link to="/" className="cookies-logo">
          Levelix<span>.</span>
        </Link>

        <button type="button" onClick={handleBack}>
          Back
        </button>
      </nav>

      <main className="cookies-content">
        <p className="cookies-eyebrow">LEVELIX POLICIES</p>

        <h1>Cookie Policy</h1>

        <p>
          This page explains how cookies may be used when you visit
          the Levelix platform.
        </p>

        <section>
          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files that websites can store in
            your browser to remember preferences and improve the
            browsing experience.
          </p>
        </section>

        <section>
          <h2>How Levelix may use cookies</h2>
          <ul>
            <li>Remember user preferences.</li>
            <li>Support essential website functionality.</li>
            <li>Understand how visitors use the platform, if analytics are enabled.</li>
          </ul>
        </section>

        <section>
          <h2>Managing cookies</h2>
          <p>
            You can manage or delete cookies through your browser
            settings. Blocking certain cookies may affect some
            website features.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            If you have questions about this policy, visit our{" "}
            <Link to="/contact">Contact page</Link>.
          </p>
        </section>

        <p className="cookies-note">
          This page describes general cookie practices. Update it to
          reflect the cookies and services actually used by your application.
        </p>

        <button
          type="button"
          className="cookies-home-button"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </main>

      <footer className="cookies-footer">
        © 2026 Levelix. All rights reserved.
      </footer>
    </div>
  );
}

export default Cookies;
