import React from 'react';
import { observer } from 'mobx-react';

export default observer(
  class Select extends React.Component {

    constructor(props) {
      super(props);
      this.item = props.item;
      this.col = props.col;
      this.collection = props.collection;
    }

    toggleCheckbox = () => [
      this.item.selected(!this.item.$selected),
      this.item.$selected
        ? this.collection._push(this.item.$id)
        : this.collection._pull(this.item.$id),
    ];

    actionConditionCheck = () => {
      if (!this.col.condition) return true;
      return this.col.condition(this.item);
    };

    render() {
      return (
        this.actionConditionCheck() &&
          <input
            type="checkbox"
            checked={this.item.$selected}
            onChange={this.toggleCheckbox}
          />
      );
    }
  },
);
