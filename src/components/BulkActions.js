import React from 'react';
import { observer } from 'mobx-react';
import BulkActionsBar from './BulkActionsBar';

export default observer(({ collection, actions }) => (
  <div>
    <BulkActionsBar collection={collection} actions={actions} />
    {actions.map(action => (action.view &&
      (action.key === collection.$visibleView)) &&
        <div key={action.key}>
          {action.view(collection)}
        </div>)}
  </div>
));
