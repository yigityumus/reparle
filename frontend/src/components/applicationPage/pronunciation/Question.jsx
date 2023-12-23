import React from "react";

import "./Question.css";

export default function Question({ question, userInput }) {
	return (
		<div className="question">
			<small>
				<span>Question ID</span>
				{question.id}
			</small>
			<div className="word">{question.fields.word}</div>
			{userInput && userInput.length > 0 && (
				<div className="phoneme">{question.fields.phoneme}</div>
			)}
		</div>
	);
}
