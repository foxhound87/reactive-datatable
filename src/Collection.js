import React from 'react';
import { Provider, observer } from 'mobx-react';
import List from './components/List';

import $theme from './styles/theme';
import FiltersForm from './forms/filters';

export default observer(
  class Collection extends React.Component {

    snackBarRef = React.createRef();

    constructor(props) {
      super(props);

      this.state = {
        showNew: false,
        showFilters: false,
      };

      this.extensions = props.store.extensions;
      this.collection = props.store.collections[props.name];
      this.table = this.collection.table(props.store);

      this.editorComponentSwitch = this.extensions ? this.extensions.editorSwitch : null;
      this.filterComponentSwitch = this.extensions ? this.extensions.filterSwitch : null;
      this.cellComponentSwitch = this.extensions ? this.extensions.cellSwitch : null;

      const plugins = this.extensions ? this.extensions.plugins : null;
      const bindings = this.extensions ? this.extensions.bindings : null;

      if (this.table.filters) {
        this.filtersForm = FiltersForm({
          store: this.collection,
          filters: this.table.filters,
          plugins,
          bindings,
        });
      }
    }

    showSnackBar = message =>
      this.snackBarRef.current.showSnackBar(message);

    toggleNew = () => this.setState({
      showNew: !this.state.showNew,
    });

    toggleFilters = () => this.setState({
      showFilters: !this.state.showFilters,
    });

    render() {
      const {
        theme = {},
        header,
        store,
        name,
        filters,
        title,
        notFound,
      } = this.props;

      Object.assign(theme, {
        showSnackBar: this.showSnackBar,
      });

      const {
        showNew,
        showFilters,
      } = this.state;

      return (
        <Provider $={$theme(theme)}>
          <List
            cellComponentSwitch={this.cellComponentSwitch}
            filterComponentSwitch={this.filterComponentSwitch}
            editorComponentSwitch={this.editorComponentSwitch}
            HeaderExtended={header}
            toggleNew={this.toggleNew}
            toggleFilters={this.toggleFilters}
            filtersForm={this.filtersForm}
            model={this.collection}
            collection={this.collection.data}
            table={this.table}
            showNew={showNew}
            showFilters={showFilters}
            store={store}
            name={name}
            filters={filters}
            title={title}
            notFound={notFound}
            snackBarRef={this.snackBarRef}
          />
        </Provider>
      );
    }
  },
);
