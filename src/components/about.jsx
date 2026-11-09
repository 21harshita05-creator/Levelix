import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./about.css";

const creators = [
  { initials: "H", name: "Harshita" },
  { initials: "AS", name: "Aakarsh Sharma" },
  { initials: "B", name: "Bhumika" },
  { initials: "G", name: "Gaurika" },
];

function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="about-page">
      {/* NAVBAR — SAME STYLE AS LOGIN */}

      <nav className="about-navbar">
        <Link
          to="/"
          className="about-logo"
          onClick={closeMobileMenu}
          aria-label="Levelix home"
        >
          <img src="/logo.png" alt="Levelix Logo" />
          <span>Levelix</span>
        </Link>

        <div className="about-nav-actions">
          <Link
            to="/"
            className="about-home-button"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
        </div>

        <button
          className="about-mobile-menu-button"
          type="button"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="about-mobile-menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}

      <div
        id="about-mobile-menu"
        className={`about-mobile-menu ${
          mobileMenuOpen ? "show" : ""
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <Link
          to="/"
          onClick={closeMobileMenu}
          tabIndex={mobileMenuOpen ? 0 : -1}
        >
          Home
        </Link>
      </div>

      {/* ABOUT CONTENT */}

      <main className="about-content">
        {/* HERO */}

        <section className="about-hero">
          <div className="about-badge">
            ✨ About Levelix
          </div>

          <h1>Learn. Build. Level Up.</h1>

          <p>
            Levelix is a gamified learning platform designed
            to help students build real skills through
            learning, practice, challenges, and consistency.
          </p>
        </section>

        {/* ABOUT CARD */}

        <section className="about-card">
          <div className="about-card-icon" aria-hidden="true">
            🚀
          </div>

          <div className="about-card-content">
            <h2>What is Levelix?</h2>

            <p>
              Levelix brings structured learning, coding
              practice, daily challenges, progress tracking,
              and community learning together in one place.
            </p>

            <p>
              Instead of simply completing courses, Levelix
              focuses on helping learners actually understand,
              practice, and build useful skills.
            </p>
          </div>
        </section>

        {/* VALUES */}

        <section className="about-values">
          <article className="value-card">
            <div className="value-icon" aria-hidden="true">
              🎮
            </div>

            <div>
              <h3>Learn Through Practice</h3>

              <p>
                Turn concepts into skills through
                challenges and hands-on practice.
              </p>
            </div>
          </article>

          <article className="value-card">
            <div className="value-icon" aria-hidden="true">
              📈
            </div>

            <div>
              <h3>Track Your Growth</h3>

              <p>
                See your progress and stay motivated
                throughout your learning journey.
              </p>
            </div>
          </article>

          <article className="value-card">
            <div className="value-icon" aria-hidden="true">
              👥
            </div>

            <div>
              <h3>Grow Together</h3>

              <p>
                Learn, share, and connect with other
                learners in the Levelix community.
              </p>
            </div>
          </article>
        </section>

        {/* CREATORS */}

        <section className="creators-section">
          <div className="creators-heading">
            <span>THE CREATORS</span>

            <h2>Built by students, for learners.</h2>
          </div>

          <div className="creators-grid">
            {creators.map((creator) => (
              <article
                className="creator-card"
                key={creator.name}
              >
                <div className="creator-avatar" aria-hidden="true">
                  {creator.initials}
                </div>

                <h3>{creator.name}</h3>

                <p>Co-Creator</p>
              </article>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}

        <section className="about-bottom">
          <h2>
            Your journey starts with
            <span> Levelix.</span>
          </h2>

          <p>
            Learn new skills, practice consistently,
            and level up your future.
          </p>

          <Link
            to="/signup"
            className="about-start-btn"
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto",
              });
            }}
          >
            🚀 Start Learning
          </Link>
        </section>
      </main>
    </div>
  );
}

export default About;
