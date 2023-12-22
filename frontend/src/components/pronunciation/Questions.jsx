// Questions.jsx

import React, { useState } from "react";

import "./Questions.css";

const QuestionsComponent = () => {
	const [current, setCurrent] = useState(0);
	const [word, setWord] = useState("Example Word");
	const [phonemes, setPhonemes] = useState("This will be Correct phonemes");
	const [recording, setRecording] = useState(false);
	const [mediaRecorder, setMediaRecorder] = useState(null);

	function previousQuestion() {
		setCurrent(current - 1);
	}
	function nextQuestion() {
		setCurrent(current + 1);
	}

	const startRecording = async () => {
		try {
			if (!recording) {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				});
				const recorder = new MediaRecorder(stream);
				setMediaRecorder(recorder); // Update mediaRecorder state

				const audioChunks = [];
				recorder.ondataavailable = (e) => {
					audioChunks.push(e.data);
				};

				recorder.start();
				console.log("Recording started...");
				setRecording(true);

				// Simulate stopping recording after 5 seconds
				setTimeout(() => {
					stopRecording();
				}, 5000);
			} else {
				stopRecording();
			}
		} catch (error) {
			console.error("Error accessing microphone:", error);
			// Handle errors related to accessing the microphone
		}
	};

	const stopRecording = async () => {
		console.log("Recording stopped...");
		setRecording(false);

		if (mediaRecorder && mediaRecorder.state === "recording") {
			mediaRecorder.stop();
			mediaRecorder.ondataavailable = async (e) => {
				const audioBlob = new Blob([e.data], { type: "audio/wav" });

				const formData = new FormData();
				formData.append("audio", audioBlob, "voice_recording.wav");

				try {
					const response = await fetch("/api/save-audio", {
						method: "POST",
						body: formData,
					});

					if (response.ok) {
						console.log("Audio saved successfully!");
						// Display a message that the answer has been saved to the database
					} else {
						console.error("Failed to save audio");
						// Handle the failure to save audio
					}
				} catch (error) {
					console.error("Error occurred while saving audio:", error);
					// Handle the error
				}
			};
		}
	};

	return (
		<div className="questions-container">
			<div className="word-container">
				<div className="word">{word}</div>
				<div className="phonemes">{phonemes}</div>
			</div>
			<div className="controls-container">
				<button onClick={previousQuestion}>Previous</button>
				<button onClick={nextQuestion}>Next</button>
				<button
					className={`record-button ${recording ? "recording" : ""}`}
					onClick={startRecording}
				>
					{recording ? "Stop" : "Record"}
				</button>
			</div>
		</div>
	);
};

export default QuestionsComponent;
