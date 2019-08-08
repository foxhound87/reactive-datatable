import React from 'react';
import { observer, inject } from 'mobx-react';
import Dock from 'react-dock';
import LoadingOrNotFound from './LoadingOrNotFound';

const isClient = (typeof window !== 'undefined');
const mql = isClient && window.matchMedia('(max-width: 480px)'); // eslint-disable-line

export default inject('$')(observer(
  class DockComponent extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        isMobile: mql.matches,
        size: 0.5,
      };

      this.mediaQueryChanged = this.mediaQueryChanged.bind(this);

      const { position, size, fluid } = this.props;

      if (position === 'left' || position === 'right') {
        this.state = {
          size: (!fluid && size > window.innerWidth)
            ? window.innerWidth
            : size,
        };
      }
    }

    componentWillMount() {
      if (isClient) mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
      if (isClient) mql.removeListener(this.mediaQueryChanged);
    }

    onSizeChange = size =>
      (this.props.fluid && size >= (this.props.minSize || 0.33)) &&
        this.setState({ size });

    handleClose = toggleView => e => ([
      e.preventDefault(),
      toggleView(),
    ]);

    mediaQueryChanged = () =>
      this.setState({ isMobile: mql.matches });

    checkIsMobile = () =>
      (mql.matches || this.state.isMobile);

    renderIdBar({ id, style }) {
      return (
        <span className={style.container}>
          <b className={style.icon}>ID</b>
          <b className={style.value}>{id}</b>
        </span>
      );
    }

    render() {
      const {
        loading = false,
        found = true,
        showMobileId = false,
        fluid = true,
        position = 'bottom',
        toggleView,
        children,
        isVisible,
        service,
        id,
        $: $theme,
      } = this.props;

      const $ = $theme('dock');

      return (
        <Dock
          onSizeChange={this.onSizeChange}
          fluid={fluid}
          position={position}
          isVisible={isVisible}
          size={this.state.size}
          zIndex={999}
          // dimStyle={{}}
          // dockStyle={{
          //   background: 'none',
          //   boxShadow: 'none',
          // }}
        >
          <div style={{ minWidth: '5em' }}>
            <div className={$.bar.main}>
              <div className={$.bar.left}>
                <span className={$.bar.name}>
                  {service}
                </span>
                {(id && !this.checkIsMobile()) &&
                  <span className={$.bar.id.desktop.main}>
                    {this.renderIdBar({ id, style: $.bar.id.desktop })}
                  </span>}
              </div>
              <div className={$.bar.right}>
                <button
                  onClick={this.handleClose(toggleView)}
                  className={$.bar.close}
                  type="button"
                >
                  &#10008;
                </button>
              </div>
            </div>
            {(id && showMobileId && this.checkIsMobile()) &&
              <div className={$.bar.id.mobile.main}>
                {this.renderIdBar({ id, style: $.bar.id.mobile })}
              </div>}
          </div>

          {!found ?
            <div className="pa5">
              <LoadingOrNotFound loading={loading} />
            </div> :
            <div className={$.content}>
              {children}
            </div>}

        </Dock>
      );
    }
  },
));
