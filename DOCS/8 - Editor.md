# Editor

To setup the editor we need to define our input components in the `Extensions` Store Class (see the chapter about the extensions), the form definitions and an optional action to edit each resource.

First create a form file `app/forms/UserForm.js`.

The file exports a function that takes in input the main store object and returns an array.

* The **first element** of the array is an object with the fields definiton (refer to the [MobxReactForm Documentation](https://foxhound87.github.io/mobx-react-form/)).

* The **second element** of the array is a callback function to handle additional form actions or form hooks. It takes in input the following props: `form`, `hook`, `collection`, `item`.

> **hook** is an utility function to extend the forms event hooks.

The initial structure look like this:

> `app/forms/UserForm.js`

```javascript
export default ({ store }) => ([{
	
	// form definitions ...
	
}, ({ form, hook, collection, item }) => {

	// form callback ...

}]);
```

If not needed, the callback (the second element of the array) can be completely omitted. 

This is how look like a form for create or edit an user using MaterialTextField and ReactSelect components:

> `app/forms/UserForm.js`

```javascript
export default ({ store }) => ([{
  fields: [
    'email',
    'isVerified',
  ],
  types: {
    email: 'text',
    isVerified: 'select',
  },
  bindings: {
    email: 'MaterialTextField',
  },
  rules: {
    email: 'required|email',
    isVerified: 'required|boolean',
  },
  extra: {
    isVerified: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
  },
  input: {
    isVerified: value => (typeof value === 'boolean') && {
      value, label: value ? 'Yes' : 'No',
    },
  },
  output: {
    isVerified: obj => obj ? obj.value : null,
  },
}, ({ form, hook, collection, item }) => {

  const error = ($form, err) => ([
    console.error(err),
    $form.invalidate(err.message),
  ]);
  
  hook('onSuccess', () => {
    if (item) { // update
      return item.patch(form.values())
        .then(result => item.assign(result))
        .catch(err => error(form, err));
    }

    // create
    return collection.create(form.values())
      .then(() => form.clear())
      .catch(err => error(form, err));
  });

}]);
```

> The behavior of the code showed in the **hook callback** is already implemented and available OOTB, it is showed only for explanation purposes. Use the **hook utility** if you want to override this code.

> The `types` in the definitions of our form will match the components defined for the property `editorSwitch` of the `Extensions` Store Class (see the chapter about the extensions).

The `NEW` button will be now visible in the top-right of the table header to allaw the creation of new resources.

Now we need to register the form in our User Collection Store.

Open `app/stores/collections/Users` and add the `form` property to the `setup` method:

```javascript
import Service from '@/shared/Service';
import UsersModel from '@/shared/models/collections/Users';
import UsersTable from '@/app/tables/UsersTable';
import UserForm from '@/app/forms/UserForm'; // <--

export default class Users extends Service {

  init() {
    this.setup({
      type: 'collection',
      service: 'users',
      model: UsersModel,
      table: UsersTable,
      form: UserForm, // <--
      ...
    });
  }
}
```

To allow the editing of an existing resource, we will need to define an edit action for `actionButtons` or `actionDropdown` and using the `Editor` componente as `view` in the User Table Schema:

> `app/tables/UserTable.js`

```javascript
import React from 'react';
import Editor from 'reactive-datatable/src/Editor';

export default store => ({

  name: 'Users',

  columns: [  
    // other columns here ...
    { key: 'actionButtons', type: 'actionButtons' },
  ],

  actionButtons: [{
    type: 'button',
    key: 'showEditor',
    label: 'Edit',
    handler: item => e => ([
      e.preventDefault(),
      item.toggleView('showEditor'),
    ]),
    view: item => (
      <Editor
        isVisible={item.isVisibleView('showEditor')}
        name="Users"
        store={store}
        item={item}
      />),
  }],
});
```