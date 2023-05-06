import { useState } from "react";
import { useTimer } from "./useTimer";
import { EDirectionBar } from "../loading-bar/Bar";
import { LoadingBar } from "../loading-bar/LoadingBar";

export const Timer = (): React.ReactElement => {
	const [isStart, setIsStart] = useState<boolean>(true);
	const [isReset, setIsReset] = useState<boolean>(false);
	const [isLoop, setIsLoop] = useState<boolean>(true);

	const handleEndTimer = () => {
		if (isLoop) {
			setIsReset(!isReset);
			setIsStart(true);
		} else {
			setIsStart(false);
		}
	};

	const [floorTimer, timer, idleTimer] = useTimer({
		time: 10,
		start: isStart,
		reset: isReset,
		onTimerEnd: handleEndTimer,
		tick: 1000,
		loop: isLoop,
	});

	const handleStartClick = () => {
		setIsStart(!isStart);
	};

	const handleResetClick = () => {
		setIsReset(!isReset);
		setIsStart(false);
	};

	const handleLoopClick = () => {
		setIsLoop(!isLoop);
	};

	return (
		<>
			{!isStart ? (
				<button onClick={handleStartClick}>{"start"}</button>
			) : (
				<button onClick={handleStartClick}>{"pause"}</button>
			)}
			<button onClick={handleResetClick}>{"reset"}</button>
			<input
				type="checkbox"
				onChange={handleLoopClick}
				checked={isLoop}
			/>

			<div>
				{floorTimer.getMinutes() +
					" : " +
					floorTimer.getSeconds() +
					" : " +
					floorTimer.getMilliseconds()}
			</div>
			<div>
				{idleTimer.getMinutes() +
					" : " +
					idleTimer.getSeconds() +
					" : " +
					idleTimer.getMilliseconds()}
			</div>
			<div>{floorTimer.getTime() + " / " + idleTimer.getTime()}</div>
			<LoadingBar
				percent={timer.getTime() / idleTimer.getTime()}
				elementCount={10}
				margfinBar={1}
				marginElement={1}
				style={{ width: 300, height: 31, margin: 10 }}
				direction={EDirectionBar.TOP}
			/>
		</>
	);
};
