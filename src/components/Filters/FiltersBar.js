import React from 'react';
import { observer } from 'mobx-react';
import Sidebar from 'react-sidebar';
import styles from '../../styles/sidebar.fixed';
import FiltersSwitch from './FiltersSwitch';

const $styles = styles({
  background: '#fff',
  zIndex: '999',
});

const renderFilterSwitch = props =>
  new FiltersSwitch(props).render();

export default observer(
  class FiltersBar extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        open: props.open,
      };
    }

    render() {
      const { showFilters, toggleFilters } = this.props;

      return (
        <Sidebar
          sidebar={renderFilterSwitch(this.props)}
          open={showFilters}
          onSetOpen={toggleFilters}
          styles={$styles}
          docked={false}
          pullRight
          touch
        >
          {''}
        </Sidebar>
      );
    }
  },
);
