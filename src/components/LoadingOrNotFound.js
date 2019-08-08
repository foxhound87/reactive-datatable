import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spinner } from './LoadingSpinner';

export default inject('$')(observer(({
  $, loading, notFound = null,
}) => (
  <div>
    {loading ?
      <div className={$('globals').loading}>
        <Spinner />
      </div> :
      <h4 className={$('globals').notFound}>
        {notFound || 'NO ITEMS FOUND'}
      </h4>}
  </div>
)));
