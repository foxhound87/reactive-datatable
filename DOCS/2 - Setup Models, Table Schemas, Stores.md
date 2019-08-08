# Setup Models, Table Schemas, Stores.

## Define the Models

Let's define the MST Model for the User Entity.

Create `models/items/User.js` file and import `ServiceItemHandler` from the `reactive-datatable` repo then extend the `User` model with it.

> `shared/models/items/User.js`

```javascript
import { types as t } from 'mobx-state-tree';

import ServiceItemHandler from 'reactive-datatable/src/extensions/ServiceItemHandler';

const User = t.model('User', {
  _id: t.identifier,
  email: t.string,
  isVerified: t.boolean,
  roles: t.array(t.string),
  createdAt: t.string,
  updatedAt: t.string,
});

export default t.compose(
  ServiceItemHandler,
  User,
);
```

This represents a single User.
Now we will create a Model that represents a Collection of Users.

Create a `models/collections/Users.js` importing the `User` model and using it as an array of Users. Also we extend the `UsersCollection ` with `ServiceCollectionHandler`. 

Note the naming is now **plural**.

> `shared/models/collections/Users.js`

```javascript
import { types as t } from 'mobx-state-tree';
import User from '@/shared/models/items/User';
import ServiceCollectionHandler from 'reactive-datatable/src/extensions/ServiceCollectionHandler';

const UsersCollection = t.model(
  'UsersCollection', {
    data: t.maybeNull(t.array(User)),
  },
)
  .actions(self => ({

    afterCreate: () =>
      self.on('created', self.unshift),

    unshift: resource =>
      self.data.unshift(resource),

  }));

export default t.compose(
  ServiceCollectionHandler,
  UsersCollection,
);
```

In the `afterCreate` method we will listen on the User `created` event handler to add a new row to the table when a new User is created, in realtime.

## Define the User Table Schema

The Table Schema represent how and what the table component can show, which columns can be sortable, handle the actions on the items of the collections, and the filters definitions.

Each column `key` have to match the name of the `observable` or `computed views` properties defined in the MST Model.

Here below you can see a minimal implementation of the sortable fields and columns for the User Table.

Create a `app/tables/UserTable.js` file.

The Table Schema get in input the main app `store`, with all its stores of items and collections which we will implement afterward.

> `app/tables/UserTable.js`

```javascript
export default store => ({

  name: 'Users',

  sort: [
    'createdAt',
    'updatedAt',
    'email',
    'isVerified',
  ],

  columns: [{
    key: 'createdAt',
    label: 'Created At',
    type: 'date',
    format: 'MMM D, Y',
  }, {
    key: 'updatedAt',
    label: 'Updated At',
    type: 'date',
    format: 'MMM D, Y',
  }, {
    key: '$id',
    label: 'ID',
    type: 'reveal',
  }, {
    key: 'email',
    label: 'Email',
    type: 'string',
  }, {
    key: 'isVerified',
    label: 'Verified',
    type: 'icon',
    icon: item => item.isVerified
      ? <span className="green">&#10004;</span>
      : <span className="red">&#10008;</span>,
  },
  { key: 'roles', label: 'Roles', type: 'list' },
  { key: 'actionButtons', type: 'actionButtons' },
  { key: 'actionDropdown', type: 'actionDropdown' },
  { key: 'checkbox', type: 'checkbox' },
  ],

  actionButtons: [],

  actionDropdown: [],

  bulkActions: [],

  filters: {},

});

```

The available `types` for the columns are: `button`, `computed`, `date`, `icon`, `link`, `list`, `reveal`, `string`. The types can be extended with custom types as well.

There are special columns like `actionButtons` and `actionDropdown` to handle the item actions and also `checkbox` is a special column to handle the selection of multiple items on which can be performed `bulkActions`. These are all sortable as well as the other columns, just move them up or down in the coulmns `array`.

The `column` or `action` objects can have a `condition` prop with a function that can be used to show/hide a column or an action programmatically. For example:

```javascript
...
  {
    key: '$id',
    label: 'ID',
    type: 'reveal',
    condition: (item) => // some condition here
  }
...
```

> The $id field is a special field.

We will explore the use of `actions` in another chapter. 

## Define the User Store

All stores have to extend the `Service` class.

Keep in mind the **plural** for the naming of collections.

Create a `app/stores/items/User.js` and a `app/stores/collections/Users.js` file.

In the `setup` method we define the `type` (item or collection), the feathers `service` name, and providing the MST model.

> `app/stores/items/User.js` 

```javascript
import Service from '@/shared/Service';
import UserProfileModel from '@/shared/models/items/User';

export default class User extends Service {

  init() {
    this.setup({
      type: 'item',
      service: 'users',
      model: UserModel,
    });
  }
}
```

In the collection store, we can provide additional parameters to the `setup` method:

* type as collection
* the feathers service name 
* the collection model
* the table schema
* the form to enable create and edit mode
* additional parameters and query for the table first load

> `app/stores/collections/Users.js`

```javascript
import Service from '@/shared/Service';
import UsersModel from '@/shared/models/collections/Users';
import UsersTable from '@/app/tables/UsersTable';
import UserForm from '@/app/forms/UserForm';

export default class Users extends Service {

  init() {
    this.setup({
      type: 'collection',
      service: 'users',
      model: UsersModel,
      table: UsersTable,
      form: UserForm,
      params: {
        all: true,
        role: 'admin',
        relation: 'profile',
      },
      query: {
        $sort: {
          createdAt: -1,
        },
      },
    });
  }
}

```

> See the [Feathers Querying](https://docs.feathersjs.com/api/databases/querying.html) chapter for additional info on queries.

> You can also find more info in this guide to see how to implement the feathers hooks to use the params showed above.

If you are not in a SSR environment, you need to use `constructor` with `super` instead of the `init` method:

```javascript
export default class Users extends Service {

  constructor() {
    super();
    this.setup({
      ...
    });
  }
}
```