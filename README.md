# `@svelte-on-solana/wallet-adapter`

![Wallets](wallets-adapter.png)

Modular TypeScript wallet adapter and UI components for Solana/Anchor applications using [SvelteJS](https://svelte.dev/) as framework. This package contains a solution for [Svelte Template](https://github.com/sveltejs/template) and [SvelteKit](https://kit.svelte.dev/), making possible to build Solana Dapps in SPA or SSR mode.

[View demo][4] / [Browse demo code][5]

## Packages

- [Core][1] - Svelte Store which exposes methods and properties to run the wallet in your application
- [UI][2] - Pre-built components for integrating with Solana wallets using Svelte
- [Anchor][3] - Helper components for working with Anchor

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

[1]: https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/core/README.md/
[2]: https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/ui/README.md
[3]: https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/ui/README.md
[4]: https://github.com/silvestrevivo/solana-svelte-counter/
[5]: https://solana-svelte-counter.netlify.app/
