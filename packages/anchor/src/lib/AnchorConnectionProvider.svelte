<script lang="ts">
	import { Connection } from '@solana/web3.js';
	import type { Commitment, ConnectionConfig } from '@solana/web3.js';
	import { workspace } from './workspace';
	import * as pkg from '@project-serum/anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	// import { PROGRAM_ID } from '$program/program';

	const { web3, Provider, Program } = pkg;

	export let idl,
		network: string,
		config: Commitment | ConnectionConfig | undefined = 'processed',
		programID: string;

	// const programID = PROGRAM_ID;
	const baseAccount = web3.Keypair.generate();
	const systemProgram = web3.SystemProgram;
	const connection = new Connection(network, config);

	function defineProgramAndProvider(walletStore) {
		let { sendTransaction, signTransaction, signAllTransactions, signMessage, publicKey } =
			walletStore;
		const providerWallet = {
			sendTransaction,
			signTransaction,
			signAllTransactions,
			signMessage,
			publicKey
		};
		const provider = new Provider(connection, providerWallet, {
			preflightCommitment: 'processed'
		});
		const program = new Program(idl, programID, provider);
		workspace.set({
			baseAccount,
			connection,
			provider,
			program,
			systemProgram,
			network
		});
		return {
			baseAccount,
			connection,
			provider,
			program,
			systemProgram,
			network
		};
	}

	$: $walletStore && $walletStore.publicKey && defineProgramAndProvider($walletStore);
</script>

<slot />
