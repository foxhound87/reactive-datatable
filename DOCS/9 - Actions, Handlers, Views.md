# Actions, Handlers, Views

In the **Table Schema** can be defined 3 types of actions:

* **actionButtons** (showed for each item as buttons)
* **actionDropdown** (showed for each items as dropdown buttons)
* **bulkActions** (buttons showed in the table footer after selecting some items with checkbox)

Each `action` is an object with the following properties:

* key
* type
* label
* handler
* view
* icon (optional)
* condition (optional)

> only `type: 'button'` is currently available as action `type`.

When create a new action, you can provide custom components for the `view` property, or use the following components provided OOTB:

* **View - 1-1 relation** (to show the data of a resource or a related resource)
* **Related - 1-N relation** (to show multiple related resource as table collection)
* **Editor** (to show the editor form to edit a resouce)
* **Delete** (to show the delete popup to delete a resource)

> On each component use the **item.toggleView(...)** method in combination of **isVisible={item.isVisibleView(...)}** providing the action `key` to show the view when the action `handler` is exectued on the button `onClick`.

The following examples are **not** compatible for `bulkActions`.

## View (show item data)

Pass the `item` object to the `View` component.

```javascript
import React from 'react';
import View from 'reactive-datatable/src/View';
...

{
    type: 'button',
    key: 'showProfile',
    label: 'View',
    handler: item => e => ([
      item.toggleView('showProfile'),
    ]),
    view: item => (
      <View
        item={item}
        isVisible={item.isVisibleView('showProfile')}
      />),
  }
```

## View (1-1 relation)

Use the `item.findRelated()` or the `item.getRelated()` method to load the related resource. 

* **findRelated** (`blongsTo` related resource)
* **getRelated** (`hasOne` related resource)

Properties: 

* **relation** (the related resource name, defined in the MST Model)
* **service** (the feathers server service name)
* **key** (the name of the key field to use for the relation) 

#### findRelated / belongsTo

```javascript
import React from 'react';
import View from 'reactive-datatable/src/View';
...

{
    type: 'button',
    key: 'showRelatedProfile',
    label: 'Related Profile',
    handler: item => e => ([
      item.toggleView('showRelatedProfile'),
      item.findRelated({ // blongsTo
        relation: 'profile',
        service: 'profiles',
        key: 'userId',
      }),
    ]),
    view: item => (
      <View
        item={item}
        relation="profile"
        isVisible={item.isVisibleView('showRelatedProfile')}
      />),
  }
```


#### item.getRelated / hasOne

```javascript
import React from 'react';
import View from 'reactive-datatable/src/View';
...

{
    type: 'button',
    key: 'showRelatedUser',
    label: 'Related User',
    handler: item => e => ([
      item.toggleView('showRelatedUser'),
      item.getRelated({ // hasOne
        relation: 'user',
        service: 'users',
        key: 'userId',
      }),
    ]),
    view: item => (
      <View
        item={item}
        relation="user"
        isVisible={item.isVisibleView('showRelatedUser')}
        loading={item.$loading}
      />),
  }
```

## Editor (edit mode)

Pass to the `Editor` component the `item` object and the main `store` object selecting the Collection Store with the `name` property.

```javascript
import React from 'react';
import Editor from 'reactive-datatable/src/Editor';
...

{
    type: 'button',
    key: 'showEditor',
    label: 'Edit',
    theme: 'green',
    handler: item => e => ([
      item.toggleView('showEditor'),
    ]),
    view: item => (
      <Editor
        isVisible={item.isVisibleView('showEditor')}
        name="Users"
        store={store}
        item={item}
      />),
  }
```

## Delete

Pass the `item` object to the `Delete` component.

```javascript
import React from 'react';
import Delete from 'reactive-datatable/src/Delete';
...

{
    type: 'button',
    key: 'showDelete',
    label: 'Delete',
    theme: 'lightRed',
    handler: item => e => ([
      item.toggleView('showDelete'),
    ]),
    view: item => (
      <Delete
        isVisible={item.isVisibleView('showDelete')}
        item={item}
      />),
  }
```