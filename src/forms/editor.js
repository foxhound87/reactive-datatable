import Form from './_.extend';

const error = (form, err) => [
  // eslint-disable-next-line no-console
  console.error(err),
  form.invalidate(err.message),
];

export default ({
  plugins,
  bindings,
  item = null,
  collection = null,
  // store = null,
}) =>
  definitions =>
    new Form(definitions, {
      name: 'Editor',
      plugins,
      bindings,
      hooks: {
        onSuccess(form) {
          if (item) { // update
            return item.patch(form.values())
              .then(result => item.assign(result))
              .catch(err => error(form, err));
          }

          // create
          return collection.create(form.values())
            .then(() => form.clear())
            .catch(err => error(form, err));
        },
      },
    });
