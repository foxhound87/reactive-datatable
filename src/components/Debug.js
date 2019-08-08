import React from 'react';
import { observer } from 'mobx-react';

const isProd = process.env.NODE_ENV === 'production';

export default observer(({ data, always = false }) =>
  (!isProd || always) &&
    <pre className="overflow-x-auto pa4 ma0">
      {data.print}
    </pre>);
