import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { io } from 'socket.io-client';
import { emit } from '../common/socket';
import { listen } from '../common/socket';
import type NavEntry from '@Src/common/NavEntry';
import serverBuildNav from '../common/serverBuildNav';

const socket = io();

export const load: LayoutLoad = async () => {
	let nav;
	if (!browser) {
		nav = await serverBuildNav('modeling/projects', 'Projects');
	}

	return { nav };
};
