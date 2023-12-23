import React from "react";
import Navbar from "./Navbar";
import MainSection from "./MainSection";
import About from "./About";
import Pricing from "./Pricing";
import Contact from "./Contact";
import CommentSection from "./CommentSection";

function LandingPage() {
	return (
		<>
			<Navbar />
			<MainSection />
			<About />
			<CommentSection />
			<Pricing />
			<Contact />
		</>
	);
}

export default LandingPage;
