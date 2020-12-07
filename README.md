_Based on project [HaBit Control 0.1.0](https://github.com/mellson/habitcontrol/#habit-control)._

## Template

The goal of this project is to be a template with support for:

- TypeScript
- XState
- Tailwind
- SvelteFire
- Dotenv

## Install

```
git clone https://github.com/ajdirocco/svelte-template my-template
cd my-template
npm install
npm run dev

```

Or using npx degit:

```
npx degit ajdirocco/svelte-template#main my-template
cd my-template
npm install
npm run dev

```

## Env file

The .env file is not required for this project, it's just used it as an example.

```bash
/* APPLICATION*/
APP_ENV_APP_NAME=app-name
APP_ENV_APP_VERSION=0.0.0
/*FIREBASE PROJECT*/
APP_ENV_FIREBASE_API_KEY=XXXXXXXXXXXXXXXXXXXXX
APP_ENV_FIREBASE_AUTH_DOMAIN=project-name.firebaseapp.com
APP_ENV_FIREBASE_DATABASE_URL=https://project-name.firebaseio.com
APP_ENV_FIREBASE_PROJECT_ID=project-name
APP_ENV_FIREBASE_STORAGE_BUCKET=project-name.appspot.com
APP_ENV_FIREBASE_MESSAGING_SENDER_ID=XXXXXXXXXXXXXXXXXXXXX
APP_ENV_FIREBASE_APP_ID=XXXXXXXXXXXXXXXXXXXXX
APP_ENV_FIREBASE_MEASUREMENT_ID=XXXXXXXXXXXXXXXXXXXXX
```

## Notes

Remember remove each environment variable reference if they are not necessary for your project.
Files using environment variables:

- rollaup.config.js
- App.svelte

_Thank --> [HaBit Control 0.1.0](https://github.com/mellson/habitcontrol/#habit-control)._
_you --> [sveltejs/template](https://github.com/sveltejs/component-template)_
_so much --> [How to use dotenv...](https://github.com/codediodeio/sveltefire)._
