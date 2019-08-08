import React from 'react';
import { observer, inject } from 'mobx-react';

export default inject('$')(observer(({
  $,
  form,
  toggle,
}) => (
  <span>

    <button
      type="button"
      onClick={toggle}
      className={form.isDirty
        ? $('buttonGroupLeft')({ resp: true }, 'b ttu bn bg-light-blue')
        : $('button')({ rounded: true, type: 'mediumResp', theme: 'lightBlue' })}
    >
      Filters
    </button>

    {form.isDirty &&
      <button
        type="button"
        className={$('buttonGroupRight')({ resp: true, theme: 'bgBlue' }, 'bg-blue')}
        onClick={form.onReset}
      >
        <span className="white">&#10008;</span>
      </button>}

  </span>
)));
