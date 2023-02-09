import type NavEntry from './NavEntry';

type EVENTS = {
	updateNavigation: NavEntry;
	requestNavigation: never;
	connected: string;
	requestModel: string;
	updateModel: { path: string; module: string };
	modelUpdated: string;
};

export default EVENTS;
