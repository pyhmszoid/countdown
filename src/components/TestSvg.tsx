import React, { useEffect, useRef, useState } from "react";
import { useRefElement } from "./useRefElement";

const styleew: React.CSSProperties = {
	position: "relative",
	left: "100px",
	top: "100px",
};
interface viewbox {
	x: number;
	y: number;
	width: number;
	height: number;
}

interface Point {
	x: number;
	y: number;
}

const TestSvg = () => {
	//const test = useRef<LegacyRef<SVGRectElement> | undefined>();
	const test = useRef<SVGRectElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);

	const rectCurrent = useRefElement<SVGRectElement>(test);
	const svgCurrent = useRefElement<SVGSVGElement>(svgRef);

	let isClick = false;

	const viewBox: viewbox = { x: 0, y: 0, width: 500, height: 500 };
	const scale: number = 10;

	let pos: Point = { x: 0, y: 0 };

	const setMousePosition = (event: any): void => {
		var rect = getRef<SVGSVGElement>(svgCurrent).getBoundingClientRect();
		const posRect = { x: rect.x, y: rect.y };
		pos = {
			x: event.clientX - posRect.x,
			y: event.clientY - posRect.y,
		};
	};

	const getRef = <T extends any>(element: any): T => {
		if (element === undefined) throw Error;
		return element;
	};

	const setViewBox = (): void => {
		const svg: SVGSVGElement = getRef(svgCurrent);
		viewBox.x = svg.viewBox.baseVal.x;
		viewBox.y = svg.viewBox.baseVal.y;
		viewBox.width = svg.viewBox.baseVal.width;
		viewBox.height = svg.viewBox.baseVal.height;
	};

	const MoveRect = () => {
		const svg: SVGSVGElement = getRef(svgCurrent);
		const rect: SVGRectElement = getRef(rectCurrent);
		setViewBox();

		const width: number = svg.width.baseVal.value / viewBox.width;
		const height: number = svg.height.baseVal.value / viewBox.height;

		rect.x.baseVal.value = (pos.x + viewBox.x) / width;
		rect.y.baseVal.value = (pos.y + viewBox.y) / height;
	};

	const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
		if (!isClick) {
			return;
		}
		setMousePosition(event);
		MoveRect();
	};

	const handleMouseMoveRect = (event: React.MouseEvent<SVGRectElement>) => {
		if (!isClick) {
			return;
		}
		setMousePosition(event);
		MoveRect();
	};

	const handleMouseDown = () => {
		isClick = true;
	};
	const handleMouseUp = () => {
		isClick = false;
	};
	const handleScroll = (event: React.WheelEvent<SVGSVGElement>) => {
		event.preventDefault();

		const svg: SVGSVGElement = getRef(svgCurrent);
		setMousePosition(event);

		let normalized: number = 0;
		var delta = event.deltaY;
		if (delta > 0) {
			normalized = 1;
		} else if (delta < 0) {
			normalized = -1;
		}

		console.log(svg.currentScale);
		//viewBox.width += normalized * scale;
		////viewBox.height += normalized * scale;
		svg.viewBox.baseVal.width += normalized * scale;
		svg.viewBox.baseVal.height += normalized * scale;

		if (svg.viewBox.baseVal.width < 1) {
			svg.viewBox.baseVal.width = 1;
		}
		if (svg.viewBox.baseVal.height < 1) {
			svg.viewBox.baseVal.height = 1;
		}

		//svg.setAttribute("viewBox", getViewBox());
		/*
		var scaleDelta =
			normalized > 0 ? 1 / zoom.scaleFactor : zoom.scaleFactor;

		point.x = event.clientX;
		point.y = event.clientY;

		var startPoint = point.matrixTransform(svg.getScreenCTM().inverse());

		var fromVars = {
			ease: zoom.ease,
			x: viewBox.x,
			y: viewBox.y,
			width: viewBox.width,
			height: viewBox.height,
		};

		viewBox.x -= (startPoint.x - viewBox.x) * (scaleDelta - 1);
		viewBox.y -= (startPoint.y - viewBox.y) * (scaleDelta - 1);
		viewBox.width *= scaleDelta;
		viewBox.height *= scaleDelta;*/
	};

	console.log("redraw");
	return (
		<div
			style={{
				backgroundColor: "blue",
				width: "1000px",
				height: "100vh",
			}}
		>
			<svg
				ref={svgRef}
				onWheel={handleScroll}
				width={500}
				height={500}
				viewBox={"0 0 " + 500 + " " + 500}
				style={{
					backgroundColor: "green",
					...styleew,
				}}
			>
				<rect
					ref={test}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onMouseMove={handleMouseMoveRect}
					width={10}
					height={10}
					fill="pink"
				></rect>
			</svg>
		</div>
	);
};
export default TestSvg;
function UIEventHandler() {
	throw new Error("Function not implemented.");
}
