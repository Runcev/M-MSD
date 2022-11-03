import React, { useEffect, useState } from "react";
import AntButton from "./components/antButton";
import { isIntersected, isConvex, pointsCreation } from "./backend/check";

import "antd/dist/antd.css";
import "./App.css";

const App = () => {
	const [fileData, setFileData] = useState<
		string | ArrayBuffer | null | undefined
	>("");
	const [quadrangle, setQuadrangle] = useState<boolean>(false);
	const [convex, setConvex] = useState<boolean>(false);

	let calculator: Desmos.Calculator;

	useEffect(() => {
		const calculatorContainer = document.getElementById("calculator");
		const calculatorWrappers = document.getElementsByClassName("dcg-wrapper");

		if (calculatorContainer && calculatorWrappers.length === 0) {
			calculator = Desmos.GraphingCalculator(calculatorContainer);
		}
	}, []);


	const handleFile = (file: File) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => {
			const { result } = reader;
			setFileData(result);
			evaluate(result as string);
		});
		reader.readAsText(file);
	};

	const evaluate = (input: string) => {
		const points = pointsCreation(input);
		//const points: Point[] = [{"x":1,"y":1},{"x":2,"y":2},{"x":2,"y":4},{"x":-1,"y":5}];
		//const points: Point[] = [{"x":1,"y":1},{"x":2,"y":2},{"x":1,"y":2},{"x":2,"y":0}];
		//const points: Point[] = [{"x":0,"y":0},{"x":10,"y":3},{"x":0,"y":5},{"x":5,"y":3}];
		//const points: Point[] = [{"x":0,"y":0},{"x":5,"y":0},{"x":10,"y":0},{"x":15,"y":0}];
		console.log("points" + JSON.stringify(points));

		let latex: string = "y=";

		for (let i = 0; i < points.length; i++) {
			latex += `(${points[i].x}, ${points[i].y})`;
			if (i !== points.length - 1) {
				latex += ", ";
			} else {
				latex += `, (${points[0].x}, ${points[0].y})`;
			}
		}

		calculator.setExpression({ id: "graph1", latex: latex, lines: true });

		const pointsIntersect: boolean[] = [
			isIntersected(points[0], points[1], points[2], points[3]),
			isIntersected(points[3], points[0], points[1], points[2]),
		];
		const isQuadrangle = !pointsIntersect.some(Boolean);

		setQuadrangle(isQuadrangle);
		setConvex(isConvex(points));
	};

	return (
		<div className="App">
			<h1>Lab 1 - Quadrangle</h1>
			<div id="calculator-wrapper">
				<div id="calculator" />
				<div className="answers">
					<AntButton handleFile={handleFile} />
					<div style={{ height: 20 }}/>
					{fileData && (
						<>
							<p id="1">Чотирикутник: {quadrangle ? "✅" : "❌"} </p>
							<p id="2">Опуклий: {convex ? "✅" : "❌"}</p>
							<p id="3">Неопуклий: {!convex ? "✅" : "❌"}</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
