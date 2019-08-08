import { paramsForServer } from 'feathers-hooks-common';

const find = (service, auth) => self =>
  ($query = {}, $params = {}) => {
    let query = $query;
    delete query.$client;

    query = {
      ...query,
      $client: {
        ...$params,
      },
    };

    return auth().then(() => service(self.service)
      .find(paramsForServer({ query })));
  };

const get = (service, auth) => self => (id = null, params = {}) =>
  auth().then(() => service(self.service)
    .get(id, paramsForServer(params)));

const create = (service, auth) => self => (data, params = {}) =>
  auth().then(() => service(self.service)
    .create(data, paramsForServer(params)));

const update = (service, auth) => self => (data = null, params = {}) =>
  auth().then(() => service(self.service)
    .update(self.id, data, paramsForServer(params)));

const patch = (service, auth) => self => (data = null, params = {}) =>
  auth().then(() => service(self.service)
    .patch(self.id, data, paramsForServer(params)));

const remove = (service, auth) => self => (params = {}) =>
  auth().then(() => service(self.service)
    .remove(self.id, paramsForServer(params)));

const event = (service, auth) => self => (on, cb) =>
  auth().then(() => service(self.service).on(on, cb));

export default ({
  service, auth,
}) => ({
  find: find(service, auth),
  get: get(service, auth),
  create: create(service, auth),
  update: update(service, auth),
  patch: patch(service, auth),
  remove: remove(service, auth),
  event: event(service, auth),
});
