### Initialize the Project

Clone [RFX-Next](https://github.com/foxhound87/rfx-next), or install Next.js or another environment with support to EcmaScript Decorators.

RFX-Next will provide some of the implementations below OOTB with decorators and feathers app auth.

> git clone git@github.com:foxhound87/rfx-next.git

> cd rfx-next && yarn

### Create a Feathers Server App

Follow the steps in the [Readme](https://github.com/foxhound87/rfx-next/blob/master/README.md) of RFX-Next to setup a Feathers Server App if not yet done, to do this you can use [Feathers Plus Generator](https://generator.feathers-plus.com/get-started/).

### Link Datatable Repo as Sub-Module

> git submodule add -f git@bitbucket.org:foxhound87/reactive-datatable.git modules/reactive-datatable

Then add `/modules` in `.gitignore`

Now we tell to webpack to handle `modules/reactive-datatable` with an alias.

Using Next.js the `next.config.js` extend the `config.resolve.alias` object.

Using RFX-Next, in the `config/next.config.js` file add this to the `registerAlias` function:

```javascript
const path = require('path');
...

const registerAlias = config =>
  Object.assign(config.resolve.alias, {
    ... // other alias paths here
    'reactive-datatable': path.resolve(__dirname, '../modules/reactive-datatable'),
  });
```

### Define the Feathers Server Endpoint

In RFX-Next create a `.env` file in the root with `ENV=development`

Change the `API` evar in `config/env/development.json` with the url of your feathers server (if different).

> In a different environment, provide `process.env.API` to the app.

### Install Feathers Client

> yarn add @feathersjs/feathers @feathersjs/rest-client @feathersjs/socketio-client @feathersjs/authentication-client socket.io-client axios

And Implement a [Feathers Client App Connector](https://github.com/foxhound87/rfx-next/blob/master/shared/feathers.js)

(these dependencies and the Feathers App Connector are already provided by RFX-Next)

This implementation will connect to a Feathers Server also for SSR apps (like Next.js) with support for both REST and SOCKETS calls (is important to allow SERVER calls with REST and only CLIENT calls with SOCKET to support Event Listners).

> In a different environment, remove `import env from '#/env';` and provide `process.env.API` to Feathers Client.


### Define the App Store

Fist install `rfx-core` to handle the App Stores (already provided by RFX-Next).

> yarn add rfx-core

Create a `store.js` file like [this](https://github.com/foxhound87/rfx-next/blob/master/app/store.js) where we will bootstrap all the **Datatable Stores** (items and collections and other app stores like Auth). Then initialize the `store.js` file importing it (and injecting the app state) in the main component when the app starts like [this](https://github.com/foxhound87/rfx-next/blob/master/pages/_app.js) providing the store as prop to child components.

### Define the Service Store

Create a `Service.js` file with [this implementation](https://github.com/foxhound87/rfx-next/blob/master/shared/feathers.js).

The `auth` property should return a promise to authorize the feathers app, the example provide the authorization using the [Auth Store](https://github.com/foxhound87/rfx-next/blob/master/shared/stores/Auth.js) of RFX-Next.

> If your Feathers Server does not have authentication at all, remove `auth: () => dispatch('auth.authenticate')` and use `auth: () => Promise.resolve()`.

Extending the `Service` Store will provide all the feathers calls and handle the creation of table models for the Stores that you will define in your app.


### Install all dependencies required by Reactive Datatable

> yarn add classnames tachyons lodash moment mobx@4.6.0 mobx-react@5.3.6 mobx-utils mobx-state-tree mobx-react-form feathers-hooks-common nprogress copy-to-clipboard react-popup react-dock react-pagify react-sidebar

### Setup Stylesheets

In your main css file import the following libs and files:

> `app/styles.css`

```css
@import 'tachyons';
@import 'nprogress/nprogress';

@import '../modules/reactive-datatable/src/styles/spinner';
@import '../modules/reactive-datatable/src/styles/snackbar';
@import '../modules/reactive-datatable/src/styles/popup';
```

### Example Project

You can find a project setup using RFX-Next with example Models, Table Schema, Stores, Feathers Server with Hooks and all the code showed in this documentation in the following repository:

#### [Reactive Datatable Demo]()

### Additional suggestions

RFX-Next is composed by the following directories: app, config, pages, shared.

This structure has been designed to provide `config` and `shared` as git `submodules`.

In this manner, some code and configs can be shared in different apps for a better microservices implementations.