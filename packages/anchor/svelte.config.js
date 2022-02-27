import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import path from 'path';

const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			adapter: adapter(),
			resolve: {
				alias: {
					$lib: path.resolve('src/lib/')
				}
			}
		}
	}
};

export default config;
