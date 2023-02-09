type AnimationFn = (time: number, delta: number) => void;

const useAnimationStore = () => {
	let animationFns: AnimationFn[] = [];
	let animationFrame: number;
	const init = performance.now();
	let last = performance.now();

	const animate = () => {
		const now = performance.now();
		const time = now - init;
		const delta = now - last;
		animationFns.forEach((fn) => fn(time, delta));
		last = now;
		animationFrame = requestAnimationFrame(animate);
	};
	const animationLibrary: Map<number, AnimationFn> = new Map();
	let id = 0;

	const remove = (funcID: number) => {
		animationLibrary.delete(funcID);
		animationFns = [...animationLibrary.values()];
		if (!animationLibrary.size) {
			cancelAnimationFrame(animationFrame);
		}
	};

	const subscribe = () => {
		const ownedFns = new Set<number>();
		const push = (fn: AnimationFn) => {
			if (animationLibrary.size === 0) {
				animationFrame = requestAnimationFrame(animate);
			}
			const funcID = id++;
			animationLibrary.set(funcID, fn);
			animationFns = [...animationLibrary.values()];
			ownedFns.add(funcID);
			return () => {
				remove(funcID);
				ownedFns.delete(funcID);
			};
		};

		const unsubscribe = () => {
			ownedFns.forEach((funcID) => remove(funcID));
			ownedFns.clear();
		};

		return { push, unsubscribe };
	};

	return {
		subscribe
	};
};

export default useAnimationStore();
