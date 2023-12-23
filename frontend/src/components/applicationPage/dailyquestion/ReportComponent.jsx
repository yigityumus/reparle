// ReportComponent.jsx
import React from "react";
import "./ReportComponent.css";

const ReportComponent = ({ flashcardData, comparisonResults }) => {
	const trueAnswers = comparisonResults.filter(
		(result) => result === true
	).length;
	const falseAnswers = comparisonResults.filter(
		(result) => result === false
	).length;

	const renderReport = () => {
		return comparisonResults.map((result, index) => (
			<tr key={index}>
				<td>{`Card ${index + 1}`}</td>
				<td>{flashcardData[index]?.fields.side1}</td>
				<td>{flashcardData[index]?.fields.side2}</td>
				<td style={{ color: result ? "green" : "red" }}>
					{result !== null ? (result ? "Correct" : "Wrong") : "-"}
				</td>
			</tr>
		));
	};

	return (
		<div className="report-container">
			<h3>Results Report</h3>
			<table className="report-table">
				<thead>
					<tr>
						<th>Card #</th>
						<th>Question</th>
						<th>Answer</th>
						<th>Result</th>
					</tr>
				</thead>
				<tbody>{renderReport()}</tbody>
			</table>
			<div className="summary">
				<p>
					Result: Correct: {trueAnswers} Wrong: {falseAnswers}
				</p>
			</div>
		</div>
	);
};

export default ReportComponent;
