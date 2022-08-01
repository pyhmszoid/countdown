import { useEffect, useState } from "react";

export const useRefElement = <T>(ref: React.RefObject<T>): T | undefined => {
	const [refCurrent, SetRefCurrent] = useState<T>();

	useEffect(() => {
		if (ref !== null && ref !== undefined && ref.current !== null) {
			SetRefCurrent(ref.current);
		}
	}, [ref]);

	return refCurrent;
};
