# Registering Stores

Our Stores, Models and Table Schemas are ready.

We have to register the `items` and `collections` Stores in the `app/store.js` file. 

The file will look like this:

> `app/store.js`

```javascript
import { store, extend } from 'rfx-core';
import { configure } from 'mobx';

// app stores
import auth from '@/app/stores/Auth';

// items stores
import User from '@/app/stores/items/User';

// collections stores
import Users from '@/app/stores/collections/Users';

/**
  Enables MobX strict mode globally.
  In strict mode, it is not allowed to
  change any state outside of an action
 */
configure({
  enforceActions: 'always',
});

@extend({
  User,
}) class items {}

@extend({
  Users,
}) class collections {}

/**
  Stores
*/
export default store
  .setup({
    auth,
    items,
    collections,
  });
```

If you are not using ES6 Decorators, you can extend the classes like this:

```javascript
import User from '@/app/stores/items/User';
import Users from '@/app/stores/collections/Users';

class items {
  User = new User();
}

class collections {
  Users = new Users();
}

...

```