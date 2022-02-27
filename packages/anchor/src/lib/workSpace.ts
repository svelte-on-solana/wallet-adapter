import { writable } from 'svelte/store';
import type { Program, Provider, web3 } from '`@project-serum/anchor`';
import type { Connection, Keypair } from '@solana/web3.js';

export type Workspace = {
  baseAccount?: Keypair;
  connection: Connection;
  provider?: Provider;
  program?: Program;
  systemProgram?: typeof web3.SystemProgram;
  network: string;
};

export const workspace = writable<Workspace>(undefined);
