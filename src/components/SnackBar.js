import React, { PureComponent } from 'react';

export default class Snackbar extends PureComponent {
  message = '';

  state = {
    show: false,
  };

  showSnackBar = (message = 'Something went wrong...') => {
    this.message = message;

    this.setState({ show: true }, () => {
      setTimeout(() => this.setState({ show: false }), 3000);
    });
  }

  render() {
    const { show } = this.state;

    return (
      <div className={show
        ? ['datatable-snackbar', 'show'].join(' ')
        : 'datatable-snackbar'}
      >
        {this.message}
      </div>
    );
  }
}
