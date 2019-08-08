import React from 'react';
import { observer, inject } from 'mobx-react';
import Paginator from 'react-pagify';

export default inject('$')(observer(({
  $,
  currentPage,
  onPageChange,
}) => (
  <Paginator.Context
    segments={{ centerPage: [currentPage] }}
    onSelect={onPageChange}
  >
    <Paginator.Button
      page={currentPage - 1}
      className={$('pagination').buttons.left}
    >
      <button
        type="button"
        className={$('buttonGroupLeft')({ resp: true })}
      >
        &#10094;
      </button>
    </Paginator.Button>
    <Paginator.Button
      page={currentPage + 1}
      className={$('pagination').buttons.right}
    >
      <button
        type="button"
        className={$('buttonGroupRight')({ resp: true })}
      >
        &#10095;
      </button>
    </Paginator.Button>
  </Paginator.Context>
)));
