import React from 'react';
import { observer, inject } from 'mobx-react';
import cx from 'classnames';

const ActionSwitch = inject('$')(observer(({
  $,
  item,
  action,
  type = null,
}) => {
  switch (type || action.type) {

    case 'button':
      return (
        <button
          type="button"
          data-place="top"
          data-tip={!action.label ? action.tooltip : null}
          onClick={action.handler && action.handler(item)}
          style={{ marginLeft: '0.5rem' }}
          className={cx($('button')({
            theme: action.theme,
            rounded: true,
            type: 'small',
          }), action.classes && action.classes(item))}
        >
          {(typeof action.icon === 'function')
            ? action.icon()
            : action.icon}

          {(!action.tooltip) && action.label}
        </button>
      );

    case 'mobile':
      return (
        <button
          type="button"
          className={$('actions').mobileButtons}
        >
          {(typeof action.icon === 'function')
            ? action.icon()
            : action.icon}

          {(!action.tooltip) && action.label}
        </button>
      );

    default:
      return null;
  }
}));


export default observer(({
  actions,
  item = null,
  type = null,
  align = 'tr',
}) => (
  <div className={align}>
    {actions && actions.map(action =>
      (!action.condition ||
        (action.condition && action.condition(item))) ?
          <ActionSwitch
            type={type}
            key={action.key}
            item={item}
            action={action}
          /> : null)}
  </div>
));
