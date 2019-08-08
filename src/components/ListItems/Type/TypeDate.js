import React from 'react';
import moment from 'moment';

const typeConditionCheck = (col, item) => {
  if (!col.condition) return true;
  return col.condition(item);
};

export default ({ item, col, value }) => (
  <span>
    <span style={{ marginRight: '0.25rem' }}>{typeConditionCheck(col, item) && col.icon && col.icon(item)}</span>
    {value && moment(value).format(col.format)}
  </span>
);
