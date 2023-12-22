// Sidebar.jsx

import React from "react";

import "../styles/Sidebar.css";

function Sidebar({ handleOptionChange }) {
	// Mock user data, replace with actual user info
	const username = "User123";

	const handleLogout = () => {
		// Implement your logout logic here
		// For example, redirect to the logout endpoint
	};

	return (
		<div className="sidebar">
			<div className="user-info">
				<p>Welcome {username}</p>
				<button onClick={handleLogout}>Logout</button>
			</div>
			<div className="options">
				<button onClick={() => handleOptionChange("Dashboard")}>
					Dashboard
				</button>
				<button onClick={() => handleOptionChange("FlashCard")}>
					FlashCard
				</button>
				<button onClick={() => handleOptionChange("DailyQuestion")}>
					DailyQuestion
				</button>
				<button onClick={() => handleOptionChange("Pronunciation")}>
					Pronunciation
				</button>
			</div>
		</div>
	);
}

export default Sidebar;
