import { useEffect, useState } from "react";
import { useDeltaTime } from "./useDeltaTime";

interface IProps {
	timer: number;
	start: boolean;
	reset: boolean;
	tick: number;
	loop: boolean;

	onTimerEnd: () => void;
}

const useTimerDef: IProps = {
	timer: 0,
	start: true,
	reset: false,
	tick: 1,

	loop: false,

	onTimerEnd: () => {},
};

export const useTimer = (
	props: IProps = useTimerDef
): [Date, Date, Date, boolean] => {
	const [timer, setTimer] = useState<Date>(new Date(0));
	const [timerShow, setTimerShow] = useState<Date>(new Date(0));
	const [timerM, setTimerM] = useState<Date>(new Date(0));

	const [isActive, setIsActive] = useState<boolean>(props.start);
	const [isEnded, setIsEnded] = useState(false);

	const [dt, update] = useDeltaTime({ start: isActive });

	useEffect(() => {
		initializeTimer();
	}, []);

	useEffect(() => {
		setIsActive(props.start);
		if (isEnded && props.start) {
			initializeTimer();
		}
	}, [props.start]);

	useEffect(() => {
		initializeTimer();
	}, [props.reset]);

	useEffect(() => {
		if (!isActive || isEnded) {
			return;
		}

		const time = new Date(timer.getTime() - dt.current);

		if (time.getTime() <= 0) {
			endTimer();
			return;
		}
		let tm = timerShow.getTime();

		while (tm - time.getTime() >= props.tick) {
			tm = Math.round(time.getTime() / props.tick) * props.tick;
		}

		if (tm !== timerShow.getTime()) {
			setTimerShow(new Date(tm));
		}

		setTimer(time);
	}, [isActive, update]);

	const initializeTimer = () => {
		const dat = new Date(0);
		dat.setSeconds(props.timer);

		setTimer(dat);
		setTimerShow(dat);
		setTimerM(dat);
		setIsEnded(false);
	};

	const endTimer = () => {
		setTimerShow(new Date(0));
		setTimer(new Date(0));
		setIsEnded(true);
		props.onTimerEnd();
	};

	return [timerShow, timer, timerM, isActive];
};
