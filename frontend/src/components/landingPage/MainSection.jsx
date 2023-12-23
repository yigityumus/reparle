//MainSection.jsx

import React from "react";

import "./MainSection.css";
import Slogan from "./Slogan";
import Register from "./Register";

const MainSection = () => {
	return (
		<section id="home" className="main-section">
			<div className="slogan-container">
				<Slogan />
			</div>
			<div className="form-container">
				<Register />
			</div>
		</section>
	);
};

export default MainSection;
