# `@svelte-on-solana/wallet-adapter`

Modular TypeScript wallet adapter and UI components for Solana/Anchor applications using [SvelteJS](https://svelte.dev/) as framework. This package contains a solution for [Svelte Template](https://github.com/sveltejs/template) and [SvelteKit](https://kit.svelte.dev/), making possible to build Solana Dapps in SPA or SSR mode.

![Wallets](wallets-adapter.png)

- [Demo Repo](https://github.com/silvestrevivo/solana-svelte-counter/)
- [Demo Site](https://solana-svelte-counter.netlify.app/)

## How to setup

To use the wallet adapter first of all you will need to install the core package. Then choose on the two different UI implementations, Svelte Template or SvelteKit.

- [Installing the core package](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/core/README.md/)
- [Using Svelte Template](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/ui/README.md)
- [Using SvelteKit](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/ui/README.md)
<!-- - [TypeScript Docs](https://solana-labs.github.io/wallet-adapter/)
- [FAQ (Frequently Asked Questions)](https://github.com/solana-labs/wallet-adapter/blob/master/FAQ.md)
    + [How can I get support?](https://github.com/solana-labs/wallet-adapter/blob/master/FAQ.md#how-can-i-get-support)
    + [Can I use this with ___?](https://github.com/solana-labs/wallet-adapter/blob/master/FAQ.md#can-i-use-this-with-___)
    + [What does this error mean?](https://github.com/solana-labs/wallet-adapter/blob/master/FAQ.md#what-does-this-error-mean)
    + [How can I sign and verify messages?](https://github.com/solana-labs/wallet-adapter/blob/master/FAQ.md#how-can-i-sign-and-verify-messages)
- [Quick Setup (using React UI)](#quick-setup-using-react-ui)
    + [Install](#install)
    + [Setup](#setup)
    + [Usage](#usage)
- [Packages](#packages)
    + [Core](#core)
    + [UI Components](#ui-components)
    + [Starter Projects](#starter-projects)
    + [Wallets](#wallets)
- [Build from Source](#build-from-source) -->

<!-- ## Quick Setup (using React UI)

There are also [material-ui](https://github.com/solana-labs/wallet-adapter/tree/master/packages/ui/material-ui) and [ant-design](https://github.com/solana-labs/wallet-adapter/tree/master/packages/ui/ant-design) packages if you use those component frameworks.

### Install

Install these dependencies:

```shell
yarn add @solana/wallet-adapter-base \
         @solana/wallet-adapter-react \
         @solana/wallet-adapter-react-ui \
         @solana/wallet-adapter-wallets \
         @solana/web3.js \
         react
```

### Setup

```tsx
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const Wallet: FC = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    { /* Your app's components go here, nested within the context providers. */ }
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
```

### Usage

```tsx
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback } from 'react';

export const SendOneLamportToRandomAddress: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: Keypair.generate().publicKey,
                lamports: 1,
            })
        );

        const signature = await sendTransaction(transaction, connection);

        await connection.confirmTransaction(signature, 'processed');
    }, [publicKey, sendTransaction, connection]);

    return (
        <button onClick={onClick} disabled={!publicKey}>
            Send 1 lamport to a random address!
        </button>
    );
};
```

## Packages
This library is organized into small packages with few dependencies.
To add it to your dApp, you'll need core packages, some wallets, and UI components for your chosen framework. -->


<!-- ## Wallets
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

\* Package has not been published to NPM yet. -->

## Build from Source

1. Clone the project:
```shell
git clone https://github.com/svelte-on-solana/wallet-adapter.git
```

2. Install dependencies:
```shell
cd wallet-adapter
yarn install
```

3. Build all packages:
```shell
yarn build
```

4. Run locally:
```shell
cd packages/ui/
yarn start
```
