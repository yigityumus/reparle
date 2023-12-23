import React from "react";
import "./Slogan.css";

const Slogan = () => {
	return (
		<div className="slogan">
			<div className="slogan-text-container">
				<h2>Reparle: Learn. Repeat. Excel.</h2>
				<p>
					Welcome to Reparle, your gateway to effortless language mastery
					through the power of spaced repetition! Embark on a transformative
					linguistic journey with our innovative app designed to make learning a
					new language enjoyable, efficient, and long-lasting. Whether you're a
					beginner or seeking to enhance your fluency, Reparle adapts to your
					pace and proficiency level.
				</p>
			</div>
			<div className="slogan-image-container">
				{/* Replace the below image URL with your desired picture */}
				<img
					src="./notion-book-logo.png" // Placeholder URL, replace with your image URL
					alt="Placeholder"
				/>
			</div>
		</div>
	);
};

export default Slogan;
