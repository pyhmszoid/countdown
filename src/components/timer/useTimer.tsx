import { useEffect, useRef, useState } from "react";
import { useDeltaTime } from "./useDeltaTime";

interface IProps {
	time: number;
	start: boolean;
	reset: boolean;
	tick: number;
	loop: boolean;

	onTimerEnd: () => void;
}

const useTimerDef: IProps = {
	time: 0,
	start: true,
	reset: false,
	tick: 1,

	loop: false,

	onTimerEnd: () => {},
};

export const useTimer = (props: IProps = useTimerDef): [Date, Date, Date] => {
	const timer = useRef<Date>(new Date(0));
	const floorTimer = useRef<Date>(new Date(0));
	const [idleTimer, setIdleTimer] = useState<Date>(new Date(0));

	const [isActive, setIsActive] = useState<boolean>(props.start);
	const [isEnded, setIsEnded] = useState(false);

	const [dt, update] = useDeltaTime({ start: isActive });

	useEffect(() => {
		initializeTimer();
	}, [props.reset]);

	useEffect(() => {
		setIsActive(props.start);
		if (isEnded && props.start) {
			initializeTimer();
		}
	}, [props.start]);

	useEffect(() => {
		if (!isActive || isEnded) {
			return;
		}

		timer.current = new Date(timer.current.getTime() - dt.current);

		if (timer.current.getTime() <= 0) {
			endTimer();
			return;
		}

		let tm = floorTimer.current.getTime();
		while (tm - timer.current.getTime() >= props.tick) {
			tm = Math.round(timer.current.getTime() / props.tick) * props.tick;
		}
		floorTimer.current = new Date(tm);
	}, [isActive, update]);

	const initializeTimer = () => {
		const dat = new Date(0);
		dat.setSeconds(props.time);

		timer.current = dat;
		floorTimer.current = dat;
		setIdleTimer(dat);
		setIsEnded(false);
	};

	const endTimer = () => {
		floorTimer.current = new Date(0);
		timer.current = new Date(0);
		setIsEnded(true);
		props.onTimerEnd();
	};

	return [floorTimer.current, timer.current, idleTimer];
};
