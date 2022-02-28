# `@svelte-on-solana/wallet-adapter-core`

The core of the wallet adapter is a Svelte Store which exposes methods and properties to run the wallet in your application. This allows to share this data among all components in your application.

## Install

```shell
npm install @solana/wallet-adapter-base \
            @solana/wallet-adapter-wallets \
            @solana/web3.js \
            @svelte-on-solana/wallet-adapter-core
```

## Use

Once it is installed, you can use it and subscribe to its methods as an usual Svelte Store:

```html
<script>
    import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
    //...
</script>

{#if $walletStore?.connected}
<div>My wallet is connected</div>
{/if}
```

## UI

To complete the setup you will need to add some UI components which will provide the full experience to connect, disconnect and visualize address. You can choose between the [Svelte Template](https://github.com/sveltejs/template) or the [SvelteKit](https://kit.svelte.dev/) implementation. Both are using the same packages but setup is different. The UI packages offer different implementations for **Solana** and **Anchor**.

-   [Using Svelte Template](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/ui/README.md#svelte-template)
-   [Using SvelteKit](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/ui/README.md#sveltekit)
