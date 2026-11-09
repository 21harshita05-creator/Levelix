
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./help.css";

const categories = [
  {
    icon: "🎮",
    name: "Learn Through Games",
    description:
      "Master programming through interactive games, missions and challenges."
  },
  {
    icon: "🗺️",
    name: "Learning Paths",
    description:
      "Follow structured roadmaps from beginner to job-ready skills."
  },
  {
    icon: "💻",
    name: "Coding Practice",
    description:
      "Practice programming through coding challenges and exercises."
  },
  {
    icon: "⚡",
    name: "Daily Challenges",
    description:
      "Solve daily challenges to build consistency and strengthen skills."
  },
  {
    icon: "📊",
    name: "Progress Tracking",
    description:
      "Monitor completed challenges and overall skill development."
  },
  {
    icon: "🏆",
    name: "Leaderboards",
    description:
      "Earn XP and stay motivated through friendly competition."
  }
];

const faqs = [
  {
    question: "How do I start learning?",
    answer:
      "Choose a learning path and start learning step by step."
  },
  {
    question: "How does coding practice work?",
    answer:
      "Solve coding challenges and exercises to improve your programming skills."
  },
  {
    question: "What is Learn Through Games?",
    answer:
      "Learn programming concepts through interactive games, missions and challenges."
  },
  {
    question: "How do Daily Challenges work?",
    answer:
      "Solve daily challenges regularly to strengthen your skills and maintain consistency."
  },
  {
    question: "How can I track my progress?",
    answer:
      "Use Progress Tracking to monitor completed challenges and your skill development."
  },
  {
    question: "How do Leaderboards work?",
    answer:
      "Earn XP by participating in learning activities and compare your progress with other learners."
  }
];

function Help() {
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);

  // Saved category state
  const [savedCategories, setSavedCategories] = useState([]);

  // Support form state
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState(false);

  const search = searchQuery.trim().toLowerCase();

  // Search categories by name and description
  const filteredCategories = categories.filter(category =>
    `${category.name} ${category.description}`
      .toLowerCase()
      .includes(search)
  );

  // Search FAQs by question and answer
  const filteredFaqs = faqs.filter(faq =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(search)
  );

  // Save or unsave a category using local React state
  function toggleSavedCategory(categoryName) {
    setSavedCategories(previous =>
      previous.includes(categoryName)
        ? previous.filter(name => name !== categoryName)
        : [...previous, categoryName]
    );
  }

  // Update support form fields
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData(previous => ({
      ...previous,
      [name]: value
    }));

    if (formMessage) {
      setFormMessage("");
      setFormError(false);
    }
  }

  // Validate support form
  function handleSubmit(event) {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setFormError(true);
      setFormMessage("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFormError(true);
      setFormMessage("Please enter a valid email address.");
      return;
    }

    setFormError(false);
    setFormMessage(
      "Your support request has been submitted successfully!"
    );

    setFormData({
      name: "",
      email: "",
      message: ""
    });

    // This is a frontend-only form.
    // Connect a backend to actually send or store the request.
  }

  return (
    <div className="help-page">

      {/* NAVBAR */}
      <nav className="help-navbar" aria-label="Main navigation">
        <Link to="/" className="help-logo">
          <img src="/logo.png" alt="Levelix Logo" />
          <span>Levelix</span>
        </Link>

        <Link to="/" className="help-home-button">
          Home
        </Link>
      </nav>

      {/* HERO SECTION */}
      <header className="help-hero">
        <p className="help-tag">✦ HELP CENTER</p>

        <h1>
          How can we <span>help?</span>
        </h1>

        <p className="help-text">
          Find answers and get the support you need for your learning journey.
        </p>

        <label className="help-search-label" htmlFor="help-search">
          Search help topics
        </label>

        <input
          id="help-search"
          className="help-search"
          type="search"
          placeholder="🔍 Search for help..."
          value={searchQuery}
          onChange={event => {
            setSearchQuery(event.target.value);
            setOpenFaq(null);
          }}
        />
      </header>

      {/* CATEGORIES */}
      <section className="help-section">
        <h2>What do you need help with?</h2>

        <p className="help-gray">
          Explore different areas of your learning experience.
        </p>

        <p className="help-gray">
          ♥️ Saved Categories: {savedCategories.length}
        </p>

        <div className="help-cards">
          {filteredCategories.map(category => {
            const isSaved = savedCategories.includes(category.name);

            return (
              <article className="help-card" key={category.name}>
                <div className="help-icon" aria-hidden="true">
                  {category.icon}
                </div>

                <h3>{category.name}</h3>

                <p className="help-gray">
                  {category.description}
                </p>

                <button
                  className="help-button"
                  type="button"
                  onClick={() => {
                    setSearchQuery(category.name);
                    setOpenFaq(null);
                  }}
                >
                  Learn More →
                </button>

                <button
                  className="help-button save-category-button"
                  type="button"
                  aria-pressed={isSaved}
                  onClick={() => toggleSavedCategory(category.name)}
                >
                  {isSaved ? "♥ Saved" : "♡ Save Category"}
                </button>
              </article>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <p className="help-gray" role="status">
            No categories found. Try another search.
          </p>
        )}
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="help-faq">
        <h2>Frequently Asked Questions</h2>

        <p className="help-gray">
          Quick answers to common questions.
        </p>

        <div className="help-questions">
          {filteredFaqs.map(faq => {
            const isOpen = openFaq === faq.question;
            const answerId = `faq-${faqs.indexOf(faq)}`;

            return (
              <article className="help-question" key={faq.question}>
                <button
                  className="help-question-button"
                  type="button"
                  onClick={() =>
                    setOpenFaq(previous =>
                      previous === faq.question ? null : faq.question
                    )
                  }
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span>{faq.question}</span>

                  <span aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <p id={answerId}>{faq.answer}</p>
                )}
              </article>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <p className="help-gray" role="status">
            No matching questions found.
          </p>
        )}
      </section>

      {/* CONTACT SUPPORT */}
      <section className="help-support">
        <div className="help-support-content">
          <h2>Still need help?</h2>

          <p className="help-gray">
            Need assistance? Send us your question using the support form.
          </p>

          <button
            className="help-button"
            type="button"
            onClick={() => {
              setShowForm(previous => !previous);
              setFormMessage("");
              setFormError(false);
            }}
            aria-expanded={showForm}
          >
            {showForm ? "Close Form" : "Contact Support →"}
          </button>
        </div>

        {showForm && (
          <form
            className="support-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="support-form-group">
              <label htmlFor="support-name">Full Name</label>

              <input
                id="support-name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div className="support-form-group">
              <label htmlFor="support-email">Email Address</label>

              <input
                id="support-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="support-form-group">
              <label htmlFor="support-message">Your Message</label>

              <textarea
                id="support-message"
                name="message"
                rows={4}
                placeholder="Describe your issue..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button className="help-button" type="submit">
              Submit Request
            </button>

            {formMessage && (
              <p
                className={`support-form-message ${
                  formError
                    ? "support-form-error"
                    : "support-form-success"
                }`}
                role="status"
              >
                {formMessage}
              </p>
            )}
          </form>
        )}
      </section>

    </div>
  );
}

export default Help;
