/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { observer } from 'mobx-react';
import Dock from './components/Dock';
import Collection from './Collection';

export default observer(({
  title = null,
  service = null,
  name,
  item,
  store,
  isVisible,
  toggleView,
}) => (
  <Dock
    fluid
    minSize={0.5}
    position="bottom"
    isVisible={isVisible}
    toggleView={toggleView || item.toggleView}
    service={service || item.$service || item.env('service')}
    id={item.$id}
  >
    <Collection
      name={name}
      title={title}
      store={store}
      filters={false}
      related={item}
    />
  </Dock>
));
