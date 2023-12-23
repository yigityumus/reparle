// Contact.jsx
import React from "react";
import "./Contact.css";

const Contact = () => {
	return (
		<section id="contact" className="contact-section">
			<div className="contact-content">
				<div className="social-media-icons">
					<h2>Follow us on Social Media</h2>
					<div className="social-media-links">
						<div className="social-media-link">
							<img src="./social/x_black.png" alt="Twitter" />
							<a
								href="https://twitter.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								twitter.com/reparle
							</a>
						</div>
						<div className="social-media-link">
							<img src="./social/instagram_color.png" alt="Instagram" />
							<a
								href="https://instagram.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								instagram.com/reparle
							</a>
						</div>
						<div className="social-media-link">
							<img src="./social/meta_black.png" alt="Facebook" />
							<a
								href="https://facebook.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								facebook.com/reparle
							</a>
						</div>
					</div>
				</div>
				<div className="contact-form">
					<h2>Contact Us</h2>
					<input
						type="text"
						placeholder="Enter your message"
						className="message-input"
					/>
					<button>Send</button>
				</div>
			</div>
		</section>
	);
};

export default Contact;
