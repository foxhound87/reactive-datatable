import _ from 'lodash';
import Form from './_.extend';

const checkUseRegex = value =>
  _.isString(value)
    ? { $regex: value }
    : value;

const makeFilters = (links = {}, values, type) =>
  Object.keys(values).reduce((obj, key) =>
    Object.assign(obj,
      (type === 'filter') && { filter: { [links[key] ? links[key] : key]: values[key] } },
      (type === 'query') && { [links[key] ? links[key] : key]: checkUseRegex(values[key]) }), {});


const hooks = (store, links) => ({
  onSuccess($form) {
    const values = $form.values();

    return store
      .data
      .filter({
        query: makeFilters(links, values, 'query'),
        params: makeFilters(links, values, 'filter'),
      });
  },
  onReset() {
    return store
      .data
      .filter(null, null);
  },
});

export default ({
  plugins,
  bindings,
  filters,
  store,
}) =>
  new Form(filters.form, {
    plugins,
    bindings,
    name: 'Filters',
    hooks: hooks(store, filters.link),
    options: {
      retrieveOnlyDirtyValues: true,
    },
  });
