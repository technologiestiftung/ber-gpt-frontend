import React, { useEffect, useRef } from "react";
import { useSplashStore } from "../store/splash-store";
import { BaerIcon } from "./icons/bear-icon";

export const SplashScreen: React.FC = () => {
	const { hideSplashScreen } = useSplashStore();

	const splashContainer = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickListener);

		return () => {
			document.removeEventListener("mousedown", handleClickListener);
		};
	}, []);

	const handleClickListener = (event: MouseEvent) => {
		const clickedInside =
			splashContainer &&
			splashContainer.current?.contains(event.target as Node);

		if (clickedInside) {
			return;
		}

		hideSplashScreen();
	};

	return (
		<div
			ref={splashContainer}
			className={`pointer-events-auto absolute left-1/4 top-1/4 h-1/2 w-1/2 rounded bg-white shadow-lg`}
		>
			<div className="relative flex flex-col gap-4 p-6">
				<div className="flex min-h-[63px] w-[63px] items-center justify-center rounded-full bg-white drop-shadow-lg">
					<BaerIcon className="h-[40px] w-[40px]" />
				</div>
				<div className="flex w-fit flex-row items-center gap-3">
					<h1 className="text-[22px] font-bold">BärGPT</h1>
					<h2 className="text-[22px]">KI Testumgebung</h2>
				</div>
				<button
					className="absolute right-4 top-4 pb-2 lg:hidden"
					onClick={hideSplashScreen}
				>
					x
				</button>
			</div>
		</div>
	);
};
