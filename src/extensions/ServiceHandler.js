import { getSnapshot, types as t } from 'mobx-state-tree';

import ServiceCalls from './ServiceCalls';
import ViewHandler from './ViewHandler';
import Kernel from './Kernel';

const ServiceHandler = t.model('ServiceHandler', {
  $id: t.maybeNull(t.string),
  $service: t.maybeNull(t.string),
  $query: t.frozen(),
  $params: t.frozen(),
})
  .views(self => ({
    get print() {
      return JSON.stringify(self, null, 2);
    },
  }))
  .actions(self => ({

    assign: data =>
      Object.assign(self, data),

    snapshot: () =>
      getSnapshot(self),

    log: (snapshot = false) =>
      console.log('Log', snapshot
        ? self.snapshot()
        : self),

  }));

export default t.compose(
  ServiceHandler,
  ServiceCalls,
  ViewHandler,
  Kernel,
);
