import { useEffect, useRef, useState } from "react";

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
	const width = useRef<number>(100);
	const height = useRef<number>(100);

	useEffect(() => {
		if (props.direction & (EDirectionBar.LEFT | EDirectionBar.RIGHT)) {
			width.current = props.percent;
		}

		if (props.direction & (EDirectionBar.BOTTOM | EDirectionBar.TOP)) {
			height.current = props.percent;
		}
	}, [props.percent]);

	return (
		<div
			style={{
				backgroundColor: "red",
				width: width.current + "%",
				height: height.current + "%",
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
