import React from 'react';
import { observer, inject } from 'mobx-react';
import { reaction } from 'mobx';
import { Popup } from './popup';

export default inject('$')(observer(
  // eslint-disable-next-line react/prefer-stateless-function
  class DeleteComponent extends React.Component {

    componentWillMount() {
      const { item } = this.props;

      this.disposeReaction = reaction(
        () => item.$visibleView,
        // eslint-disable-next-line no-unused-vars
        ($visibleView) => {
          if (!$visibleView) return;

          item.assign({
            $visibleView: null,
          });

          this.showPopupAsk();

        // eslint-disable-next-line function-paren-newline
        }, { fireImmediately: true });
    }

    componentWillUnmount() {
      if (this.disposeReaction) {
        this.disposeReaction();
      }
    }

    delete = () => {
      const { $, item } = this.props;
      this.disposeReaction();
      item.delete()
        .then(() => $('showSnackBar')('Deleted'));
    }

    showPopupAsk = () => Popup
      .plugins()
      .ask({
        title: 'Delete?',
        content: [
          // eslint-disable-next-line react/destructuring-assignment
          'ID', this.props.item.$id,
          'Are you sure to delete this resouce? This action can not be undone.',
        ].join(' - '),
        callback: this.delete,
        confirmLabel: 'Delete',
        confirmClass: 'delete',
      });

    render() {
      return null;
    }
  },
));
