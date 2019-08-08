import React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';

export default observer(({ value }) => (
  <span>{_.trim(value.join(', '), ',')}</span>
));
