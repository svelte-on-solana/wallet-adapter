# `@svelte-on-solana/wallet-adapter`

Modular TypeScript wallet adapter and UI components for Solana/Anchor applications using [SvelteJS](https://svelte.dev/) as framework. This package contains a solution for [Svelte Template](https://github.com/sveltejs/template) and [SvelteKit](https://kit.svelte.dev/), making possible to build Solana Dapps in SPA or SSR mode.

![Wallets](wallets-adapter.png)

- [Demo repo](https://github.com/silvestrevivo/solana-svelte-counter/)
- [Demo site](https://solana-svelte-counter.netlify.app/)

## How to setup

To use the wallet adapter first of all you will need to install the core package. Then choose on the two different UI implementations, Svelte Template or SvelteKit.

- [Installing the core package](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/core/README.md/)
- [Using Svelte Template](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/ui/README.md)
- [Using SvelteKit](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/ui/README.md)

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
