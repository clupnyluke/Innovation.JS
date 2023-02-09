<script lang="ts">
	import { Panel, Header, Content } from '@smui-extra/accordion';
	import List, { Item, Separator, Text } from '@smui/list';
	import Ripple from '@smui/ripple';
	import type NavEntry from '@Src/common/NavEntry';

	export let entry: NavEntry;
	export let path = '';
	export let base = ''
	let open = false;
	const { name, files, folders } = entry;
	const hrefTo = (href: string) => {
		window.location.href = `/${base}${path}/${href}`;
	};
</script>

<Panel
	nonInteractive
	bind:open
	on:mouseenter={() => {
		open = true;
	}}
	on:mouseleave={() => {
		open = false;
	}}
>
	<Header>{name}</Header>
	{#if folders.length || files.length}
		{#each folders as folder}
			<svelte:self entry={folder} path={`${path}/${folder.name}`} base={base} />
		{/each}
		<Separator class="header-seperator" />
		<Content class="design-list">
			<List>
				{#each files as file}
					<Item ripple={true} on:click={() => hrefTo(`${file}`)}><Text>{file}</Text></Item>
					<Separator class="list-seperator" />
				{/each}</List
			>
		</Content>
	{/if}
</Panel>

<style lang="scss">
	@use '@material/theme/color-palette';

	:global(.smui-accordion__panel.smui-accordion__panel--open > .design-list.smui-paper__content) {
		padding-top: 0;
		padding-bottom: 0;
	}
	:global(.design-list) {
		.mdc-deprecated-list {
			padding-top: 0;
			padding-bottom: 0;
		}
		padding-left: 16px;
		.header-seperator {
			border-bottom-color: #ff3e00;
		}
		.list-seperator {
			border-bottom-color: color-palette.$grey-200;
		}
	}
</style>
