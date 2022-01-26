<script lang="ts">
	import type { Adapter } from '@solana/wallet-adapter-base';
	import { initialize } from '@svelte-on-solana/wallet-adapter-core';
	import type { WalletError } from '@solana/wallet-adapter-base';

	export let localStorageKey: string,
		wallets: Adapter[],
		autoConnect = false,
		onError = (error: WalletError) => console.error(error);

	$: wallets && initialize({ wallets, autoConnect, localStorageKey, onError });
</script>

<svelte:head>
	<script>
		window.global = window;
	</script>
</svelte:head>
