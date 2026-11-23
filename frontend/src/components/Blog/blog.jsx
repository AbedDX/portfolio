import React from "react";
import "./blog.css";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building a CI/CD Pipeline with Jenkins and Docker",
      summary: "Learn how I automated deployment workflows using Jenkins pipelines and Docker containers.",
      date: "May 15, 2023",
      image: "https://via.placeholder.com/400x250?text=CI/CD+Pipeline",
      link: "#"
    },
    {
      id: 2,
      title: "Infrastructure as Code: My Journey with Terraform",
      summary: "How I manage cloud infrastructure using Terraform and best practices I've learned along the way.",
      date: "April 3, 2023",
      image: "https://via.placeholder.com/400x250?text=Terraform",
      link: "#"
    },
    {
      id: 3,
      title: "Kubernetes for Beginners: Getting Started Guide",
      summary: "A step-by-step guide to understanding and implementing Kubernetes for container orchestration.",
      date: "March 10, 2023",
      image: "https://via.placeholder.com/400x250?text=Kubernetes",
      link: "#"
    }
  ];

  return (
    <section id="blog">
      <div className="blog-container">
        <h2 className="section-title">Blog & Articles</h2>
        <div className="blog-grid">
          {blogPosts.map(post => (
            <div className="blog-card" key={post.id}>
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-content">
                <span className="blog-date">{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <a href={post.link} className="read-more">Read More</a>
              </div>
            </div>
          ))}
        </div>
        <div className="blog-cta">
          <a href="https://dev.to" target="_blank" rel="noopener noreferrer" className="blog-button">
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;