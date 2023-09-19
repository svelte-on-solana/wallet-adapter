<script lang="ts">
	import { onMount } from 'svelte';
	import { isWalletAdapterCompatibleStandardWallet } from '@solana/wallet-adapter-base';
	import { StandardWalletAdapter } from '@solana/wallet-standard-wallet-adapter-base';
	import { getWallets } from '@wallet-standard/app';
	import { initialize } from '@svelte-on-solana/wallet-adapter-core';
	import type { Adapter, WalletError } from '@solana/wallet-adapter-base';

	export let localStorageKey: string,
		wallets: Adapter[] = [],
		autoConnect = false,
		onError = (error: WalletError) => console.error(error);

	$: wallets.length && updateWallets();

	function updateWallets() {
		// get installed wallets compatible with the standard
		const { get } = getWallets();
		const standardWallets = get()
			.filter(isWalletAdapterCompatibleStandardWallet)
			.map((wallet) => new StandardWalletAdapter({ wallet }));

		// filter out non standard wallets
		const nonStandardWallets = wallets.filter(
			(wallet) => !standardWallets.some(({ name }) => wallet.name === name)
		);

		// merge and initialize wallets store
		const allWallets = [...standardWallets, ...nonStandardWallets];
		initialize({ wallets: allWallets, autoConnect, localStorageKey, onError });
	}

	onMount(() => {
		const { on } = getWallets();
		const removeRegisterListener = on('register', updateWallets);
		const removeUnregisterListener = on('unregister', updateWallets);
		return () => {
			removeRegisterListener();
			removeUnregisterListener();
		};
	});
</script>

<svelte:head>
	<script>
		window.global = window;
	</script>
</svelte:head>
