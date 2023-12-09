const bufferToURL = (buffer: ArrayBufferLike, type) =>
	URL.createObjectURL(new Blob([buffer], { type }));

export default bufferToURL;
