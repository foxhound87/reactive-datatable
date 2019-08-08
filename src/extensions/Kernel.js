import { getEnv, types as t } from 'mobx-state-tree';

export default t.model('Kernel', {})
  .actions(self => ({
    env(key) {
      return getEnv(self)[key];
    },
  }));
