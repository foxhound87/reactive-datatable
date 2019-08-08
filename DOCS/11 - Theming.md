# Theming

All the styling of the components of Reactive Datatable is written with **tachyons** classes, it is completely extensible. Is also possible to remove **tachyons** completely and use a different CSS framework or custom classes.

All the **classes** are located in `reactive-datatable/src/styles/theme.classes.js`.

To extend/override this file, create a new `@/shared/theme.js` file in your app:

For example if we want to extend the buttons themes the file will look like this:

```javascript
export const theme = {
  buttons: {
    themes: {
      green: 'bn white bg-light-green hover-bg-green',
      yellow: 'bn white bg-yellow hover-bg-pink',
    },
  },
};
```

With this code we are **overrinding** the classes of the already existing **green** button, and creating another **yellow** theme.

> To use a button **theme** on the Table Actions we can define a **theme** property with the name of the theme we need.

Then import your `@/shared/theme.js` file in your page and pass it to the `Collection` component:

```javascript
import React from 'react';
import Collection from 'reactive-datatable/src/Collection';
import { theme } from '@/shared/theme'; // <--

...

render() {
  return (
    <Collection
      name="Users"
      store={this.props.store}
      theme={theme} // <--
    />
  );
}
```