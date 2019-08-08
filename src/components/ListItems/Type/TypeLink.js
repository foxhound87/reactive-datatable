import React from 'react';

export default ({ item, col }) => (
  <a
    href={col.link(item)}
    target="_blank"
    rel="noopener noreferrer"
  >
    &#10166;
  </a>
);
