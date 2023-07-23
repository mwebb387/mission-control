# Mission Control

An application for adding programs that need to be started and then creating a "Session" for running multiple programs at a time.

## Usage

Coming soon...

## Building and Developing

Mission Control uses [Tauri](https://tauri.app/) to run a web app built with [Svelte](https://svelte.dev/).

### NodeJS

Make sure [NodeJS](https://nodejs.org/) and [NPM](https://www.npmjs.com/) are installed on your system by typing the following into a command prompt:

```sh
node --version
```

and

```sh
npm --version
```

### Installing Tauri Dependencies

Next make sure you have the [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites).

### Development Process

The main front end can be developed without Tauri. Just run the following command to serve up a running instance with hot-reloading:

```sh
npm run dev
```

To run the app with Tauri run the following command:

```sh
npm run tauri dev
```

## Using Svelte DevTools

The [Svelte DevTools](https://github.com/sveltejs/svelte-devtools) browser extension also provides helpful debugging capabilities for Svelte.

## Building for Release

To build the release version run the Tauri build script:

```sh
npm run tauri build
```