import { useEffect, useState } from "react";
import kanjis from "../kanji.json";
import { CorrectionQuizz } from "./correction_quizz";
import { Question } from "./question";
import { SetupQuizz } from "./setup_quizz";

export interface IKanji {
	kanji: string;
	grade: number | null;
	stroke_count: number;
	meanings: string[];
	kun_readings: string[];
	on_readings: string[];
	name_readings: string[];
	jlpt: number | null;
	unicode: string;
	heisig_en: string | null;
}

export const Quizz = () => {
	const [questionPool, setQuestionPool] = useState<IKanji[]>([]);
	const [index, setIndex] = useState<number>(0);
	const [setup, setSetup] = useState<boolean>(true);
	const [end, setEnd] = useState<boolean>(false);

	useEffect(() => {
		const li: IKanji[] = kanjis.filter((kanji) => kanji.jlpt === 4);

		// Todo: random li
		const shortList = li.splice(0, 3);
		setQuestionPool(shortList);
	}, []);

	const handleStart = (timer: number, questionNbr: number) => {
		setSetup(false);
	};

	const handleNext = () => {
		if (index + 1 < questionPool.length) {
			setIndex(index + 1);
		} else {
			setIndex(0);
			setEnd(true);
			console.log("FIN DU QUIZZ");
		}
	};

	const handleEnd = () => {
		setSetup(true);
		setEnd(false);
	};

	return (
		<div
			style={{
				width: 500,
				height: 200,
				border: "solid",
				margin: 10,
			}}
		>
			<div>{"Quizz"}</div>

			{setup && <SetupQuizz onClickStart={handleStart}></SetupQuizz>}

			{!setup && !end && questionPool.length > index && (
				<div>
					<div>
						{"question: " + (index + 1) + "/" + questionPool.length}
					</div>
					<Question
						timer={60}
						onClickNext={handleNext}
						kanji={questionPool[index]}
					/>
				</div>
			)}
			{!setup && end && (
				<CorrectionQuizz
					kanjis={questionPool}
					onClickNext={handleEnd}
				/>
			)}
		</div>
	);
};
