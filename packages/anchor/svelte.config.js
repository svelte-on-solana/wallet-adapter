import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import path from 'path';

const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			adapter: adapter(),
			optimizeDeps: {
        include: ['@project-serum/anchor', '@solana/web3.js'],
      },
			resolve: {
				alias: {
					$lib: path.resolve('src/lib/')
				}
			}
		}
	}
};

export default config;
