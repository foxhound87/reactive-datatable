import { types as t } from 'mobx-state-tree';

export default t.model('SelectCollectionHandler', {
  $selected: t.optional(t.array(t.string), []),
})
  .actions(self => ({
    afterCreate() {
      // reselect item after page change
      if (!self.$selected) return;
      self.$selected.map(id =>
        self.data.filter((item) => {
          if (item.$id !== id) return null;
          // eslint-disable-next-line
          item.$selected = true;
          return null;
        }));
    },
    unselect() {
      self.$selected = []; // eslint-disable-line
      self.data.map(item => (item.$selected = false)); // eslint-disable-line
    },
    _push(id) {
      self.$selected.push(id);
    },
    _pull(id) {
      self.assign({
        $selected: self.$selected.filter(el => el !== id)
      });
    },
  }));
