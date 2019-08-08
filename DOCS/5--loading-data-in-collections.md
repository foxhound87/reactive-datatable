# Loading Data in Collections

All the stores are ready, then we can use the `Collection` component to display our table.

In our page we have to import the `Collection` component and pass to it the main `store` object and the `name` of the Collection Store. To load the data we call the `load` method of the Collection Store:

> `pages/users.js`

```javascript
import React from 'react';
import { observer } from 'mobx-react';
import { when } from 'mobx';

import { authorize } from '@/app/components/hoc/authorize';
import { layout } from '@/app/components/hoc/layout';
import Collection from 'reactive-datatable/src/Collection';

@layout @authorize @observer
export default class Users extends React.Component {

  static async getInitialProps(ctx) {
    const { store } = ctx;

    return Promise.all([
      store.collections.Users.load(),
    ]);
  }

  componentDidMount() {
    const { store } = this.props;

    when(
      () => store.auth.check,
      () => store.collections.Users.isEmpty &&
            store.collections.Users.load(),
    );
  }

  render() {
    const { store } = this.props;
    
    return (
      <Collection
        name="Users"
        store={store}
      />
    );
  }
}

```