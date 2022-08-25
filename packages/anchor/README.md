# `@svelte-on-solana/wallet-adapter-anchor`

`AnchorConnectionProvider` component and `workSpace` for Solana wallets using Svelte

## Installing

You have already installed the core package to run the wallet Svelte Store [@svelte-on-solana/wallet-adapter-core](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/core/README.md) and the UI components to use the wallet [@svelte-on-solana/wallet-adapter-ui](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/ui/README.md/). Then install the `AnchorConnectionProvider` component and `workSpace` file contained in this package.

```shell
npm i @svelte-on-solana/wallet-adapter-anchor
```

## Set Up

Add `@project-serum/anchor` to `optimizeDeps` inside `vite.config.js`. This pre-bundles the `@project-serum/anchor` package. This steps converts CommonJS dependencies into ESM ( Vite's dev server serves all code as native ESM ).

```javascript
import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	// ... use the same implementation from the SvelteKit ui
	optimizeDeps: {
		include: ['@project-serum/anchor', '@solana/web3.js', 'buffer'],
		// ... use the same implementation from the SvelteKit ui
	}
	// ... use the same implementation from the SvelteKit ui
}

export default config
```

The `AnchorConnectionProvider` for Anchor Dapps accepts the next props.

| prop    | type     | default |
| ------- | -------- | ------- |
| network | `string` |         |
| idl     | `Idl`    |         |

It is automatically connected to the `workSpace` defining all the parameters to share among the components in your Anchor Dapp **(baseAccount, connection, provider, program, systemProgram and network)**.

## SvelteKit

In the **\_\_layout.svelte** component you can import the wallets and setup the UI components.

```html
<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { WalletProvider, WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
	import { AnchorConnectionProvider, workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { clusterApiUrl } from '@solana/web3.js';
	import idl from '../../../target/idl/<my-anchor-project>.json';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet'); // localhost or mainnet

	let wallets;

	onMount(async () => {
		const {
		PhantomWalletAdapter,
		SlopeWalletAdapter,
		SolflareWalletAdapter,
		SolletExtensionWalletAdapter,
		TorusWalletAdapter,
		} = await import('@solana/wallet-adapter-wallets');

		const walletsMap = [
			new PhantomWalletAdapter(),
			new SlopeWalletAdapter(),
			new SolflareWalletAdapter(),
			new SolletExtensionWalletAdapter(),
			new TorusWalletAdapter(),
		];

		wallets = walletsMap;
	});
</script>

<WalletProvider {localStorageKey} {wallets} autoConnect />
<AnchorConnectionProvider {network} {idl} />
<div>
	<slot />
</div>
<WalletMultiButton />
```

## Svelte Template

In `App.svelte` or the entry point of your SPA, you can setup the wallet and components like this.

```html
<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { WalletProvider, WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
	import { AnchorConnectionProvider, workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { clusterApiUrl } from '@solana/web3.js';
	import idl from '../../../target/idl/<my-anchor-project>.json';
	import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet'); // localhost or mainnet

	let wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
</script>

<WalletProvider {localStorageKey} {wallets} autoConnect />
<AnchorConnectionProvider {network} {idl} />
<WalletMultiButton />

{#if $walletStore?.connected}
<div>My wallet is connected</div>
{/if}
```

## Example Implementation

See example implementations of the `@svelte-on-solana/wallet-adapter-ui` library.

-   [Demo site][1]

[1]: https://github.com/silvestrevivo/solana-svelte-counter/tree/master/app
