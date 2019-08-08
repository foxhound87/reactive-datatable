# Extensions

In Reactive Datatable, many aspects of the system can be extended as well:

* form bindings and plugins
* editor components
* filters components
* table cells components

To extend the system we need to create an `Extensions` store class, and register it in `app/stores.js` as `extensions`.

For the form `bindings` and `plugins` extensions, refer to the [MobxReactForm Documentation](https://foxhound87.github.io/mobx-react-form/).

Then we have 3 props:

* editorSwitch
* filterSwitch
* cellSwitch

These props can be defined to provide additional custom components for the table cells, the editor view, and the filter view.

Each of them defines a function which returns an object with many `type names` as props (which defines a brand new type) that can be used afterward in every `Table Schemas`. Each `type` prop defines its own component to use. It works like the javascript switch case.

* All of the explained class properties are optional.
* Default types already provided can be overwritten.

The `Extension` Store class will look like this:

> `app/stores/Extensions.js`

```javascript
import React from 'react';

import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';

import bindings from '@/shared/forms/_.bindings';

// my components
import TextField from '@/shared/components/form/inputs/MaterialTextField';
import ReactSelect from '@/shared/components/form/inputs/ReactSelect';

export default class Extensions {
  init() {
    this.bindings = bindings;
    this.plugins = { dvr: dvr(validatorjs) };

    this.editorSwitch = ({ store, collection, form, field }) => ({
      text: <TextField field={field} key={field.name} />,
      select: <ReactSelect field={field} key={field.name} fullwidth />,
      // ... other components
    });

    this.filterSwitch = ({ store, collection, form, field }) => ({
      text: <TextField field={field} key={field.name} />,
      select: <ReactSelect field={field} key={field.name} />,
		// ... other components
    });

    this.cellSwitch = ({ column, value, item, collection }) => ({
      // string: <MyCustomCell ... />,
	   // ... other components
    });
  }
}
``` 

Each function takes in input different properties and data:

* **editorSwitch**: store, collection, form, field
* **filterSwitch**: store, collection, form, field
* **cellSwitch**: column, value, item, collection

Maybe not all of them will be useful for simple components, but in some complex cases can be needed!

Then we have to register the class into the `app/stores.js` file:

The name of the registered store **must** be `extensions`.

> `app/stores.js`

```javascript
import { store } from 'rfx-core';

import extensions from '@/app/stores/Extensions';

// ... other imports here ...

/**
  Stores
*/
export default store
  .setup({
    extensions,
    // ... other stores here ...
  });

```