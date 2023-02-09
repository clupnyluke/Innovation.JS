import type NavEntry from './NavEntry';
import fs from 'fs/promises';

const serverBuildNav = async (path: string, name: string) => {
	const out: NavEntry = {
		name,
		type: 'dir',
		files: [],
		folders: []
	};
	const entries = await fs.readdir(path, { withFileTypes: true });
	for (const entry of entries) {
		const { name } = entry;
		if (entry.isFile()) {
			if (!(name.substring(name.length - 3) === '.ts')) continue;
			if (name.substring(name.length - 5) === '.d.ts') continue;
			out.files.push(name.substring(0, name.length - 3));
		}
		if (entry.isDirectory()) {
			out.folders.push(await serverBuildNav(`${path}/${name}`, name));
		}
	}
	return out;
};

export default serverBuildNav;
