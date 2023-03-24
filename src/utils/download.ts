const download = async (fileName: string, { data, url }: { data?: string; url?: string }) => {
	let blob: Blob;
	if (url) blob = await fetch(url).then((res) => res.blob());
	if (data) blob = new Blob([data], { type: 'model/gltf-binary ' });
	if (!blob) throw new Error('No blob found');
	const downUrl = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = downUrl;
	// the filename you want
	a.download = `${fileName}.glb`;
	document.body.appendChild(a);
	a.click();
	URL.revokeObjectURL(downUrl);
};

export default download;
