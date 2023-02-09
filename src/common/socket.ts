import type EVENTS from './eventEnums';
import type { Socket as ServerSocket } from 'socket.io';
import type { Socket } from 'socket.io-client';

export const emit = <T extends keyof EVENTS>(
	io: ServerSocket | Socket,
	event: T,
	payload?: EVENTS[T] extends never ? undefined : EVENTS[T]
) => {
	io.emit(event, payload);
};

export const listen = <T extends keyof EVENTS>(
	io: ServerSocket | Socket,
	event: T,
	callback: (payload: EVENTS[T]) => void
) => {
	io.on<string>(event, (pl) => callback(pl));
};
