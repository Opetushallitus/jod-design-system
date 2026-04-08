# JOD Design System

This is the design system for the JOD project. It is a collection of reusable components and styles that can be used to build a consistent and accessible user interface.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. First, ensure that you have [NVM](https://github.com/nvm-sh/nvm) installed on your machine.
2. Clone this repository to your local machine.
3. Open a terminal window and navigate to the root directory of the project.
4. Run the following command to install Node.js & NPM and the dependencies:

```shell
nvm install
nvm use
npm install
npm exec allow-scripts run
```

### Node, npm, and install policy

The project targets **Node.js 24** (see `.nvmrc`, currently `lts/krypton`) and **npm 11.10 or newer**, as declared in `package.json` under `engines` and `devEngines`. The repository `.npmrc` sets `engine-strict=true`, so `npm install` will **fail** if your Node or npm version does not satisfy those constraints.

Other notable `.npmrc` settings:

- **`ignore-scripts=true`** - package lifecycle scripts are not run during install. Allowed scripts are executed explicitly with `npm exec allow-scripts run` in the install step below.
- **`min-release-age="7"`** - npm will not install registry packages that were published less than seven days ago, which reduces exposure to freshly published compromised releases.

Dependencies in `package.json` use **exact versions** (no semver ranges) so installs are reproducible and match the lockfile.

## Download third-party UI assets

Third-party assets such as images, fonts, and icons are stored in S3 bucket. Guide to download assets is available in the infrastructure repository.

## Package linking for hot reloading

Run the following commands:

```shell
npm link
npm run dev
```

Open a new terminal window and navigate to the root directory of the project you want to link the design system to. Run the following command to link the design system to the project:

```shell
npm link @jod/design-system
npm run dev
```

## Add as a dependency

This repo is not published to the npm registry, so if you would like to have the latest version that the `main` branch has to offer then you can add it like the following:

```shell
npm i --save git+ssh://git@github.com:Opetushallitus/jod-design-system#main
```
