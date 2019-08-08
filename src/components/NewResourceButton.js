import React from 'react';
import { inject } from 'mobx-react';

export default inject('$')(({ $, toggle }) => (
  <button
    type="button"
    onClick={toggle}
    style={{ marginRight: '0.5rem' }}
    className={$('button')({
      rounded: true,
      type: 'mediumResp',
      theme: 'lightBlue',
    })}
  >
    New
  </button>
));
