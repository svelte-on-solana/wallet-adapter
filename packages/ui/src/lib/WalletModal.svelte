<script lang="ts">
    import { fade, slide } from 'svelte/transition';
    import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
    import { createEventDispatcher } from 'svelte';
    import WalletButton from './WalletButton.svelte';
    import type { WalletName } from '@solana/wallet-adapter-base';

    export let maxNumberOfWallets;

    let showMoreOptions = false,
        showExtensionsAvailables = false,
        backdrop: HTMLDivElement,
        container: HTMLDivElement;

    $: numberOfWalletsShown = showMoreOptions
        ? $walletStore.wallets.length
        : maxNumberOfWallets;

    $: walletsAvailable = $walletStore.wallets.filter(
        wallet => wallet.readyState === 'Installed',
    ).length;

    const dispatch = createEventDispatcher();

    function connect(name) {
        dispatch('connect', name);
    }

    function toggleMoreOptions() {
        showMoreOptions = !showMoreOptions;
    }

    function toggleExtensionsAvailables() {
        showExtensionsAvailables = !showExtensionsAvailables;
    }

    function closeModal(e) {
        if (e.target === backdrop || e.target === container) {
            dispatch('close');
        }
    }

    function handleKeyup(e) {
        if (e.key == 'Escape') {
            dispatch('close');
        }
    }
    function getStarted() {
        const torusWallet = $walletStore.wallets.find(
            (wallet: { adapter: { name: WalletName } }) =>
                wallet.adapter.name === 'Torus',
            );
        if (torusWallet) {
            connect(torusWallet.adapter.name);
        } else {
            dispatch('close');
        }
    }
</script>

<svelte:window on:keyup={handleKeyup} />

<div
    aria-labelledby="wallet-adapter-modal-title"
    aria-modal="true"
    class="wallet-adapter-modal"
    role="dialog"
    transition:fade
    bind:this={backdrop}
    on:click={e => closeModal(e)}
