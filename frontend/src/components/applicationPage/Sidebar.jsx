// Sidebar.jsx

import React from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

import "./Sidebar.css";

function Sidebar({ handleOptionChange }) {
	const navigate = useNavigate();
	// Mock user data, replace with actual user info
	const { loggedInUser } = useUser();
	const username = loggedInUser ? loggedInUser.username : "";
	console.log(`username: ${username}`);

	const handleLogout = () => {
		navigate("/");
		// Implement your logout logic here
		// For example, redirect to the logout endpoint
	};

	return (
		<div className="sidebar">
			<div className="user-info">
				<p>Welcome {username}</p>
				<button className="logout-button" onClick={handleLogout}>
					Logout
				</button>
			</div>
			<div className="options">
				<button
					className="sidebar-options"
					onClick={() => handleOptionChange("Dashboard")}
				>
					Dashboard
				</button>
				<button
					className="sidebar-options"
					onClick={() => handleOptionChange("FlashCard")}
				>
					FlashCard
				</button>
				<button
					className="sidebar-options"
					onClick={() => handleOptionChange("DailyQuestion")}
				>
					DailyQuestion
				</button>
				<button
					className="sidebar-options"
					onClick={() => handleOptionChange("Pronunciation")}
				>
					Pronunciation
				</button>
			</div>
		</div>
	);
}

export default Sidebar;
