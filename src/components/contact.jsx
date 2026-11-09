import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./contact.css";

function Contact({ onBack }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleHome = (event) => {
    if (typeof onBack === "function") {
      event.preventDefault();
      onBack();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);
  };

  const handleNewMessage = () => {
    setFormData({
      name: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    });

    setSubmitted(false);
  };

  return (
    <div className="contact-page">
      {/* NAVBAR — MATCHES LOGIN PAGE */}

      <nav className="contact-navbar">
        <Link
          to="/"
          className="contact-logo"
          onClick={handleHome}
          aria-label="Levelix home"
        >
          <img src="/logo.png" alt="Levelix Logo" />
          <span>Levelix</span>
        </Link>

        <Link
          to="/"
          className="contact-home-button"
          onClick={handleHome}
        >
          Home
        </Link>
      </nav>

      {/* BACKGROUND DECORATION */}

      <div className="contact-background-glow contact-glow-one" />
      <div className="contact-background-glow contact-glow-two" />

      <main className="contact-main">
        {/* HERO SECTION */}

        <section className="contact-hero">
          <div className="contact-badge">
            <span>✉</span>
            Get in Touch
          </div>

          <h1>
            Let's Start a <span>Conversation</span>
          </h1>

          <p>
            Have a question, suggestion, or need help with Levelix?
            We'd love to hear from you. Send us a message and let us
            know how we can help.
          </p>
        </section>

        {/* CONTACT INFORMATION */}

        <section
          className="contact-info-grid"
          aria-label="Contact information"
        >
          <article className="contact-info-card">
            <div className="contact-info-icon">✉</div>

            <div>
              <span className="contact-info-label">EMAIL US</span>
              <h3>General Support</h3>
              <p>Questions and feedback</p>
            </div>
          </article>

          <article className="contact-info-card">
            <div className="contact-info-icon">💬</div>

            <div>
              <span className="contact-info-label">WE'RE HERE</span>
              <h3>Community</h3>
              <p>Connect with fellow learners</p>
            </div>
          </article>

          <article className="contact-info-card">
            <div className="contact-info-icon">📚</div>

            <div>
              <span className="contact-info-label">NEED HELP?</span>
              <h3>Learning Support</h3>
              <p>Help with your learning journey</p>
            </div>
          </article>
        </section>

        {/* CONTACT FORM */}

        <section className="contact-form-section">
          <div className="contact-form-card">
            {!submitted ? (
              <>
                <div className="contact-form-heading">
                  <span className="contact-form-eyebrow">
                    SEND US A MESSAGE
                  </span>

                  <h2>How can we help?</h2>

                  <p>
                    Fill in the details below and tell us what is on
                    your mind.
                  </p>
                </div>

                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                >
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <label htmlFor="contact-name">
                        Full Name
                      </label>

                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="contact-email">
                        Email Address
                      </label>

                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <label htmlFor="contact-subject">
                      Subject
                    </label>

                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="General Inquiry">
                        General Inquiry
                      </option>

                      <option value="Technical Support">
                        Technical Support
                      </option>

                      <option value="Learning Support">
                        Learning Support
                      </option>

                      <option value="Feedback">
                        Feedback and Suggestions
                      </option>

                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="contact-form-group">
                    <label htmlFor="contact-message">
                      Your Message
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="contact-submit-button"
                  >
                    Send Message
                    <span aria-hidden="true"> →</span>
                  </button>

                  <p className="contact-form-note">
                    Your message will be prepared in this demo.
                    Email delivery is not connected yet.
                  </p>
                </form>
              </>
            ) : (
              <div className="contact-success">
                <div className="contact-success-icon">✓</div>

                <h2>Thank You, {formData.name}!</h2>

                <p>
                  Your message has been accepted by this demo
                  interface. Email delivery is not connected, so
                  your message has not actually been sent.
                </p>

                <button
                  type="button"
                  className="contact-submit-button"
                  onClick={handleNewMessage}
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SUPPORT SECTION */}

        <section className="contact-support-section">
          <h2>We're Here to Help</h2>

          <p>
            Keep learning, keep practicing, and keep building your
            future with Levelix.
          </p>

          <div className="contact-support-links">
            <Link to="/community" className="contact-support-link">
              Explore Community <span>→</span>
            </Link>

            <button
              type="button"
              className="contact-support-link contact-support-button"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard <span>→</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Contact;