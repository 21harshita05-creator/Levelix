
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./privacy.css";

const sections = [
  {
    title: "What information do we collect?",
    text: "We may collect basic information such as your name, email address, learning progress, completed challenges, certificates, and projects you create on the platform.",
  },
  {
    title: "How do we use your information?",
    text: "Your information helps us provide learning paths, track your progress, recommend useful content, provide certificates, and improve your learning experience.",
  },
  {
    title: "Is my information safe?",
    text: "We take reasonable steps to protect your personal information from unauthorized access, misuse, or loss. We only use information when it is needed to provide our services.",
  },
  {
    title: "Do we use cookies?",
    text: "Cookies may be used to remember your preferences and improve your experience. You can manage cookies through your browser settings.",
  },
  {
    title: "Can I control my information?",
    text: "You can review and update your account information. You can also contact us if you need help with your personal data.",
  },
];

function Privacy() {
  const [open, setOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedSections, setSavedSections] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [feedback, setFeedback] = useState("");
  const [formError, setFormError] = useState(false);

  const filteredSections = sections.filter((section) =>
    `${section.title} ${section.text}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  function toggleSavedSection(title) {
    setSavedSections((previous) =>
      previous.includes(title)
        ? previous.filter((section) => section !== title)
        : [...previous, title]
    );
  }

  function updateField(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setFormError(true);
      setFeedback("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email.trim())) {
      setFormError(true);
      setFeedback("Please enter a valid email address.");
      return;
    }

    setFormError(false);
    setFeedback(
      "Your message has been submitted successfully! (Demo only; no email was sent.)"
    );

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <div className="privacy-page">
      {/* NAVBAR — MATCHES LOGIN PAGE */}

      <nav className="privacy-navbar">
        <Link
          to="/"
          className="privacy-logo"
          aria-label="Levelix home"
        >
          <img src="/logo.png" alt="Levelix Logo" />
          <span>Levelix</span>
        </Link>

        <Link to="/" className="privacy-home-button">
          Home
        </Link>
      </nav>

      {/* PAGE HEADER */}

      <header className="privacy-header">
        <div className="privacy-lock">🔒</div>

        <h1>Your Privacy Matters</h1>

        <p>
          We respect your privacy and want you to feel safe
          while learning, practising and building your skills.
        </p>
      </header>

      <main className="privacy-container">
        {/* INTRODUCTION */}

        <section className="privacy-intro-card">
          <h2>Privacy Policy</h2>

          <p>
            Our platform is designed to help learners build
            real-world skills in one place. This Privacy Policy
            explains how we collect, use and protect your
            information when you use our website.
          </p>

          <p className="privacy-updated">
            Last updated: October 2026
          </p>
        </section>

        {/* INFORMATION CARDS */}

        <section className="privacy-info-cards">
          <article className="privacy-info-card">
            <div className="privacy-card-icon">📚</div>
            <h3>Learning Data</h3>
            <p>
              We use learning activity to track progress and
              improve your learning journey.
            </p>
          </article>

          <article className="privacy-info-card">
            <div className="privacy-card-icon">🛡️</div>
            <h3>Data Protection</h3>
            <p>
              We take steps to help keep your personal
              information protected.
            </p>
          </article>

          <article className="privacy-info-card">
            <div className="privacy-card-icon">👤</div>
            <h3>Your Control</h3>
            <p>
              You can review and update your account
              information whenever needed.
            </p>
          </article>
        </section>

        {/* PRIVACY DETAILS */}

        <section className="privacy-details">
          <h2>Privacy Information</h2>

          <p className="privacy-details-description">
            Find answers to common questions about your privacy.
          </p>

          <input
            className="privacy-search"
            type="text"
            placeholder="🔍 Search privacy information..."
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setOpen(null);
            }}
            aria-label="Search privacy information"
          />

          <p className="privacy-saved-count">
            ♥️ Saved Sections: {savedSections.length}
          </p>

          {filteredSections.map((section) => {
            const index = sections.indexOf(section);
            const isOpen = open === index;
            const isSaved = savedSections.includes(section.title);

            return (
              <article
                className="privacy-section"
                key={section.title}
              >
                <button
                  className="privacy-section-button"
                  type="button"
                  onClick={() =>
                    setOpen(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                >
                  <span>{section.title}</span>

                  <span className="privacy-arrow">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="privacy-section-text">
                    <p>{section.text}</p>

                    <button
                      type="button"
                      className="privacy-save-button"
                      onClick={() =>
                        toggleSavedSection(section.title)
                      }
                    >
                      {isSaved ? "♥️ Saved" : "♡ Save Section"}
                    </button>
                  </div>
                )}
              </article>
            );
          })}

          {filteredSections.length === 0 && (
            <p className="privacy-no-results">
              No matching privacy information found.
            </p>
          )}
        </section>

        {/* CONTACT SECTION */}

        <section className="privacy-contact-card">
          <div>
            <h2>Have a privacy question?</h2>

            <p>
              If you have questions about your information or
              our privacy practices, feel free to contact us.
            </p>
          </div>

          <button
            type="button"
            className="privacy-contact-button"
            onClick={() => {
              setShowForm((previous) => !previous);
              setFeedback("");
              setFormError(false);
            }}
          >
            {showForm ? "Close Form" : "Contact Us"}
          </button>
        </section>

        {/* CONTACT FORM */}

        {showForm && (
          <form
            className="privacy-contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2>Contact Us</h2>

            <label htmlFor="privacy-name">Full Name</label>

            <input
              id="privacy-name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={updateField}
            />

            <label htmlFor="privacy-email">
              Email Address
            </label>

            <input
              id="privacy-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={updateField}
            />

            <label htmlFor="privacy-message">
              Your Message
            </label>

            <textarea
              id="privacy-message"
              name="message"
              rows="4"
              placeholder="Describe your privacy question..."
              value={formData.message}
              onChange={updateField}
            />

            <button
              type="submit"
              className="privacy-contact-button"
            >
              Submit Message
            </button>

            {feedback && (
              <p
                className={
                  formError
                    ? "privacy-form-error"
                    : "privacy-form-success"
                }
                role="status"
              >
                {feedback}
              </p>
            )}
          </form>
        )}
      </main>
    </div>
  );
}

export default Privacy;
