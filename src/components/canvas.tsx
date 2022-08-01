import { useEffect, useRef, useState } from "react";

export const Canvas = (props: any) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isDrawing, setIsDrawing] = useState<boolean>(false);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.width = window.innerWidth + "";
		canvas.style.height = window.innerHeight + "";

		const context: CanvasRenderingContext2D | null =
			canvas.getContext("2d");
		if (!context) return;

		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		setCtx(context);
	}, [canvasRef]);

	const currentpoint = (e: any): { x: number; y: number } => {
		const rect = canvasRef?.current?.getBoundingClientRect();
		if (!rect) return { x: 0, y: 0 };
		return { x: e.clientX - rect.left, y: e.clientY - rect.top };
	};

	const startDrawing = (nativeEvent: any) => {
		const { x, y } = currentpoint(nativeEvent);

		ctx?.beginPath();
		ctx?.moveTo(x, y);
		setIsDrawing(true);
		nativeEvent.preventDefault();
	};

	const draw = (e: PointerEvent) => {
		if (!isDrawing || !ctx) {
			return;
		}
		const { x, y } = currentpoint(e);

		ctx.lineTo(x, y);
		ctx.strokeStyle = "white";
		ctx.lineWidth = e.pressure * 50;
		ctx.stroke();
		e.preventDefault();
	};

	const endDrawing = () => {
		ctx?.closePath();
		setIsDrawing(false);
	};

	return (
		<canvas
			ref={canvasRef}
			onPointerDown={startDrawing}
			onPointerMove={draw}
			onPointerUp={endDrawing}
			{...props}
			style={{ touchAction: "none", display: "block" }}
		></canvas>
	);
};
