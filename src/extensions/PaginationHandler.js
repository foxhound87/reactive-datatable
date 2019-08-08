import { types as t } from 'mobx-state-tree';
import _ from 'lodash';

const $pages = (total, limit) => limit && Math.ceil(total / limit);
const $current = (skip, limit) => limit && Math.ceil(skip / limit) + 1;
const $limit = self => self.$limit || self.limit;
const $total = self => self.$limit || self.total;

export default t.model('PaginationHandler', {
  total: t.optional(t.number, 0),
  limit: t.optional(t.number, 0),
  skip: t.optional(t.number, 0),
  $page: t.optional(t.number, 1),
})
  .views(self => ({
    /*
      "total": "<total number of records>",
      "limit": "<max number of items per page>",
      "skip": "<number of skipped items (offset)>",
      "current": "<current page number>"
      "pages": "<total number of pages>"
    */
    get pagination() {
      return {
        current: self.$page,
        total: $total(self),
        limit: $limit(self),
        pages: $pages($total(self), $limit(self)),
      };
    },
  }))
  .actions(self => ({
    afterCreate() {
      self.assign({
        page: $current(self.skip, $limit(self)),
      });
    },
    updateSelectedItems() {
      if (!self.data) return;
      self.data.map(item =>
        _.intersection(self.$selected, [item.$id]).length
          ? Object.assign(item, { $selected: true })
          : Object.assign(item, { $selected: false }));
    },
    onPageChange(page) {
      const $skip = self.limit * (page - 1);
      if ($skip < 0 || page > self.pagination.pages) return null;
      Object.assign(self, { $page: page });
      return self.load({ $skip });
    },
  }));
