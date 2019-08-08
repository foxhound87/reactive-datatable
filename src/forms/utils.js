/* eslint-disable import/prefer-default-export */

const hook = form => ($hook, $cb) =>
  Object.assign(form.$hooks, {
    [$hook]: $form => $cb($form),
  });

export {
  hook,
};
