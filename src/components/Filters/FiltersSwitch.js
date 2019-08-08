import React from 'react';
import { observer } from 'mobx-react';

import FormControls from '../FormControls';

const FilterSwitch = (type, {
  extend = () => {},
  collection,
  store,
  form,
  field,
}) => (Object.assign({

  join: field.map(filter =>
    <FilterSwitch
      key={filter.name}
      type={filter.type}
      field={form.$(filter.path)}
      form={form}
    />),

}, extend({

  collection,
  store,
  form,
  field,

})))[type];

export default observer(({
  filterComponentSwitch,
  collection,
  store,
  form,
}) => (
  <form>
    <div className="cf pv3 pv4-ns ph3 ph4-ns bg-washed-blue bb b--near-white f3-ns f4">
      Filters
    </div>
    <div className="pa3 w5 mw6">
      {form.map(field => FilterSwitch(field.type, {
        extend: filterComponentSwitch,
        field: form.$(field.name),
        collection,
        store,
        form,
      }))}
    </div>
    <div className="tc">
      <FormControls
        small
        form={form}
        controls={{ onSubmit: true, onReset: true }}
        labels={{ submit: 'Filter' }}
      />
      <p className="red">{form.error}</p>
    </div>
  </form>
));
