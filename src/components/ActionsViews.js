import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ collection, actions }) => (
  <div>
    {collection.data.map(item =>
      item.$visibleView &&
        actions.map(action => action.view &&
          <div key={[action.key, item.$id].join('-')} className="tl">
            {(item.isVisibleView &&
              (action.key === item.$visibleView)) &&
                action.view(item)}
          </div>))}
  </div>
));
