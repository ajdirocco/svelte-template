import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import injectProcessEnv from "rollup-plugin-inject-process-env";
import livereload from "rollup-plugin-livereload";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

dotenv.config();

const APP_VERSION = require('./package.json').version
const APP_NAME = require('./package.json').name

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.ts",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    replace({
			APP_ENV_APP_VERSION: APP_VERSION,
			APP_ENV_APP_NAME: APP_NAME,
			APP_ENV_FIREBASE_API_KEY: JSON.stringify(process.env.APP_ENV_FIREBASE_API_KEY),
			APP_ENV_FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.APP_ENV_FIREBASE_AUTH_DOMAIN),
			APP_ENV_FIREBASE_DATABASE_URL: JSON.stringify(process.env.APP_ENV_FIREBASE_DATABASE_URL),
			APP_ENV_FIREBASE_PROJECT_ID: JSON.stringify(process.env.APP_ENV_FIREBASE_PROJECT_ID),
			APP_ENV_FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.APP_ENV_FIREBASE_STORAGE_BUCKET),
			APP_ENV_FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.APP_ENV_FIREBASE_MESSAGING_SENDER_ID),
			APP_ENV_FIREBASE_APP_ID: JSON.stringify(process.env.APP_ENV_FIREBASE_APP_ID),
			APP_ENV_FIREBASE_MEASUREMENT_ID: JSON.stringify(process.env.APP_ENV_FIREBASE_MEASUREMENT_ID)
		}),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write("public/build/bundle.css");
      },
      preprocess: sveltePreprocess(),
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    typescript({ sourceMap: !production }),
    injectProcessEnv({ NODE_ENV: process.env.NODE_ENV }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
