<script lang="ts">
	import { onMount } from 'svelte';
	import { isWalletAdapterCompatibleWallet, StandardWalletAdapter } from '@solana/wallet-standard-wallet-adapter-base';
	import { getWallets } from '@wallet-standard/app';
	import { initialize } from '@svelte-on-solana/wallet-adapter-core';
	import type { Adapter } from '@solana/wallet-adapter-base';
	import type { Wallet } from '@wallet-standard/base';
	import type { WalletError } from '@solana/wallet-adapter-base';

	export let localStorageKey: string,
		wallets: Adapter[] = [],
		autoConnect = false,
		onError = (error: WalletError) => console.error(error);

	let nonStandardWallets: Adapter[] = [];
	let standardWallets: StandardWalletAdapter[] = [];

	$: {
		const allWallets = [...standardWallets, ...nonStandardWallets];
		initialize({ wallets: allWallets, autoConnect, localStorageKey, onError });
	}

	$: {
		nonStandardWallets = wallets.filter(
			(wallet) => !standardWallets.some(({ name }) => wallet.name === name)
		);
	}

	function updateStandardWallets(wallets: Wallet[]) {
		standardWallets = wallets
			.filter(isWalletAdapterCompatibleWallet)
			.map((wallet) => new StandardWalletAdapter({ wallet }));
	}

	onMount(() => {
		const { get, on } = getWallets();
		const removeRegisterListener = on('register', () => updateStandardWallets(get()));
		const removeUnregisterListener = on('unregister', () => updateStandardWallets(get()));
		updateStandardWallets(get());

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
