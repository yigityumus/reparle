// Questions.jsx

import React, { useState, useEffect } from "react";

import "./Questions.css";
import Question from "./Question";

import data from "../../data/pronunciation.json";

const QuestionsComponent = () => {
	const [current, setCurrent] = useState(0);
	const [wordData, setWordData] = useState([]);
	const [phonemes, setPhonemes] = useState("This will be Correct phonemes");
	const [recording, setRecording] = useState(false);
	const [mediaRecorder, setMediaRecorder] = useState(null);
	const [userInput, setUserInput] = useState("");

	useEffect(() => {
		// Set state with the imported data from the local JSON file
		setWordData(data.records);
	}, []);

	const questions = wordData.map((question) => {
		return <Question question={question} key={question.id} />;
	});

	function previousQuestion() {
		setCurrent(current - 1);
		setUserInput("");
	}
	function nextQuestion() {
		setCurrent(current + 1);
		setUserInput("");
	}

	// const startRecording = async () => {
	// 	try {
	// 		if (!recording) {
	// 			const stream = await navigator.mediaDevices.getUserMedia({
	// 				audio: true,
	// 			});
	// 			const recorder = new MediaRecorder(stream);
	// 			setMediaRecorder(recorder);

	// 			const audioChunks = [];
	// 			recorder.ondataavailable = (e) => {
	// 				audioChunks.push(e.data);
	// 			};

	// 			recorder.start();
	// 			console.log("Recording started...");
	// 			setRecording(true);

	// 			setTimeout(() => {
	// 				stopRecording();
	// 			}, 5000);
	// 		} else {
	// 			stopRecording();
	// 		}
	// 	} catch (error) {
	// 		console.error("Error accessing microphone:", error);
	// 	}
	// };

	// const stopRecording = async () => {
	// 	console.log("Recording stopped...");
	// 	setRecording(false);
	// 	if (mediaRecorder && mediaRecorder.state === "recording") {
	// 		mediaRecorder.stop();
	// 		mediaRecorder.ondataavailable = async (e) => {
	// 			const audioBlob = new Blob([e.data], { type: "audio/wav" });
	// 			const formData = new FormData();
	// 			formData.append("audio", audioBlob, "voice_recording.wav");
	// 			try {
	// 				const response = await fetch("http://localhost:5000/api/save-audio", {
	// 					method: "POST",
	// 					body: formData,
	// 				});
	// 				if (response.ok) {
	// 					console.log("Audio saved successfully!");
	// 					// Display a message that the answer has been saved to the database
	// 				} else {
	// 					console.error("Failed to save audio");
	// 					// Handle the failure to save audio
	// 				}
	// 			} catch (error) {
	// 				console.error("Error occurred while saving audio:", error);
	// 				// Handle the error
	// 			}
	// 		};
	// 	}
	// };

	const startRecording = async () => {
		try {
			if (!recording) {
				console.log("Recording started...");
				setRecording(true);

				setTimeout(() => {
					stopRecording();
				}, 5000);
			} else {
				stopRecording();
			}
		} catch (error) {
			console.error("Error accessing microphone:", error);
		}
	};

	const stopRecording = async () => {
		setRecording(false);
		const userInputs = [
			"/ket/",
			"/dɔːɡ/",
			"/haus/",
			"/ˈhæpi/",
			"/ˈwɔːtər/",
			"/komˈpjuːtər/",
			"/ˈelefənt/",
			"/bəˈnænə/",
			"/ˈɔːrɪndʒ/",
			"/ʌmˈbrɛllə/",
		];

		const currentQuestion = wordData[current];
		setUserInput(userInputs[current]);

		if (currentQuestion.fields.phoneme === userInputs[current]) {
			// Matched, set background color to green
			document.querySelector(".question").style.background = "#4BB543";
		} else {
			// Not matched, set background color to red
			document.querySelector(".question").style.background = "#CC0000";
		}
	};

	return (
		<>
			{/* number of cards */}
			{wordData && wordData.length > 0 ? (
				<div className="questionNumber">
					Question {current + 1} of {wordData.length}
				</div>
			) : (
				""
			)}
			{/* /number of cards */}

			{/* render cards */}
			{/* {flashcardData && flashcardData.length > 0 ? cards[current] : loading} */}
			{wordData && wordData.length > 0 ? (
				<Question question={wordData[current]} />
			) : (
				<div className="loading">Loading flashcard content...</div>
			)}
			{/* /render cards */}
			<div className="controls-container">
				<button
					className={`record-button ${recording ? "recording" : ""}`}
					onClick={startRecording}
				>
					{recording ? "Stop" : "Record"}
				</button>
			</div>

			{/* User Input */}
			<div className="user-input">
				<h4>{userInput}</h4>
			</div>

			{/* /render nav buttons */}
			<div className="nav">
				{current > 0 ? (
					<button onClick={previousQuestion}>Previous Question</button>
				) : (
					<button className="disabled" disabled>
						Previous Question
					</button>
				)}
				{current < wordData.length - 1 ? (
					<button onClick={nextQuestion}>Next Question</button>
				) : (
					<button className="disabled" disabled>
						Next Question
					</button>
				)}
			</div>
			{/* /render nav buttons */}
		</>
	);
};

export default QuestionsComponent;
