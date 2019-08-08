/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { inject } from 'mobx-react';
import copy from 'copy-to-clipboard';
import { Popup } from '../../../popup';

const isClient = (typeof window !== 'undefined');

export default inject('$')(
  class TypeReveal extends React.Component {

    revealButtonRef = React.createRef();

    copyToClipboard = () => ([
      copy(this.props.value),
      isClient && this.props.$('showSnackBar')('Copied'),
    ]);

    showPopupReveal = () => Popup
      .plugins()
      .reveal({
        content: this.props.value,
        target: this.revealButtonRef.current,
        callback: this.copyToClipboard,
      });

    render() {
      const { $, value } = this.props;

      return value && (
        <button
          type="button"
          className={$('button')({ pill: true })}
          ref={this.revealButtonRef}
          onClick={this.showPopupReveal}
          onMouseOut={this.onMouseOut}
        >
          <b style={{ fontSize: '18px' }}>&#8943;</b>
        </button>
      );
    }

  },
);
