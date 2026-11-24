import React from "react";
import "./contact.css";
import placeholderImage from "../../assets/placeholder-grid.png";

const Contact = () => {
  return (
    <section className="section contact" id="contact">
      <div className="section-wrapper">
        <div className="section-header animate-in">
          <span className="section-number">04</span>
          <span className="section-divider">//</span>
          <h2 className="section-title">Contact</h2>
        </div>

        <p className="section-subtitle">
          Reach out for collaborations or just a friendly conversation.
        </p>

        {/* Split layout: image + contact info */}
        <div className="contact-split">
          {/* Left: visual + info cards */}
          <div className="contact-visual">
            <img src={placeholderImage} alt="Contact" className="contact-image" loading="lazy" />
            <div className="contact-info-card">
              <h3>Get In Touch</h3>
              <p>I'm currently open to new opportunities and collaborations.</p>
              <div className="contact-links">
                <a href="mailto:contact@example.com" className="contact-link">
                  <span className="link-icon">✉</span>
                  <span>contact@example.com</span>
                </a>
                <a href="https://github.com/AbedDX" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="link-icon">⌘</span>
                  <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/abdalle-wais" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="link-icon">◆</span>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form-card">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn submit-btn">
                Send Message →
              </button>
            </form>
          </div>
        </div>

        <footer className="contact-footer">
          <p>&copy; {new Date().getFullYear()} Abdalle Wais — Built with React + Vite</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
