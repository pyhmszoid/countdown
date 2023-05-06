import { useState } from "react";

interface IProps {
	onClickStart: (timer: number, questionNbr: number) => void;
}

export const SetupQuizz = (props: IProps) => {
	const [timer, setTimer] = useState<number>(3);
	const [questionNbr, setQuestionNbr] = useState<number>(4);
	const handleNext = () => {
		props.onClickStart(timer, questionNbr);
	};

	return (
		<>
			<div style={{ display: "flex" }}>
				<div>{"timer:"}</div>
				<input
					type={"number"}
					onChange={(e) => setTimer(Number(e.target.value))}
					value={timer}
				/>
			</div>
			<div style={{ display: "flex" }}>
				<div>{"nbr questions:"}</div>
				<input
					type={"number"}
					onChange={(e) => setQuestionNbr(Number(e.target.value))}
					value={questionNbr}
				/>
			</div>

			<button onClick={handleNext}>{"start"}</button>
		</>
	);
};
