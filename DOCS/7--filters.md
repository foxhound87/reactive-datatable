# Filters

After defining the `filterSwitch` prop in the `Extensions` Store Class, we can create filters for our table.

Let's say we have defined a `text` input and a `select` input like this:


> `app/stores/Extensions.js`

```javascript
import React from 'react';

import TextField from '@/shared/components/form/inputs/MaterialTextField';
import ReactSelect from '@/shared/components/form/inputs/ReactSelect';

export default class Extensions {
  init() {
    ....

    this.filterSwitch = ({ store, collection, form, field }) => ({
      text: <TextField field={field} key={field.name} />,
      select: <ReactSelect field={field} key={field.name} />,
    });
  }
}
```

then in our `Table Schema` we can define the `filters`.

For example we want to define a text input to search the email field, a select input to filter the verified accounts, and another select input to filter roles of users.

Define the filter property using the MobxReactForm field definition. 

Our Filters will look like this:

> `app/tables/UserTable.js`

```javascript
export default store => ({

  name: 'Users',

  columns: [{
    // ... all defined columns here ...
  ],

  filters: {
    form: {
      fields: [{
        name: 'email',
        type: 'text',
        label: 'Email',
      }, {
        name: 'isVerified',
        type: 'select',
        label: 'Is Verified',
        output: obj => obj.value,
        extra: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ],
      }, {
        name: 'roles',
        type: 'select',
        label: 'Role',
        output: obj => obj.value,
        extra: [
          { value: 'user', label: 'user' },
          { value: 'admin', label: 'admin' },
          { value: 'customer', label: 'customer' },
        ],
      }],
    },
  },

});
```

The filter form is using [MobxReactForm](https://github.com/foxhound87/mobx-react-form), for all the filter form implementation and field definitions, refer to the [MobxReactForm Documentation](https://foxhound87.github.io/mobx-react-form/)

If we need multiple filters types for the same field, we can use the `link` properties.

In the following example we are linking the `amount` field to both `amountSearch` and `amountSelect` filters:

> `app/tables/OrdersTable.js`

```javascript
export default store => ({

  name: 'Orders',
  
  columns: [{
    // ... all defined columns here ...
  ],

  filters: {
    link: {
      // link "amount" field
      // to multiple filters
      amountSearch: 'amount',
      amountSelect: 'amount',
    },
    form: {
      fields: [{
        name: 'amountSearch',
        type: 'text',
        label: 'Amount',
        output: value => Number(value),
      }, {
        name: 'amountSelect',
        type: 'select',
        label: 'Amount',
        output: obj => obj.value,
        extra: [
          { value: { $lte: 50 }, label: '50 or Less' },
          { value: { $lte: 150 }, label: '150 or Less' },
          { value: { $gte: 150 }, label: '150 or More' },
          { value: { $gte: 250 }, label: '250 or More' },
        ],
      }],
    },
  },

});
```

The `FILTERS` button will be now visible in the top-right of the table header to show the filters bar or reset the filters.