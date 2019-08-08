import { types as t } from 'mobx-state-tree';
import { createTransformer } from 'mobx-utils';

export default t.model('ViewHandler', {
  $visibleView: t.maybeNull(t.string),
})
  .views(self => ({
    isVisibleView: createTransformer(key =>
      (self.$visibleView !== null && self.$visibleView === key)),
  }))
  .actions(self => ({
    toggleView(view) {
      if (self.$visibleView === view) {
        // eslint-disable-next-line
        self.$visibleView = null;
        return;
      }
      // eslint-disable-next-line
      self.$visibleView = view;
    },
  }));
