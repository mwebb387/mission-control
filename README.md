# Mission Control

An application for adding programs that need to be started and then creating a "Session" for running multiple programs at a time.

## Overview

This application is the result of the desire to reduce the time required for me to context switch and open up new sets of windows and browser tabs every time I move to work on a different project (and I sometimes work on three or more projects in a day).

As a personal project, I feel at times it is in a constant state of flux as I learn new and better techniques and new and better technologies and libraries emerge. I used this project as an excuse to learn Svelte as well as a way to flex my design chops using Sass, which are OK. Some things adhere to best practices, but some things are more experimental (ex. the Modal dialogs). I started with separating out the styles from the components, but learned along the way that having at least some component-scoped styling was easier to maintain. Then I wanted to have customizable theming, so I decided to start using Tailwind and Daisy UI (currently this is being updated in the `feature/ui-updates` branch).

This project also started several years ago using Svelte 3, Rollup and Python Eel and I would consider it pre-Alpha. Now it uses Svelte 4, Vite and Tauri (Rust) so it has gone through multiple updates over those years. The current repository's history starts where I would consider the app to be in a much more stable place.

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