import React from 'react';
import { observer, inject } from 'mobx-react';
import Debug from './Debug';
import Table from './Table';
import PaginationBar from './PaginationBar';
import BulkActions from './BulkActions';
import FiltersBar from './Filters/FiltersBar';
import FiltersToggle from './Filters/FiltersToggle';
import NewResourceButton from './NewResourceButton';
import NewResourceEditor from '../Editor';
import SnackBar from './SnackBar';
import { Popup, registerPopupPlugins } from '../popup';

registerPopupPlugins();

const checkFilters = (filters, table) =>
  (filters && table.filters && table.filters.form);

export default inject('$')(observer(({

  HeaderExtended = null,

  cellComponentSwitch = () => {},
  filterComponentSwitch = () => {},
  editorComponentSwitch = () => {},

  showNew,
  showFilters,
  toggleNew,
  toggleFilters,
  filtersForm,
  collection,
  table,
  store,
  name,
  model,
  notFound,
  title = null,
  filters = true,
  snackBarRef,

  $,

}) => (
  <div className={$('globals').main}>
    <SnackBar ref={snackBarRef} />

    {showNew ?
      <NewResourceEditor
        mode="new"
        name={name}
        store={store}
        isVisible={showNew}
        toggleView={toggleNew}
        service={collection.env('service')}
        components={editorComponentSwitch}
      /> : null}

    {(checkFilters(filters, table)) ?
      <FiltersBar
        filterComponentSwitch={filterComponentSwitch}
        showFilters={showFilters}
        toggleFilters={toggleFilters}
        collection={collection}
        store={store}
        form={filtersForm}
      /> : null}

    <div className={$('header').main}>
      <div className={$('header').title}>
        {(HeaderExtended && HeaderExtended()) || title || table.name}
      </div>

      <div className={$('header').buttons}>
        {model.form &&
          <NewResourceButton
            toggle={toggleNew}
          />}
        {(checkFilters(filters, table)) ?
          <FiltersToggle
            toggle={toggleFilters}
            form={filtersForm}
          /> : null}
      </div>
    </div>

    <Table
      cellComponentSwitch={cellComponentSwitch}
      actionButtons={table.actionButtons}
      actionDropdown={table.actionDropdown}
      columns={table.columns}
      sort={table.sort}
      collection={collection}
      notFound={notFound}
    />

    {(collection.$selected &&
      collection.$selected.length) ?
        <BulkActions
          collection={collection}
          actions={table.bulkActions}
        /> : null}

    {collection.pagination ?
      <PaginationBar
        name={table.name || collection.env('service')}
        currentPage={collection.pagination.current}
        totalItems={collection.pagination.total}
        totalPages={collection.pagination.pages}
        onPageChange={collection.onPageChange}
      /> : null}

    {Popup && <Popup />}

    {collection.data &&
      <Debug data={collection} />}

  </div>
)));
