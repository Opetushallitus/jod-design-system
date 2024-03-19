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
```

### Package linking for hot reloading

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
