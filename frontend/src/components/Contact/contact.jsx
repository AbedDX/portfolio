import React from "react";
import "./contact.css";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from "react-icons/fa";

const Contact = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section id="contact">
      <div className="contact-container">
        <div className="contact-main-content">
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>I'm currently open to new opportunities and collaborations.</p>
              <div className="contact-links">
                <a href="mailto:contact@example.com" className="contact-link">
                  <FaEnvelope className="contact-icon" />
                  <span>contact@example.com</span>
                </a>
              </div>
            </div>
            
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
          
          <div className="professional-links">
            <a href="https://github.com/AbedDX" target="_blank" rel="noopener noreferrer" className="prof-link">
              <FaGithub className="prof-icon" />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="prof-link">
              <FaLinkedin className="prof-icon" />
              <span>LinkedIn</span>
            </a>
            <a href="/resume.pdf" download className="prof-link resume-link">
              <FaFileAlt className="prof-icon" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
        
        <footer className="contact-footer">
          <p>&copy; {currentYear} AbedDX.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;