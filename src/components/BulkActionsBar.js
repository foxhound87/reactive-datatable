/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { observer, inject } from 'mobx-react';
import ActionButtons from './ListItems/ActionButtons';

export default inject('$')(observer(
  class BulkActionBar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        menuIsOpen: false,
      };
    }

    toggleBulkActions = () =>
      this.setState({ menuIsOpen: !this.state.menuIsOpen });

    render() {
      const { $: $style, collection, actions } = this.props;
      const { menuIsOpen } = this.state;
      const $ = $style('actions').bulkActionBar;

      return (
        <div className={$.container}>
          {menuIsOpen &&
            <div className={$.buttons.mobile}>
              <ActionButtons
                type="mobile"
                actions={actions}
                item={collection}
                align="tr"
              />
            </div>}
          <nav className={$.main}>
            <div className={$.left}>
              <span className={$.selected}>
                {collection.$selected.length}
              </span>
              Selected
            </div>
            <div className={$.right}>
              <div className={$.buttons.desktop}>
                <ActionButtons
                  actions={actions}
                  item={collection}
                  align="tr"
                />
              </div>
              <div
                className={$.toggle}
                onClick={this.toggleBulkActions}
              >
                {menuIsOpen
                  ? 'Hide Bulk Actions'
                  : 'Show Bulk Actions'}
              </div>
            </div>
          </nav>
        </div>
      );
    }
  },
));

