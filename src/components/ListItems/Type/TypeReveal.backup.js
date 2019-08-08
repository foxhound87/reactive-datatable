/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { inject } from 'mobx-react';
import copy from 'copy-to-clipboard';
import cx from 'classnames';

const isClient = (typeof window !== 'undefined');

const copyToClipboard = ($, data) => e => ([
  e.preventDefault(),
  copy(data),
  // eslint-disable-next-line no-alert no-undef
  isClient && $('showSnackBar')('Copied'),
]);

const Button = ({
  children,
  isShowBtn = false,
  isCopyBtn = false,
  show = false,
  onClick = undefined,
  onMouseOver = undefined,
  onMouseOut = undefined,
}) => (
  <span
    className={cx('dn h2 ph2 hover-bg-light-blue pointer v-mid', {
      'br b--light-blue': show && isCopyBtn,
      'br2 br--left': show && isShowBtn,
      'dib': show,
    })}
    onClick={onClick}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
  >
    {children}
  </span>
);

export default inject('$')(
  class TypeReveal extends React.Component {

    constructor(props) {
      super(props);
      this.state = { isHover: false };
    }

    onMouseOver = () => this.setState({ isHover: true });
    onMouseOut = () => this.setState({ isHover: false });
    onClick = () => this.setState({ isHover: !this.state.isHover });

    render() {
      const { $, value } = this.props;
      const { isHover } = this.state;

      // console.log({ showSnackBar: $('showSnackBar')('test') });

      return value && (
        <span className="relative z-1">
          <span
            className={cx('b mt2 h2 br2 ba b--light-blue bg-white absolute top-0 left-1 dib v-mid', {
              'shadow-4': isHover,
            })}
          >
            <Button
              show
              isShowBtn
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
            >
              <div style={{ lineHeight: '2.2em' }}>&#8943;</div>
            </Button>
            <Button
              isCopyBtn
              show={isHover}
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
              onClick={copyToClipboard($, value)}
            >
              <div style={{ lineHeight: '2.2em' }}>COPY</div>
            </Button>
            <span
              onMouseOut={this.onMouseOut}
              className={cx('dn b ph2', {
                dib: isHover,
              })}
            >
              {value}
            </span>
          </span>
        </span>
      );
    }

  },
);
