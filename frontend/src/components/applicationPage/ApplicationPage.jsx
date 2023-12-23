// ApplicationPage.jsx

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import FlashCard from "./flashcard/FlashCard";
import Dashboard from "./dashboard/Dashboard";
import DailyQuestion from "./dailyquestion/DailyQuestion";
import Pronunciation from "./pronunciation/Pronunciation";

import "./ApplicationPage.css";

function ApplicationPage() {
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
		}
	};

	// console.log("Rendered Content:", renderContent());

	return (
		<div className="application-page">
			<Sidebar handleOptionChange={handleOptionChange} />
			<MainContent>{renderContent()}</MainContent>
		</div>
	);
}

export default ApplicationPage;
