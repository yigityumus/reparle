// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

import "./Register.css";

const LoginForm = ({ toggleForm }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { setLoggedInUser } = useUser();

	const handleLogin = () => {
		// Handle login logic here (e.g., send data to server, validate credentials)
		console.log("Logging in with:", username, password);

		setLoggedInUser({ username });
		// Redirect to Home page upon successful login
		navigate("/home");
	};

	const handleForgotPassword = () => {
		// Redirect to forgot password page or perform related action
		console.log("Redirecting to forgot password page");
		// window.location.href = '/forgot-password'; // Redirect using React Router if applicable
	};

	return (
		<div className="login-form">
			<h2>Login</h2>
			<form>
				<div className="form-group">
					<label>Username</label>
					<input
						type="text"
						className="form-control"
						placeholder="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						className="form-control"
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<a href="#" onClick={handleForgotPassword}>
						Forgot your password?
					</a>
				</div>
				<div>
					<button
						className="register-button"
						type="button"
						onClick={handleLogin}
					>
						Login
					</button>
				</div>
			</form>
			<a href="#" onClick={toggleForm}>
				Not a member yet? Sign Up
			</a>
		</div>
	);
};

const SignupForm = ({ toggleForm }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [membershipType, setMembershipType] = useState("free"); // Default membership type

	const handleSignup = () => {
		// Handle signup logic here (e.g., send data to server, validate inputs)
		console.log(
			"Signing up with:",
			username,
			password,
			confirmPassword,
			membershipType
		);
	};

	return (
		<div className="signup-form">
			<h2>Sign Up</h2>
			<form>
				<div className="form-group">
					<label>Username</label>
					<input
						type="text"
						className="form-control"
						placeholder="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						className="form-control"
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label>Confirm Password</label>
					<input
						type="password"
						className="form-control"
						placeholder="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label>Membership Type</label>
					<select
						value={membershipType}
						onChange={(e) => setMembershipType(e.target.value)}
					>
						<option value="free">Free</option>
						<option value="premium">Premium</option>
						<option value="enterprise">Enterprise</option>
					</select>
				</div>
				<div>
					<button
						className="register-button"
						type="button"
						onClick={handleSignup}
					>
						Sign Up
					</button>
				</div>
			</form>
			<a href="#" onClick={toggleForm}>
				Already a member? Log In
			</a>
		</div>
	);
};

const Register = () => {
	const [showLoginForm, setShowLoginForm] = useState(true);

	const toggleForm = () => {
		setShowLoginForm(!showLoginForm);
	};

	return (
		<div className="form">
			{showLoginForm ? (
				<LoginForm toggleForm={toggleForm} />
			) : (
				<SignupForm toggleForm={toggleForm} />
			)}
		</div>
	);
};

export default Register;
