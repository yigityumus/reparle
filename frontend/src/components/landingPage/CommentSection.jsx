import React, { useState, useEffect } from "react";

import "./CommentSection.css";

const CommentSection = () => {
	const [comments, setComments] = useState([
		{
			user: "Emre",
			comment:
				"Reparle transformed my language learning journey by making it personalized, efficient, and truly enjoyable.",
		},
		{
			user: "Asrin",
			comment:
				"Using Reparle, I felt my language skills improve steadily thanks to its tailored approach and user-friendly interface.",
		},
		{
			user: "Samet",
			comment:
				"I never thought learning a new language could be this seamless and fun until I experienced Reparle's innovative approach.",
		},
		{
			user: "Yigit",
			comment:
				"Reparle's versatile learning options allowed me to explore multiple languages at my own pace, enhancing my linguistic abilities remarkably.",
		},
	]);

	const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentCommentIndex((prevIndex) => (prevIndex + 1) % comments.length);
		}, 5000); // 5 seconds

		return () => clearInterval(interval);
	}, [comments.length]);

	return (
		<section className="comment-section">
			<h3>User Comments</h3>
			<div className="comments-carousel">
				<p className="comment-content">
					{comments[currentCommentIndex].comment}
				</p>
				<p className="comment-user">- {comments[currentCommentIndex].user}</p>
			</div>
		</section>
	);
};

export default CommentSection;
