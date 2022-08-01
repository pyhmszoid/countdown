import {
	CSSProperties,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from "react";
import { EDirectionBar } from "./Bar";
import { BarContainer } from "./BarContainer";

interface IProps {
	percent: number;
	elementCount: number;
	style: CSSProperties;
	margfinBar: number;
	marginElement: number;
	direction: EDirectionBar;
}

export const LoadingBar = (props: IProps): React.ReactElement => {
	const [width, setWidth] = useState<number>(0);
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (divRef.current && divRef.current.parentElement) {
			setWidth(
				divRef.current.parentElement.clientWidth - props.margfinBar * 2
			);
		}
	}, [props.margfinBar, props.marginElement]);

	const dsa = (): ReactElement[] => {
		const element: ReactElement[] = [];
		const value = props.elementCount * props.percent;

		for (let i = 0; i < value; i++) {
			let perc = 100;
			if (i + 1 > value) {
				perc = (value - i) * 100;
			}
			const elem = (
				<BarContainer
					key={"barContainer_" + i}
					marginElement={props.marginElement}
					width={width / props.elementCount}
					percent={perc}
					direction={props.direction}
				/>
			);
			element.push(elem);
		}

		return element;
	};

	return (
		<div
			style={{
				display: "flex",
				border: "black",
				borderStyle: "solid",
				borderWidth: 1,
				...props.style,
			}}
		>
			<div
				ref={divRef}
				style={{
					display: "flex",
					margin: props.margfinBar,
				}}
			>
				{dsa()}
			</div>
		</div>
	);
};
