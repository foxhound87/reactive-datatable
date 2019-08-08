/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { observer, inject } from 'mobx-react';
import Pagination from './Pagination';

export default inject('$')(observer(({
  $,
  name = 'Items',
  totalItems,
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className={$('pagination').container}>
    <div className={$('pagination').left}>
      Page <span className={$('pagination').pages}>{currentPage} of {totalPages}</span>
    </div>
    <div className={$('pagination').center}>
      {totalItems} {name}
    </div>
    <div className={$('pagination').right}>
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  </div>
)));
