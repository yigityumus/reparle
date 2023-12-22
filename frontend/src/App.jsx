// App.js

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import FlashCard from "./components/flashcard/FlashCard";
import Dashboard from "./components/Dashboard";
import DailyQuestion from "./components/dailyquestion/DailyQuestion";
import Pronunciation from "./components/pronunciation/Pronunciation";

import "./App.css";

function App() {
	const [selectedOption, setSelectedOption] = useState("Dashboard"); // Default option

	const handleOptionChange = (option) => {
		setSelectedOption(option);
	};

	const renderContent = () => {
		console.log("Selected Option:", selectedOption); // Add a console log to check selected option

		switch (selectedOption) {
			case "Dashboard":
				return <Dashboard />;
			case "FlashCard":
				return <FlashCard />;
			case "DailyQuestion":
				return <DailyQuestion />;
			case "Pronunciation":
				return <Pronunciation />;
			default:
				return null;
			// mal
		}
	};

	// console.log("Rendered Content:", renderContent());

	return (
		<div className="app">
			<Sidebar handleOptionChange={handleOptionChange} />
			<MainContent>{renderContent()}</MainContent>
		</div>
	);
}

export default App;
