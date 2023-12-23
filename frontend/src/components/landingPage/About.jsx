import React from "react";

import "./About.css";

const About = () => {
	return (
		<section id="about" className="about-section">
			<div className="about-content">
				<h2>Why Reparle ?</h2>
				<p className="info-1">
					Reparle's uniqueness lies in its personalized learning approach,
					powered by intelligent algorithms that adapt study sessions to your
					progress, an engaging interface fostering enjoyable learning,
					effortless progress tracking, and versatile learning options
					encompassing various languages and materials to suit diverse
					preferences.
				</p>
				<p className="info-2">
					Spaced repetition is a learning technique that optimizes memory
					retention by systematically reviewing material at increasing
					intervals. It strategically schedules review sessions based on the
					difficulty of the content and the individual's learning progress,
					reinforcing information at precise intervals to enhance long-term
					memory retention. This method helps learners efficiently memorize and
					retain information by spacing out practice over time, leading to
					improved mastery and recall of learned material.
				</p>
			</div>
		</section>
	);
};

export default About;
