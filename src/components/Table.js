import React from 'react';
import { observer, inject } from 'mobx-react';
import cx from 'classnames';
import _ from 'lodash';

// components
import LoadingOrNotFound from './LoadingOrNotFound';
import ActionsViews from './ActionsViews';
import ItemSwitch from './ListItems/Switch';

const checkCondition = (col, collection) =>
  (!col.condition || (col.condition && col.condition(collection)));

const handleCollectionSort = (collection, key, sort) => e => ([
  e.preventDefault(),
  _.includes(sort, key) && collection.sort(key),
]);

const renderSortingIcon = (collection, key, sort) => {
  if (!_.includes(sort, key)) return null;
  if (collection.$query && collection.$query.$sort) {
    if (collection.$query.$sort[key] !== 1) {
      return <span> &#9662;</span>;
    }
  }
};

const Table = inject('$')(observer(({
  cellComponentSwitch,
  actionButtons,
  actionDropdown,
  collection,
  columns,
  sort,
  $,
}) => (
  <div className={$('table').container}>
    <table className={$('table').main}>
      <thead>
        <tr className={$('table').head.row}>
          {columns.map((col, colKey) =>
            checkCondition(col, collection) &&
              <th
                key={col.key}
                onClick={handleCollectionSort(collection, col.key, sort)}
                className={cx($('table').head.cell, {
                  [$('table').head.sort]: sort && sort.includes(col.key),
                  [$('table').head.first]: (colKey === 0),
                })}
              >
                {col.label}
                {renderSortingIcon(collection, col.key, sort)}
              </th>)}
        </tr>
      </thead>
      <tbody>
        {collection.data.map(item =>
          <tr key={item.$id} className={$('table').body.row}>
            {columns.map((col, colKey) =>
              checkCondition(col, collection) &&
                <td
                  key={col.key}
                  className={cx($('table').body.cell, {
                    [$('table').body.first]: (colKey === 0),
                  })}
                >
                  {checkCondition(col, collection) &&
                    ItemSwitch(col.type, {
                      extend: cellComponentSwitch,
                      actionButtons: (col.type === 'actionButtons') && actionButtons,
                      actionDropdown: (col.type === 'actionDropdown') && actionDropdown,
                      value: item[col.key],
                      column: col,
                      collection,
                      item,
                    })}
                </td>)}
          </tr>)}
      </tbody>
    </table>
  </div>
)));

export default observer(({
  cellComponentSwitch,
  actionButtons = [],
  actionDropdown = [],
  collection,
  columns,
  sort,
  notFound,
}) => (
  <div>
    {(collection.data && collection.data.length) ?
      <div>
        <ActionsViews
          collection={collection}
          actions={actionButtons}
        />
        <Table
          cellComponentSwitch={cellComponentSwitch}
          actionButtons={actionButtons}
          actionDropdown={actionDropdown}
          collection={collection}
          columns={columns}
          sort={sort}
        />
      </div> :
      <LoadingOrNotFound
        loading={collection.$loading}
        notFound={notFound}
      />}
  </div>
));
