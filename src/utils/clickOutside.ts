import type { Action } from 'svelte/action';

const clickOutside: Action = (node) => {
	const handleClick = (e: MouseEvent) => {
		if (node && !node.contains(e.target as Node)) {
			node.dispatchEvent(new CustomEvent('clickOutside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};

export default clickOutside;
