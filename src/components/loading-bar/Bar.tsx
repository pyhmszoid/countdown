import { useEffect, useState } from "react";

export enum EDirectionBar {
	NONE = 0x0,
	LEFT = 0x01,
	RIGHT = 0x02,
	TOP = 0x04,
	BOTTOM = 0x08,
}

interface IProps {
	percent: number;
	direction: EDirectionBar;
}

export const Bar = (props: IProps) => {
	const [width, setWidth] = useState(100);
	const [height, setheight] = useState(100);

	useEffect(() => {
		if (props.direction & (EDirectionBar.LEFT | EDirectionBar.RIGHT)) {
			setWidth(props.percent);
		}

		if (props.direction & (EDirectionBar.BOTTOM | EDirectionBar.TOP)) {
			setheight(props.percent);
		}
	}, [props.percent]);

	return (
		<div
			style={{
				backgroundColor: "red",
				width: width + "%",
				height: height + "%",
				alignSelf: "flex-end",
			}}
		></div>
	);
};

const defaultProps: IProps = {
	percent: 100,
	direction: EDirectionBar.NONE,
};

Bar.defaultProps = defaultProps;
