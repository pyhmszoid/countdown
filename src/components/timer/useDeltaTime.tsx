import { useEffect, useRef, useState } from "react";

interface IProps {
	start: boolean;
}

export const useDeltaTime = (
	props: IProps
): [React.MutableRefObject<number>, boolean] => {
	const [update, setUpdate] = useState<boolean>(false);
	const tick = useRef<any>(null);
	const dt = useRef<number>(0);
	const lastUpdate = useRef<number>(Date.now());

	useEffect(() => {
		if (props.start) {
			startTick();
		} else {
			stopTick();
		}
	}, [props.start]);

	const startTick = () => {
		if (tick.current !== null) {
			return;
		}

		lastUpdate.current = Date.now();

		tick.current = setInterval(() => {
			const now: number = Date.now();
			dt.current = now - lastUpdate.current;
			lastUpdate.current = now;
			setUpdate((update) => !update);
		}, 1);
	};

	const stopTick = () => {
		clearInterval(tick.current);
		tick.current = null;
	};

	return [dt, update];
};
