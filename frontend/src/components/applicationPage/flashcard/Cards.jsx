import React, { useState, useEffect } from "react";

import Card from "./Card.jsx";
import ReportComponent from "./ReportComponent.jsx";

import "./Cards.css";

import data from "../../../data/flashcard.json";

// https://www.youtube.com/watch?v=hEtZ040fsD8&feature=youtu.be&t=719 (flashcards)
// https://www.youtube.com/watch?v=vs6usnS5OTE (slider)

function Cards() {
	const [flashcardData, setFlashcardData] = useState([]);
	const [current, setCurrent] = useState(0);
	const [inputValue, setInputValue] = useState("");
	const [gradTwoValue, setGradTwoValue] = useState(
		Array(flashcardData.length).fill("#f5efb8")
	);
	const [comparisonResults, setComparisonResults] = useState(
		Array(flashcardData.length).fill(null)
	);
	const [flippable, setFlippable] = useState(
		Array(flashcardData.length).fill(false)
	);
	const [readOnly, setReadOnly] = useState(
		Array(flashcardData.length).fill(false)
	);
	const [showReport, setShowReport] = useState(false);

	// useEffect(() => {
	// 	const url =
	// 		"https://api.airtable.com/v0/appqY5UZYlf41Q5VT/Table%201?api_key=keyPZ9SKzXIt4Ek1v";
	// 	fetch(url)
	// 		.then((response) => response.json())
	// 		.then((json) => {
	// 			setFlashcardData(json.records);
	// 		}, []);
	// });

	useEffect(() => {
		// Set state with the imported data from the local JSON file
		setFlashcardData(data.records);

		setGradTwoValue(Array(data.records.length).fill("#f5efb8"));
		setComparisonResults(Array(data.records.length).fill(null));
		setFlippable(Array(data.records.length).fill(false));
		setReadOnly(Array(data.records.length).fill(false));
	}, []);

	// https://www.debuggr.io/react-map-of-undefined/
	const cards = flashcardData.map((card) => {
		return <Card card={card} key={card.id} />;
	});

	// navigation in cards
	function previousCard() {
		setCurrent(current - 1);
	}
	function nextCard() {
		setCurrent(current + 1);
	}

	function handleInputChange(event) {
		setInputValue(event.target.value);
	}

	function handleEnterClick() {
		const newComparisonResults = [...comparisonResults];
		newComparisonResults[current] =
			flashcardData[current]?.fields.side2 === inputValue;
		setComparisonResults(newComparisonResults);

		const comparisonResult =
			flashcardData[current]?.fields.side2 === inputValue;
		setGradTwoValue((prevGradTwoValue) => {
			const newGradTwoValue = [...prevGradTwoValue];
			newGradTwoValue[current] = comparisonResult ? "#4BB543" : "#cc0000";
			return newGradTwoValue;
		});

		const newFlippable = [...flippable];
		newFlippable[current] = true;
		setFlippable(newFlippable);

		const newReadOnly = [...readOnly];
		newReadOnly[current] = true;
		setReadOnly(newReadOnly);

		setInputValue("");
	}

	function handleClick() {
		if (flippable[current] || comparisonResults[current] !== null) {
			setReadOnly((prevReadOnly) => {
				const newReadOnly = [...prevReadOnly];
				newReadOnly[current] = true;
				return newReadOnly;
			});
		}
	}

	function handleShowReport() {
		setShowReport(true); // Show the report when "show report" button is clicked
	}

	return (
		<>
			{/* number of cards */}
			{flashcardData && flashcardData.length > 0 ? (
				<div className="cardNumber">
					Card {current + 1} of {flashcardData.length}
				</div>
			) : (
				""
			)}
			{/* /number of cards */}

			{/* render cards */}
			{/* {flashcardData && flashcardData.length > 0 ? cards[current] : loading} */}
			{flashcardData && flashcardData.length > 0 ? (
				<Card
					card={flashcardData[current]}
					gradTwoValue={gradTwoValue[current]}
					flippable={flippable[current]}
					handleClick={handleClick}
				/>
			) : (
				<div className="loading">Loading flashcard content...</div>
			)}
			{/* /render cards */}

			{/* render input field and button */}
			<div className="input-section">
				<input
					type="text"
					onChange={handleInputChange}
					placeholder="Enter text here"
					value={inputValue}
					readOnly={readOnly[current]}
				/>
				<button onClick={handleEnterClick} disabled={readOnly[current]}>
					Enter
				</button>
			</div>
			{/* /render input field and button */}

			{/* render nav buttons */}
			<div className="nav">
				{current > 0 ? (
					<button onClick={previousCard}>Previous card</button>
				) : (
					<button className="disabled" disabled>
						Previous card
					</button>
				)}
				{current < flashcardData.length - 1 ? (
					<button onClick={nextCard}>Next card</button>
				) : (
					<button className="disabled" disabled>
						Next card
					</button>
				)}
			</div>
			{/* /render nav buttons */}

			{/* render "show report" button */}
			{current === flashcardData.length - 1 && !showReport && (
				<button onClick={handleShowReport}>Show Report</button>
			)}
			{/* /render "show report" button */}

			{/* render report component */}
			{showReport && (
				<ReportComponent
					flashcardData={flashcardData}
					comparisonResults={comparisonResults}
				/>
			)}
			{/* /render report component */}
		</>
	);
}

export default Cards;
