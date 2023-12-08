const download = async (
	fileName: string,
	{ data, url, type }: { data?: string; url?: string; type?: string }
) => {
	let blob: Blob;
	if (url) blob = await fetch(url).then((res) => res.blob());
	if (data) blob = new Blob([data], { type: type ?? 'text/plain' });
	if (!blob) throw new Error('No blob found');
	const downUrl = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = downUrl;
	// the filename you want
	a.download = `${fileName}`;
	document.body.appendChild(a);
	a.click();
	URL.revokeObjectURL(downUrl);
};

export default download;
