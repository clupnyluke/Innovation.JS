<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Drawer, { Content, Header } from '@smui/drawer';
	import Accordion, { Panel } from '@smui-extra/accordion';
	import IconButton from '@smui/icon-button';
	import type { LayoutData, LayoutServerData } from './$types';
	import ProjectPanel from '@Components/Layout/Nav/ProjectPanel.svelte';
	import { onMount } from 'svelte';
	import { opencascade } from '@Stores';
	import { emit, listen } from '../common/socket';
	import { io } from 'socket.io-client';
	import { writable } from 'svelte/store';
	import type NavEntry from '@Src/common/NavEntry';
	import { browser } from '$app/environment';

	const socket = io();

	const nav = writable<undefined | NavEntry>(undefined);

	export let data: LayoutData;
	if (data.nav) $nav = data.nav;
	onMount(() => {
		opencascade.load();
		emit(socket, 'requestNavigation');
	});
	listen(socket, 'updateNavigation', (_nav) => {
		$nav = _nav;
	});

	let isNavMenuOpen = false;
</script>

<main class="layout">
	<nav>
		<TopAppBar variant="short">
			<Section>
				<IconButton
					class={`material-icons menu-icon${isNavMenuOpen ? '--disabled' : ''}`}
					aria-label="Navigation"
					on:click={() => {
						isNavMenuOpen = true;
					}}>menu</IconButton
				>
				<div
					class="drawer-container"
					on:mouseleave={() => {
						isNavMenuOpen = false;
					}}
				>
					<Drawer variant="dismissible" bind:open={isNavMenuOpen}>
						<Header>
							<Title class="drawer-title">Projects</Title>
							<Content>
								<Accordion multiple={true}>
									{#if $nav}
										<ProjectPanel entry={$nav} path='' base='project' />
									{/if}
								</Accordion>
							</Content>
						</Header>
					</Drawer>
				</div>
				<Title>Turbo JSCAD</Title>
			</Section>
		</TopAppBar>
	</nav>
	<slot />
</main>

<style lang="scss">
	:global(body) {
		margin: 0;
	}
	.layout {
		:global(.drawer-title) {
			height: 48px;
			display: flex;
			align-items: center;
		}
		:global(.menu-icon--disabled) {
			display: none;
		}

		:global(.drawer-container) {
			margin: -4px 0 0 -4px;
			position: relative;
			height: 48px;
			overflow: visible;
			width: max-content;

			:global(.mdc-drawer) {
				height: 100vh;
				position: relative;
			}
		}
	}
</style>
