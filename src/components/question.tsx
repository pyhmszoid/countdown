import { Canvas } from "./canvas";
import { IKanji } from "./quizz";
import { useEffect, useState } from "react";
import { useTimer } from "./timer/useTimer";

interface IProps {
	kanji: IKanji;
	timer: number;
	onClickNext: () => void;
}

export const Question = (props: IProps) => {
	const [kanji, setKanji] = useState<IKanji>(props.kanji);
	const [isStart, setIsStart] = useState<boolean>(true);
	const [isReset, setIsReset] = useState<boolean>(false);

	const handleNext = () => {
		props.onClickNext();
		setIsReset(!isReset);
		setIsStart(true);
	};

	const [floorTimer, timer, idleTimer] = useTimer({
		time: props.timer,
		start: isStart,
		reset: isReset,
		onTimerEnd: handleNext,
		tick: 1,
		loop: false,
	});

	useEffect(() => {
		setKanji(props.kanji);
	}, [props.kanji]);

	return (
		<>
			<div style={{ display: "flex" }}>
				<div>{"Timer:"}</div>
				<div>
					{floorTimer.getSeconds() +
						" / " +
						idleTimer.getMinutes() +
						":" +
						idleTimer.getSeconds()}
				</div>
			</div>

			<div>
				{kanji.meanings.map((a, index) => {
					return <div key={"k_" + index}>{a}</div>;
				})}
			</div>
			<button onClick={handleNext}>{"next"}</button>
			<Canvas />
		</>
	);
};
