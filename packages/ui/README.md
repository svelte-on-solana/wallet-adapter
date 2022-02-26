# `@svelte-on-solana/wallet-adapter-ui`

Pre-built components for integrating with Solana wallets using Svelte

## Getting Started

The UI components need to be installed into a project that is already set up with `@solana/web3.js` and the base wallet adapters. Therefore, it cannot work standalone.

During this process, you will:

-   📦 Install the base wallet adapters
-   📦 Install the svelte adapter and svelte UI
-   🔨 Add the `ConnectionProvider` (`AnchorConnectionProvider` if you're using Anchor)
-   🔨 Add the `WalletProvider` component
-   🔨 Add the `WalletMultiButton` component

## Installing

You have already installed the core package to run the wallet Svelte Store [@svelte-on-solana/wallet-adapter-core](github.com/svelte-on-solana/wallet-adapter/blob/master/packages/core/README.md). Then install the UI components contained in this package

```shell
npm i @svelte-on-solana/wallet-adapter-svelte-ui
```

## Set Up

There are three components that you need to get set up:

-   `WalletProvider`
-   `ConnectionProvider` (`AnchorConnectionProvider` if you're using Anchor)
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


## SvelteKit

You have to adjust the **svelte.config.js** file to prepare the project for all the Solana packages previously installed.

```javascript
const config = {
	preprocess: preprocess(),

	kit: {
		// ...
		define: {
        'process.env.BROWSER': true
      }
	}
};
```

And then in the **__layout.svelte** component you can import the wallets and setup the UI components.

```html
<script lang="ts">
  import { onMount } from 'svelte';
  import { clusterApiUrl } from '@solana/web3.js';
  import idl from '../../../target/idl/<my-anchor-project>.json'; // in case you are using Anchor
  import {
	  WalletProvider,
	  WalletMultiButton,
	  AnchorConnectionProvider } from '@svelte-on-solana/wallet-adapter-svelte-ui';

  const localStorageKey = 'walletAdapter';
  const network = clusterApiUrl('devnet'); // localhost or mainnet

  let wallets;

  onMount(async () => {
    const {
      PhantomWalletAdapter,
      SolflareWalletAdapter,
    } = await import('@solana/wallet-adapter-wallets');

    wallets = [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ];
  });
</script>

<WalletProvider {localStorageKey} {wallets} autoConnect />
<ConnectionProvider {network}/> or <AnchorConnectionProvider {network} {idl} />
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
import json from "@rollup/plugin-json";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";

export default {
  // ... other configs
  plugins: [
    // ... other rollup plugins
    resolve({
      browser: true,
      dedupe: ["svelte"],
      preferBuiltins: false, // set this to false
    }),
    // ... more rollup plugins
    json(),
    globals(),
    builtins(),
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
	  AnchorConnectionProvider } from "@svelte-on-solana/wallet-adapter-ui";
  import { clusterApiUrl } from "@solana/web3.js";
  import idl from '../../../target/idl/<my-anchor-project>.json'; // in case you are using Anchor
  import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";

  const localStorageKey = "walletAdapter";
  const network = clusterApiUrl('devnet'); // localhost or mainnet

  let wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
</script>

<WalletProvider {localStorageKey} {wallets} autoConnect />
<ConnectionProvider {network}/> or <AnchorConnectionProvider {network} {idl} />
<WalletMultiButton />

{#if $walletStore?.connected}
  <div>My wallet is connected</div>
{/if}
```

## Example Implementation

See example implementations of the `@svelte-on-solana/wallet-adapter-ui` library.

- [Demo site][1]

[1]: https://github.com/silvestrevivo/solana-svelte-counter/tree/master/app
