import { useState, useEffect } from "react";
import { Canvas } from "./canvas";
import { IKanji } from "./quizz";

interface IProps {
	kanjis: IKanji[];
	// end correction
	onClickNext: () => void;
}

export const CorrectionQuizz = (props: IProps) => {
	const [kanjis, setKanjis] = useState<IKanji[]>(props.kanjis);
	const [index, setIndex] = useState<number>(0);

	useEffect(() => {
		setKanjis(props.kanjis);
	}, [props.kanjis]);

	const handleNext = () => {
		if (index + 1 < kanjis.length) {
			setIndex(index + 1);
		} else {
			setIndex(0);
			props.onClickNext();
		}
	};

	return (
		<>
			{kanjis.length > index && (
				<div>
					<div>{kanjis[index].kanji}</div>
					{kanjis[index].meanings.map((a, i) => {
						return <div key={"kenji_" + i}>{a}</div>;
					})}
				</div>
			)}
			<button onClick={handleNext}>{"next"}</button>
			<div
				style={{
					display: "flex",
				}}
			>
				<Canvas />
				<div
					style={{
						display: "flex",
						fontSize: "200px",
						color: "white",
						backgroundColor: "black",
					}}
				>
					{kanjis[index].kanji}
				</div>
			</div>
		</>
	);
};
