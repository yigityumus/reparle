import React from "react";
import "./Pricing.css";

const Pricing = () => {
	return (
		<section id="pricing" className="pricing-section">
			<h2>Choose A Plan</h2>
			<div className="plan-options">
				<div className="plan-option">
					<h3>Free</h3>
					<ul>
						<li>5 decks</li>
						<li>2 languages</li>
						<li>250 MB Storage</li>
						<li>1 device</li>
					</ul>
					<div>
						<h3 className="pricing">Free</h3>
					</div>
				</div>
				<div className="plan-option">
					<h3>Personal</h3>
					<ul>
						<li>20 decks</li>
						<li>5 languages</li>
						<li>500 MB Storage</li>
						<li>2 devices</li>
					</ul>
					<div>
						<h3 className="pricing">$0.99</h3>
					</div>
				</div>
				<div className="plan-option">
					<h3>Enthusiast</h3>
					<ul>
						<li>50 decks</li>
						<li>Unlimited languages</li>
						<li>Unlimited Storage</li>
						<li>6 devices</li>
					</ul>
					<div>
						<h3 className="pricing">$1.99</h3>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Pricing;
