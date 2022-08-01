import { useEffect, useState } from "react";
import { useTimer } from "../components/useTimer";
import { EDirectionBar } from "./loading-bar/Bar";
import { LoadingBar } from "./loading-bar/LoadingBar";

export const Timer = (): React.ReactElement => {
	const [startUI, setStartUI] = useState<boolean>(false);
	const [start, setStart] = useState<boolean>(false);
	const [reset, setReset] = useState<boolean>(false);
	const [loop, setLoop] = useState<boolean>(false);

	const [timera, setTimera] = useState<number>(0);

	const handleEndTimer = () => {
		if (loop) {
			setReset(!reset);
			setStart(true);
		} else {
			setStart(false);
		}
		console.log(timera - Date.now());
	};

	const [timer, asd, timerM, isActive] = useTimer({
		timer: 10,
		start: start,
		reset: reset,
		onTimerEnd: handleEndTimer,
		tick: 1,
		loop,
	});

	useEffect(() => {
		setStartUI(isActive);
	}, [isActive]);

	const handleStartClick = () => {
		setStart(!start);
		setTimera(Date.now());
	};

	const handleResetClick = () => {
		console.log("click");
		setReset(!reset);
		setStart(false);
	};

	const handleLoopClick = () => {
		setLoop(!loop);
	};

	return (
		<>
			{!startUI ? (
				<button onClick={handleStartClick}>{"start"}</button>
			) : (
				<button onClick={handleStartClick}>{"pause"}</button>
			)}
			<button onClick={handleResetClick}>{"reset"}</button>
			<input type="checkbox" onChange={handleLoopClick} checked={loop} />

			<div>
				{timer.getMinutes() +
					" : " +
					timer.getSeconds() +
					" : " +
					timer.getMilliseconds()}
			</div>
			<div>
				{timerM.getMinutes() +
					" : " +
					timerM.getSeconds() +
					" : " +
					timerM.getMilliseconds()}
			</div>
			<div>{timer.getTime() + " / " + timerM.getTime()}</div>
			<LoadingBar
				percent={asd.getTime() / timerM.getTime()}
				elementCount={10}
				margfinBar={1}
				marginElement={1}
				style={{ width: 300, height: 31, margin: 10 }}
				direction={EDirectionBar.LEFT}
			/>
		</>
	);
};
/*for (let i = 0; i < 500; )
					<div style={{ backgroundColor: "green", width: 10 }}></div>*/
