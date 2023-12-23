// import React from "react";

// import ApplicationPage from "./components/applicationPage/ApplicationPage";

// import "./App.css";

// function App() {
// 	return (
// 		<div className="app">
// 			<ApplicationPage />
// 		</div>
// 	);
// }

// export default App;

// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import ApplicationPage from "./components/applicationPage/ApplicationPage";

import "./App.css";
import { UserProvider } from "./components/UserContext";

function App() {
	return (
		<div className="app">
			<Router>
				<UserProvider>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/home" element={<ApplicationPage />} />
					</Routes>
				</UserProvider>
			</Router>
		</div>
	);
}

export default App;
