/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import { inject } from 'mobx-react';

export default inject('$')(
  class Select extends React.Component {

    constructor(props) {
      super(props);
      this.state = { isOpen: false };
    }

    toggle = e => [
      e.preventDefault(),
      this.setState({ isOpen: !this.state.isOpen }),
    ];

    close = e => [
      e.preventDefault(),
      this.setState({ isOpen: false }),
    ];

    render() {
      const { isOpen } = this.state;
      const { $: $style, actions, item } = this.props;
      const $ = $style('actions');

      return (
        <div className="relative tr z-99" onMouseLeave={this.close}>
          <div onClick={this.toggle} className={$.dropdownButton}>&#9662;</div>
          {isOpen && <ul className={$.dropdownContainer}>
            {actions && actions.map(action =>
              (!action.condition || (action.condition && action.condition(item))) ?
                <li
                  key={action.key}
                  data-place="top"
                  data-tip={!action.label ? action.tooltip : null}
                  onClick={action.handler && action.handler(item)}
                  className={$.dropdownActionButton}
                >
                  {(typeof action.icon === 'function')
                    ? action.icon()
                    : action.icon}

                  {(!action.tooltip) && action.label}
                </li>
                : null)}
          </ul>}
        </div>
      );
    }
  },
);
