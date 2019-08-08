import _ from 'lodash';

import {
  decorate,
  observable,
  action,
  computed,
} from 'mobx';

const isClient = (typeof window !== 'undefined');

const assignServiceCallsMethods = ($this, $calls, $model = null) =>
  ['on', 'load', 'find', 'get', 'create', 'update', 'patch', 'remove']
    // eslint-disable-next-line
    .map(method => $this[method] = ((
      $model && $model[method]) ||
      $this[method] ||
      ($calls[method] && $calls[method]($this))
    ));

export default class Service {

  id = 'id'; // default id field

  calls = null; // service calls

  type = null; // 'item' or 'collection'

  service = null; // service name

  model = null; // mst model instance

  table = null; // table schema

  form = null; // form schema

  params = {}; // initial service params

  query = {}; // initial service query

  data = null; // model data

  setup(opt) {
    this.type = opt.type;
    this.service = opt.service;
    this.model = opt.model;
    this.table = opt.table;
    this.form = opt.form;
    this.query = opt.query;
    this.params = opt.params;
    this.calls = this.serviceCalls();

    if (!this.calls) {
      throw new Error('No Service Calls Implemented');
    }

    if (this.data || this.type === 'collection') {
      this.make(this.data || {}, false);
      return;
    }

    assignServiceCallsMethods(this, this.calls);
  }

  get isEmpty() {
    return (!this.data || _.isEmpty(this.data)) ||
      (!this.data.data || _.isEmpty(this.data.data));
  }

  assign(result = {}, unique = true) {
    const $result = (unique && this.type === 'item')
      ? result.data[0]
      : result;

    if (!$result) return null;

    return Object.assign({
      $service: result.service || this.service,
      $query: this.query,
      $params: this.params,
    }, $result);
  }

  make(result = {}, unique = false) {
    if (_.isEmpty(result) && this.type === 'item') return this.data;
    const data = this.assign.apply(this, [result, unique]);
    if (!data) return null;

    const model = this.model.create(data, {
      service: this.service,
      calls: this.calls,
      id: this.id,
    });

    assignServiceCallsMethods(this, this.calls, model);

    this.data = model;
    return this.data;
  }

  load(query = {}, params = {}) {
    const unique = (this.type === 'item');
    return this.calls.find(this)
      .apply(this, [query, params])
      .then(result => this.make.apply(this, [result, unique]))
      .catch(err => ([
        console.error(err), // eslint-disable-next-line
        isClient && alert('Error: ' + err.message),
      ]));
  }

  save(values) {
    if (this.type !== 'item') {
      throw new Error('Cannot use save() on collections.');
    }

    // update or create
    const promise = this.isEmpty
      ? this.create(values)
      : this.patch(values);

    return promise
      .then(result => this.make.apply(this, [result]));
  }
}

decorate(Service, {
  data: observable,
  isEmpty: computed,
  make: action,
  load: action,
});
