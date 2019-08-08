import { getEnv, types as t } from 'mobx-state-tree';

export default t.model('ServiceCalls', {})
  .actions(self => ({
    afterCreate() {
      const id = self.$id;
      const service = self.env('service');

      self.assign({
        find: getEnv(self).calls.find({ id, service }),
        get: getEnv(self).calls.get({ id, service }),
        create: getEnv(self).calls.create({ id, service }),
        update: getEnv(self).calls.update({ id, service }),
        patch: getEnv(self).calls.patch({ id, service }),
        remove: getEnv(self).calls.remove({ id, service }),
        on: getEnv(self).calls.event({ id, service }),
      });
    },
  }));
