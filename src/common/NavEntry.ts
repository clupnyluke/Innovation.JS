type NavEntry = {
	name: string;
	type: string;
	files: string[];
	folders: NavEntry[];
};

export default NavEntry;
