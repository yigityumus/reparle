import React from "react";

import "./Navbar.css";

const Navbar = () => {
	const handleScroll = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start", // Align the element at the top of the viewport
				inline: "start",
			});
		}
	};

	return (
		<nav className="navbar">
			<div className="company-logo">
				<a href="#">
					<img src="./reparle-logo.png" alt="Reparle" />
				</a>
			</div>
			<ul>
				<li>
					<a href="#about" onClick={() => handleScroll("about")}>
						About
					</a>
				</li>
				<li>
					<a href="#pricing" onClick={() => handleScroll("pricing")}>
						Pricing
					</a>
				</li>
				<li>
					<a href="#contact" onClick={() => handleScroll("contact")}>
						Contact
					</a>
				</li>
				<li>
					<a href="#login" onClick={() => handleScroll("login")}>
						Login
					</a>
				</li>
				<li>
					<a href="#signup" onClick={() => handleScroll("signup")}>
						Signup
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
