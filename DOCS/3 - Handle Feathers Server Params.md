# Handle Feathers Server Params

In this chapter we will see how to handle the params defined in our stores and how to define the Feathers Hooks.

We use the following params:

* all
* role
* relation

Using `all: true` and `role: admin` we will tell to the Feathers Server to load `all` the resources if the user role is `admin`. For example, we want an admin to be able to see all the resources in our table.

The `relation` param will tell to feathers to load related data using the `populate` hook.

To handle these param we will create 2 hooks:

* hasPermissions
* handleRelationParam

First of all, in our `app.hooks.js` define `paramsFromClient` for the `before.all` hook enabling the params we will use for our calls:

```javascript
const { paramsFromClient } = require('feathers-hooks-common');
const log = require('./hooks/log');

...
 before: {
   all: [
      paramsFromClient('all', 'role', 'relation'), // <---
      log(),
    ],
    ...
 }
 ...
```

## Create the hasPermissions hook

The `hasPermissions` we will check the `roles` param in the logged user and the one in the our call. It will also check the presence of the `all` param in our call.

In our hooks dir, create a file `hasPermissions.js` with the following code:

```javascript
const _ = require('lodash');

const hasUserRoleParam = (context) =>
  (context.params.user && context.params.user.roles);

const checkRoleParam = (context, roles, all) => {
  const jwtCheck = (_.intersection(context.params.user.roles, roles).length !== 0);
  const paramCheck = (context.params.role && _.intersection(roles, [context.params.role]).length) ? true : false;
  const checkAllParam = (context.params.all === true || context.params.all === 'true');
  const checkRole = (jwtCheck && paramCheck);
  return all === 'all' ? (checkAllParam && checkRole) : checkRole;
};

module.exports = (roles, all = false) => (context) =>
  hasUserRoleParam(context)
    ? checkRoleParam(context, roles, all)
    : false;

```

Now you can use the hook in our `before.find` service hooks file like this:

```javascript
const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToOwner } = require('feathers-authentication-hooks');
const { iff, iffElse } = require('feathers-hooks-common');
const handleRelationParam = require('../../hooks/handleRelationParam');

...
  before: {
    ...
    find: [
      authenticate('jwt'),
      iff((ctx) => ctx.params.provider,
        iffElse(hasPermissions(['admin'], 'all'),
          checkPermissions({
            roles: ['admin'],
            field: 'roles',
          }),
          restrictToOwner()
        ),
      )
    ],
    ...
  }
 ...
```

The service will now load `all` the resources only if the user has the `admin` role, otherwise will retrive only the data of the owner (loading the resource belonging on the logged user).

## Create the handleRelationParam hook

The `handleRelationParam` hook will check the presence of the `relation` param in our calls. Can also be used more relations providing the name of the relations separated by commas.

In our hooks dir, create a file `handleRelationParam.js` with the following code:

```javascript
const { combine } = require('feathers-hooks-common');
const _ = require('lodash');

module.exports = function (relations) {
  // an arrow func cannot be used because we need 'this'
  return function (hook) {
    if (hook.type !== 'after')
      throw new Error('The "handleRelationParam" hook should only be used as a "after" hook.');

    if (hook.params.relation === undefined)
      return hook;

    let $params = hook.params.relation.split(',');

    const $relations = _.compact($params.map((key) => relations[key]));

    if ($relations.length)
      return combine(...$relations)
        .call(this, hook)
        .then(() => hook);

    return hook;
  };
};
```

Now you can use the hook in our `after.*` service hooks file like this:

```javascript
const { populate } = require('feathers-hooks-common');
const handleRelationParam = require('../../hooks/handleRelationParam');
...

const relations = {
  profile: populate({
    schema: {
      include: {
        service: 'profiles',
        nameAs: 'profile',
        childField: 'userId',
        parentField: '_id',
        provider: undefined,
        useInnerPopulate: true,
      }
    }
  }),
};

...
after: {
	....
	find: [
      handleRelationParam({
        profile: relations.profile,
      }),
    ],
    ...
 }
...
```

## Using the params in our stores

Here you can see an example of the `Users Collection Store` using the parameters to load `all` resources if the user `role` is `admin` and all the resources will also load the `profile` relation:

```javascript
import Service from '@/shared/Service';
...

export default class Users extends Service {

  init() {
    this.setup({
      type: 'collection',
      service: 'users',
      ...
      params: {
        all: true,
        role: 'admin',
        relation: 'profile',
      },
    });
  }
}

``` 

To be able to get the relation data of `profile` we also need to edit our MST `User` model and create the MST `UserProfile` model as well:

> `shared/models/items/User.js`

```javascript
import { types as t } from 'mobx-state-tree';

import ServiceItemHandler from 'reactive-datatable/src/extensions/ServiceItemHandler';
import UserProfile from '@/shared/models/items/UserProfile'; // <--

const User = t.model('User', {
  _id: t.identifier,
  email: t.string,
  isVerified: t.boolean,
  roles: t.array(t.string),
  createdAt: t.string,
  updatedAt: t.string,
  profile: t.maybeNull(t.late(() => UserProfile)), // <--
});

export default t.compose(
  ServiceItemHandler,
  User,
);
```

> `shared/models/items/UserProfile.js`

```javascript
import { types as t } from 'mobx-state-tree';

import ServiceItemHandler from 'reactive-datatable/src/extensions/ServiceItemHandler';
import User from '@/shared/models/items/User';  // <--

const UserProfile = t.model('UserProfile', {
  _id: t.identifier,
  userId: t.string, // <--
  firstName: t.string,
  lastName: t.string,
  country: t.string,
  phone: t.string,
  createdAt: t.string,
  updatedAt: t.string,
  user: t.maybeNull(t.late(() => User)), // <--
});

export default t.compose(
  ServiceItemHandler,
  UserProfile,
);
```
