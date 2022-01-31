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

- [Using Svelte Template](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/ui/README.md)
- [Using SvelteKit](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/ui/README.md)

## Wallets
These packages provide adapters for each wallet.
You can use the [wallets](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/wallets) package, or add the individual wallet packages you want.

| package                                                                                                      | description                                            | npm                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| [wallets](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/wallets)                | Includes all the wallets (with tree shaking)           | [`@solana/wallet-adapter-wallets`](https://npmjs.com/package/@solana/wallet-adapter-wallets)             |
| [bitkeep](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/bitkeep)                | Adapter for [BitKeep](https://bitkeep.com)             | [`@solana/wallet-adapter-bitkeep`](https://npmjs.com/package/@solana/wallet-adapter-bitkeep)             |
| [bitpie](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/bitpie)                  | Adapter for [Bitpie](https://bitpie.com)               | [`@solana/wallet-adapter-bitpie`](https://npmjs.com/package/@solana/wallet-adapter-bitpie)               |
| [blocto](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/blocto)                  | Adapter for [Blocto](https://blocto.app)               | [`@solana/wallet-adapter-blocto`](https://npmjs.com/package/@solana/wallet-adapter-blocto)               |
| [clover](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/clover)                  | Adapter for [Clover](https://clover.finance)           | [`@solana/wallet-adapter-clover`](https://npmjs.com/package/@solana/wallet-adapter-clover)               |
| [coin98](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/coin98)                  | Adapter for [Coin98](https://coin98.com)               | [`@solana/wallet-adapter-coin98`](https://npmjs.com/package/@solana/wallet-adapter-coin98)               |
| [coinhub](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/coinhub)                | Adapter for [Coinhub](https://coinhub.org)             | [`@solana/wallet-adapter-coinhub`](https://npmjs.com/package/@solana/wallet-adapter-coinhub)             |
| [ledger](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/ledger)                  | Adapter for [Ledger](https://ledger.com)               | [`@solana/wallet-adapter-ledger`](https://npmjs.com/package/@solana/wallet-adapter-ledger)               |
| [mathwallet](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/mathwallet)          | Adapter for [MathWallet](https://mathwallet.org)       | [`@solana/wallet-adapter-mathwallet`](https://npmjs.com/package/@solana/wallet-adapter-mathwallet)       |
| [phantom](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/phantom)                | Adapter for [Phantom](https://phantom.app)             | [`@solana/wallet-adapter-phantom`](https://npmjs.com/package/@solana/wallet-adapter-phantom)             |
| [safepal](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/safepal)                | Adapter for [SafePal](https://safepal.io)              | [`@solana/wallet-adapter-safepal`](https://npmjs.com/package/@solana/wallet-adapter-safepal)             |
| [slope](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/slope)                    | Adapter for [Slope](https://slope.finance)             | [`@solana/wallet-adapter-slope`](https://npmjs.com/package/@solana/wallet-adapter-slope)                 |
| [solflare](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/solflare)              | Adapter for [Solflare](https://solflare.com)           | [`@solana/wallet-adapter-solflare`](https://npmjs.com/package/@solana/wallet-adapter-solflare)           |
| [sollet](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/sollet)                  | Adapter for [Sollet](https://www.sollet.io)            | [`@solana/wallet-adapter-sollet`](https://npmjs.com/package/@solana/wallet-adapter-sollet)               |
| [solong](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/solong)                  | Adapter for [Solong](https://solongwallet.com)         | [`@solana/wallet-adapter-solong`](https://npmjs.com/package/@solana/wallet-adapter-solong)               |
| [tokenpocket](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/tokenpocket)        | Adapter for [TokenPocket](https://tokenpocket.pro)     | [`@solana/wallet-adapter-tokenpocket`](https://npmjs.com/package/@solana/wallet-adapter-tokenpocket)     |
| [torus](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/torus)                    | Adapter for [Torus](https://tor.us)                    | [`@solana/wallet-adapter-torus`](https://npmjs.com/package/@solana/wallet-adapter-torus)                 |
| [walletconnect](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets/walletconnect) \* | Adapter for [WalletConnect](https://walletconnect.org) | [`@solana/wallet-adapter-walletconnect`](https://npmjs.com/package/@solana/wallet-adapter-walletconnect) |

\* Package has not been published to NPM yet.
