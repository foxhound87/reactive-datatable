import { types as t } from 'mobx-state-tree';

export default t.model('SelectItemHandler', {
  $selected: t.optional(t.boolean, false),
})
  .actions(self => ({
    selected(flag) {
      // eslint-disable-next-line
      self.$selected = flag;
    },
  }));
