import { getParent, getEnv, types as t } from 'mobx-state-tree';

import SelectItemHandler from './SelectItemHandler';
import ServiceHandler from './ServiceHandler';

const ServiceItemHandler = t.model('ServiceItemHandler', {
  $loading: t.optional(t.boolean, false),
  // $service: t.maybeNull(t.string), // defined in ServiceHandler
})
  .actions(self => ({
    afterCreate() {
      self.assign({
        $id: self[getEnv(self).id],
        $service: self.$service || getEnv(self).service,
      });
    },
    delete() {
      return self.remove(self.$id)
        .then(() => getParent(self, 2).delete(self));
    },
    getRelated({
      params = {},
      relation,
      service,
      key,
    }) {
      self.assign({ $loading: true });
      const get = getEnv(self).calls.get({ service });

      return get(self[key], params)
        .then(response => self.assign({
          [relation]: Object.assign(response, {
            $id: response[getEnv(self).id],
            $service: service,
          }),
        }))
        .finally(() => self.assign({
          $loading: false,
        }));
    },
    findRelated({
      params = {},
      relation,
      service,
      key,
    }) {
      self.assign({ $loading: true });
      const find = getEnv(self).calls.find({ service });
      const $params = { all: true, role: 'admin' };

      return find({ [key]: self.$id }, { ...params, ...$params })
        .then(response => response.data.length && self.assign({
          [relation]: Object.assign(response.data[0], {
            $id: response.data[0][getEnv(self).id],
            $service: service,
          }),
        }))
        .finally(() => self.assign({
          $loading: false,
        }));
    },
  }));

export default t.compose(
  ServiceItemHandler,
  SelectItemHandler,
  ServiceHandler,
);