>
    <div class="wallet-adapter-modal-container" bind:this={container}>
        <div class="wallet-adapter-modal-wrapper">
            <h1 class="wallet-adapter-modal-title">
                {walletsAvailable
                    ? 'Connect a wallet on Solana to continue'
                    : `You'll need a wallet on Solana to continue`}
            </h1>

            <button
                on:click={() => dispatch('close')}
                class="wallet-adapter-modal-button-close"
            >
                <svg width="14" height="14">
                    <path
                        d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"
                    />
                </svg>
            </button>

            {#if walletsAvailable}
                <ul class="wallet-adapter-modal-list">
                    {#each $walletStore.wallets.slice(0, numberOfWalletsShown) as { adapter: { name, icon, url }, readyState }}
                        <li>
                            <WalletButton
                                on:click={() => connect(name)}
                            >
                                {name}

                                <svelte:fragment slot="start-icon">
                                    <img src={icon} alt={`${name} icon`} />
                                </svelte:fragment>

                                <svelte:fragment slot="status">
                                    {readyState === 'Installed'
                                        ? 'Detected'
                                        : ''}
                                </svelte:fragment>
                            </WalletButton>
                        </li>
                    {/each}
                </ul>

                {#if $walletStore.wallets.length > maxNumberOfWallets}
                    <button
                        class="wallet-adapter-modal-list-more"
                        style="justify-content: space-between;"
                        class:wallet-adapter-modal-collapse-button-active={showMoreOptions}
                        on:click={() => toggleMoreOptions()}
                    >
                        <span>
                            {showMoreOptions ? 'Less' : 'More'} options
                        </span>

                        <svg
                            width="13"
                            height="7"
                            viewBox="0 0 13 7"
                            xmlns="http://www.w3.org/2000/svg"
                            class:wallet-adapter-modal-list-more-icon-rotate={showMoreOptions}
                            ><path
                                d="M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z"
                            /></svg
                        >
                    </button>
                {/if}
            {:else}
                <div class="wallet-adapter-modal-middle">
                    <svg
                        width="97"
                        height="96"
                        viewBox="0 0 97 96"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="48.5"
                            cy="48"
                            r="48"
                            fill="url(#paint0_linear_880_5115)"
                            fill-opacity="0.1"
                        />
                        <circle
                            cx="48.5"
                            cy="48"
                            r="47"
                            stroke="url(#paint1_linear_880_5115)"
                            stroke-opacity="0.4"
                            stroke-width="2"
                        />
                        <g clip-path="url(#clip0_880_5115)">
                            <path
                                d="M65.5769 28.1523H31.4231C27.6057 28.1523 24.5 31.258 24.5 35.0754V60.9215C24.5 64.7389 27.6057 67.8446 31.4231 67.8446H65.5769C69.3943 67.8446 72.5 64.7389 72.5 60.9215V35.0754C72.5 31.258 69.3943 28.1523 65.5769 28.1523ZM69.7308 52.1523H59.5769C57.2865 52.1523 55.4231 50.289 55.4231 47.9985C55.4231 45.708 57.2864 43.8446 59.5769 43.8446H69.7308V52.1523ZM69.7308 41.0754H59.5769C55.7595 41.0754 52.6539 44.1811 52.6539 47.9985C52.6539 51.8159 55.7595 54.9215 59.5769 54.9215H69.7308V60.9215C69.7308 63.2119 67.8674 65.0754 65.5769 65.0754H31.4231C29.1327 65.0754 27.2692 63.212 27.2692 60.9215V35.0754C27.2692 32.785 29.1326 30.9215 31.4231 30.9215H65.5769C67.8673 30.9215 69.7308 32.7849 69.7308 35.0754V41.0754Z"
                                fill="url(#paint2_linear_880_5115)"
                            />
                            <path
                                d="M61.4231 46.6172H59.577C58.8123 46.6172 58.1924 47.2371 58.1924 48.0018C58.1924 48.7665 58.8123 49.3863 59.577 49.3863H61.4231C62.1878 49.3863 62.8077 48.7664 62.8077 48.0018C62.8077 47.2371 62.1878 46.6172 61.4231 46.6172Z"
                                fill="url(#paint3_linear_880_5115)"
                            />
                        </g>
                        <defs>
                            <linearGradient
                                id="paint0_linear_880_5115"
                                x1="3.41664"
                                y1="98.0933"
                                x2="103.05"
                                y2="8.42498"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="#9945FF" />
                                <stop offset="0.14" stop-color="#8A53F4" />
                                <stop offset="0.42" stop-color="#6377D6" />
                                <stop offset="0.79" stop-color="#24B0A7" />
                                <stop offset="0.99" stop-color="#00D18C" />
                                <stop offset="1" stop-color="#00D18C" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_880_5115"
                                x1="3.41664"
                                y1="98.0933"
                                x2="103.05"
                                y2="8.42498"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="#9945FF" />
                                <stop offset="0.14" stop-color="#8A53F4" />
                                <stop offset="0.42" stop-color="#6377D6" />
                                <stop offset="0.79" stop-color="#24B0A7" />
                                <stop offset="0.99" stop-color="#00D18C" />
                                <stop offset="1" stop-color="#00D18C" />
                            </linearGradient>
                            <linearGradient
                                id="paint2_linear_880_5115"
                                x1="25.9583"
                                y1="68.7101"
                                x2="67.2337"
                                y2="23.7879"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="#9945FF" />
                                <stop offset="0.14" stop-color="#8A53F4" />
                                <stop offset="0.42" stop-color="#6377D6" />
                                <stop offset="0.79" stop-color="#24B0A7" />
                                <stop offset="0.99" stop-color="#00D18C" />
                                <stop offset="1" stop-color="#00D18C" />
                            </linearGradient>
                            <linearGradient
                                id="paint3_linear_880_5115"
                                x1="58.3326"
                                y1="49.4467"
                                x2="61.0002"
                                y2="45.4453"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="#9945FF" />
                                <stop offset="0.14" stop-color="#8A53F4" />
                                <stop offset="0.42" stop-color="#6377D6" />
                                <stop offset="0.79" stop-color="#24B0A7" />
                                <stop offset="0.99" stop-color="#00D18C" />
                                <stop offset="1" stop-color="#00D18C" />
                            </linearGradient>
                            <clip-path id="clip0_880_5115">
                                <rect
                                    width="48"
                                    height="48"
                                    fill="white"
                                    transform="translate(24.5 24)"
                                />
                            </clip-path>
                        </defs>
                    </svg>
                    <button
                        type="button"
                        class="wallet-adapter-modal-middle-button"
                        on:click={getStarted}>Get started</button
                    >
                </div>
                <button
                    class="wallet-adapter-modal-list-more"
                    style="justify-content: space-between;"
                    class:wallet-adapter-modal-collapse-button-active={showMoreOptions}
                    on:click={() => toggleExtensionsAvailables()}
                >
                    <span>
                        {showExtensionsAvailables
                            ? 'Hide options'
                            : 'Already have a wallet? View options'}
                    </span>

                    <svg
                        width="13"
                        height="7"
                        viewBox="0 0 13 7"
                        xmlns="http://www.w3.org/2000/svg"
                        class:wallet-adapter-modal-list-more-icon-rotate={showMoreOptions}
                        ><path
                            d="M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z"
                        /></svg
                    >
                </button>

                {#if showExtensionsAvailables}
                    <ul
                        class="wallet-adapter-modal-list"
                        transition:slide={{ duration: 300 }}
                    >
                        {#each $walletStore.wallets.slice(0, numberOfWalletsShown) as { adapter: { name, icon, url }, readyState }}
                            <li>
                                <WalletButton
                                    on:click={() =>
                                        connect(name)}
                                >
                                    {name}

                                    <svelte:fragment slot="start-icon">
                                        <img src={icon} alt={`${name} icon`} />
                                    </svelte:fragment>

                                    <svelte:fragment slot="status">
                                        {readyState === 'Installed'
                                            ? 'Detected'
                                            : ''}
                                    </svelte:fragment>
                                </WalletButton>
                            </li>
                        {/each}
                    </ul>
                {/if}
            {/if}
        </div>
    </div>
</div>
