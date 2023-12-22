import React, { useState } from "react";

import "./Card.css";

export default function Card({ card, gradTwoValue, flippable, handleClick }) {
	const [side, setSide] = useState();

	function handleCardClick() {
		if (flippable) {
			setSide(!side);
			handleClick();
		}
	}

	return (
		<div
			className={`card ${side ? "side" : ""}`}
			style={{ "--grad-two": gradTwoValue }}
			onClick={handleCardClick}
		>
			<small>
				<span>Card ID</span>
				{card.id}
			</small>
			{/* {side ? card.fields.side1 : card.fields.side2} */}
			<div className="front">{card.fields.side1}</div>
			<div className="back">{card.fields.side2}</div>
		</div>
	);
}
