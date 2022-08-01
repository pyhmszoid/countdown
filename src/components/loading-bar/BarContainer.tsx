import { CSSProperties } from "react";
import { Bar, EDirectionBar } from "./Bar";

const outerBar: CSSProperties = {
	justifyContent: "center",
	display: "flex",
	alignContent: "center",
};

const bar: CSSProperties = {
	flex: "1 1 auto",
	display: "flex",
};

interface IProps {
	marginElement: number;
	width: number;
	percent: number;
	direction: EDirectionBar;
}

export const BarContainer = (props: IProps): React.ReactElement => {
	return (
		<div
			style={{
				width: props.width,
				...outerBar,
			}}
		>
			<div
				className="element"
				style={{
					margin: props.marginElement,
					...bar,
				}}
			>
				<Bar percent={props.percent} direction={props.direction} />
			</div>
		</div>
	);
};
