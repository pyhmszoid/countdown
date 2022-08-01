import { useEffect, useState } from "react";

interface IProps {
	start: boolean;
}

export const dsa = (props: IProps): [number, boolean] => {
	const [update, setUpdate] = useState<boolean>(false);
	const [dt, setdt] = useState<number>(0);
	const [start, setStart] = useState<boolean>(props.start);
	const [tick, setTick] = useState<any>(null);

	var lastUpdate = Date.now();
	let up = false;
	var deltaTime: number = 0;
	useEffect(() => {
		if (props.start) {
			setStart(true);
		} else {
			clearInterval(tick);
			setTick(null);
			setStart(false);
		}
	}, [props.start]);

	useEffect(() => {
		if (tick === null && start) {
			const ticka = setInterval(() => {
				const now: number = Date.now();
				deltaTime = now - lastUpdate;
				lastUpdate = now;
				up = !up;
				setUpdate(up);
				setdt(deltaTime);
			}, 1);

			setTick(ticka);
		}
	}, [start]);

	return [dt, update];
};
