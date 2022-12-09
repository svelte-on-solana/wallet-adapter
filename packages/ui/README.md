# `@svelte-on-solana/wallet-adapter-ui`

Pre-built components for integrating with Solana wallets using Svelte

## Getting Started

The UI components need to be installed into a project that is already set up with `@solana/web3.js` and the base wallet adapters. Therefore, it cannot work standalone.

During this process, you will:

-   📦 Install the base wallet adapters
-   📦 Install the svelte adapter and svelte UI
-   🔨 Add the `ConnectionProvider` ([`AnchorConnectionProvider`](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/anchor/README.md) if you're using Anchor)
-   🔨 Add the `WalletProvider` component
-   🔨 Add the `WalletMultiButton` component

## Installing

You have already installed the core package to run the wallet Svelte Store [@svelte-on-solana/wallet-adapter-core](github.com/svelte-on-solana/wallet-adapter/blob/master/packages/core/README.md). Then install the UI components contained in this package

```shell
npm i @svelte-on-solana/wallet-adapter-ui
```

## Set Up

There are three components that you need to get set up:

-   `WalletProvider`
-   `ConnectionProvider` (`[AnchorConnectionProvider](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/anchor/README.md)` if you're using Anchor)
-   `WalletMultiButton`

`WalletProvider` is a component used to initialize the wallet stores and add event listeners

| prop             | type        | default           |
| ---------------- | ----------- | ----------------- |
| localStorageKey? | `string`    | `'walletAdapter'` |
| wallets          | `Wallets[]` |                   |
| autoConnect?     | `boolean`   | `false`           |

`ConnectionProvider` is a component used to establish a connection with the network.

| prop    | type     | default |
| ------- | -------- | ------- |
| network | `string` |         |

Alternatively you can use `AnchorConnectionProvider` for Anchor Dapps.

| prop    | type     | default |
| ------- | -------- | ------- |
| network | `string` |         |
| idl     | `Idl`    |         |

`WalletMultiButton` is a component used as the entry point to connect/disconnect a wallet.

| prop               | type     | default |
| ------------------ | -------- | ------- |
| maxNumberOfWallets | `number` | `3`     |

## SvelteKit

First you need to install some additional packages to make the Torus implementation compatible with SvelteKit.

```shell
npm install -D @esbuild-plugins/node-globals-polyfill @rollup/plugin-inject rollup-plugin-node-polyfills
```

Then you have to adjust the **vite.config.js** file to prepare the project for all the Solana packages previously installed.

```javascript
import { sveltekit } from '@sveltejs/kit/vite'

const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['@solana/web3.js', 'buffer'],
		esbuildOptions: {
				target: 'esnext',
				plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
		},
	},
	resolve: {
		alias: {
			$utils: path.resolve('src/utils/'),
			stream: 'rollup-plugin-node-polyfills/polyfills/stream',
		},
	},
	define: {
		'process.env.BROWSER': true,
		'process.env.NODE_DEBUG': JSON.stringify(''),
	},
	build: {
		target: 'esnext',
		commonjsOptions: {
			transformMixedEsModules: true
		},
		rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] }), nodePolyfills({ crypto: true })],
		},
	}
}

export default config
```

And then in the **\_\_layout.svelte** component you can import the wallets and setup the UI components.

```html
<script lang="ts">
	import { onMount } from 'svelte';
	import { clusterApiUrl } from '@solana/web3.js';
	import {
		workSpace,
		WalletProvider,
		WalletMultiButton,
		ConnectionProvider
	} from '@svelte-on-solana/wallet-adapter-ui';

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
<ConnectionProvider {network} />
<div>
	<slot />
</div>
<WalletMultiButton />
```

## Svelte Template

You have to adjust some stuff in the configuration in your project.

> Enable JSON module resolving in `app/tsconfig.json`

```json
{
	"extends": "@tsconfig/svelte/tsconfig.json",
	"compilerOptions": {
		"resolveJsonModule": true
	},

	"include": ["src/**/*"],
	"exclude": ["node_modules/*", "__sapper__/*", "public/*"]
}
```

> Install a few plugins to take care about JSON imports and built-on Node.js modules not available in the browser.

```shell
npm install -D @rollup/plugin-json rollup-plugin-node-builtins rollup-plugin-node-globals
```

> Adjust `rollup.config.js` to import those plugins

```javascript
// ... other imports
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
	// ... other configs
	plugins: [
		// ... other rollup plugins
		resolve({
			browser: true,
			dedupe: ['svelte'],
			preferBuiltins: false
		}),
		// ... more rollup plugins
		json(),
		globals(),
		builtins()
	]
};
```

> Then in `App.svelte` or the entry point of your SPA, you can setup the wallet and components like this.

```html
<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import {
		workSpace,
		WalletProvider,
		WalletMultiButton,
		ConnectionProvider
	} from '@svelte-on-solana/wallet-adapter-ui';
	import { clusterApiUrl } from '@solana/web3.js';
	import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet'); // localhost or mainnet

	let wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
</script>

<WalletProvider {localStorageKey} {wallets} autoConnect />
<ConnectionProvider {network} />
<WalletMultiButton />

{#if $walletStore?.connected}
<div>My wallet is connected</div>
{/if}
```

## Working with Anchor

If you work with Anchor you will need the `AnchorConnectionProvider` component and its workSpace [@svelte-on-solana/wallet-adapter-anchor](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/anchor/README.md)

## Example Implementation

See example implementations of the `@svelte-on-solana/wallet-adapter-ui` library.

-   [Demo site][1]

[1]: https://github.com/silvestrevivo/solana-svelte-counter/tree/master/app
