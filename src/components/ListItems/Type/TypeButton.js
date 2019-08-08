/* eslint-disable no-nested-ternary */
import React from 'react';
import { observer, inject } from 'mobx-react';
import cx from 'classnames';

export default inject('$')(observer(({
  $, item, col, value,
}) => (
  (!col.if || col.if(item)) ?
    <button
      type="button"
      data-place="top"
      data-tip={col.tooltip || col.label}
      onClick={col.handler && col.handler(item)}
      className={cx($('button')({
        rounded: true,
        theme: col.theme,
      }), col.classes && col.classes(item))}
    >
      {col.text ? col.text(item) : value}
    </button>
    : col.text ? col.text(item) : value
)));
