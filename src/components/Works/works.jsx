import React from "react";
import "./works.css";

const Works = () => {
    return (
        <section id="works">
            <div className="works-container">
                <div className="works-card">
                    <h2>Featured Projects</h2>
                    <img src="https://via.placeholder.com/150" alt="Project Placeholder" />
                    <p>
                        Check out my <a href="https://github.com/AbedDX" target="_blank" rel="noopener noreferrer">
                        GitHub repository</a> to see more of my projects.
                    </p>
                </div>
            </div>
        </section>
    )
};

export default Works;

