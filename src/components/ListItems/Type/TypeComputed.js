import React from 'react';

export default ({ item, col }) => (
  (!col.if || col.if(item)) ?
    <span>{col.compute(item)}</span>
    : null
);
