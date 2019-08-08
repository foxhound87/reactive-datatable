import { destroy, types as t } from 'mobx-state-tree';
import { toJS } from 'mobx';
import NProgress from 'nprogress';
import _ from 'lodash';
import { Popup } from '../popup';

import SelectCollectionHandler from './SelectCollectionHandler';
import PaginationHandler from './PaginationHandler';
import ServiceHandler from './ServiceHandler';

const isClient = (typeof window !== 'undefined');

const ServiceCollectionHandler = t.model('ServiceCollectionHandler', {
  $loading: t.optional(t.boolean, false),
  $sort: t.frozen(),
  $limit: t.maybeNull(t.number),
  $filters: t.maybeNull(
    t.model({
      query: t.frozen(),
      params: t.frozen(),
    }),
  ),
})
  .views(self => ({
    get count() {
      return self.data.length;
    },
  }))
  .actions(self => ({
    delete(item) {
      destroy(item);
    },
    load(query = {}, params = {}) {
      if (isClient) NProgress.start();

      const $filters = {
        query: self.$filters ? self.$filters.query : {},
        params: self.$filters ? self.$filters.params : {},
      };

      const $sort = self.$sort || _.get(self, '$query.$sort') || _.get(query, '$sort');
      const $query = { ...self.$query, ...$filters.query, ...toJS(query), $sort };
      const $params = { ...self.$params, ...$filters.params, ...toJS(params) };
      const $limit = ('$limit' in $query) ? $query.$limit : null;

      self.assign({
        $loading: true,
        $limit,
        $query,
        $params,
        data: null,
      });

      return self.find($query, $params)
        .then(res => self.assign(res))
        .then((result) => {
          // eslint-disable-next-line
          console.log('>>> load:', self.env('service'), {
            items: self.data.length,
            query: $query,
            params: $params,
            pagination: self.pagination,
          });

          if (isClient) {
            NProgress.done();
          }

          return result;
        })
        .then(() => self.updateSelectedItems())
        .finally(() => self.assign({
          $loading: false,
        }))
        .catch(err => ([
          console.error(err),
          isClient && Popup.alert(err.message, 'Error'),
        ]));
    },
    filter($filters = null, $query = undefined) {
      if ($query === null) {
        self.assign({
          $query: {
            $sort: _.get(self, '$query.$sort'),
          },
        });
      }

      self.assign({
        $filters,
        $page: 1,
      });

      return self.load({
        $skip: 0,
      });
    },
    sort(key) {
      let flag = -1;
      const sort = _.get(self, '$query.$sort');

      if (sort && sort[key] !== undefined) {
        flag = sort[key] * -1;
      }

      self.assign({
        $query: {
          ...self.$query,
          $sort: {
            [key]: flag,
          },
        },
      });

      return self.load({
        $sort: self.$sort,
      });
    },
  }));

export default t.compose(
  ServiceCollectionHandler,
  SelectCollectionHandler,
  PaginationHandler,
  ServiceHandler,
);
