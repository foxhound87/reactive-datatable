import React from 'react';
import { observer } from 'mobx-react';

const typeConditionCheck = (col, item) => {
  if (!col.condition || !col.icon) return true;
  return col.condition(item);
};

export default observer(({ col, item }) => (
  typeConditionCheck(col, item) &&
    <div className={col.classes && col.classes(item)}>{col.icon(item)}</div>
));
