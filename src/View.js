import React from 'react';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import Dock from './components/Dock';

export default inject('$')(observer(
  // eslint-disable-next-line react/prefer-stateless-function
  class EditorComponent extends React.Component {

    omit = [
      '$service',
      '$loading',
      '$selected',
      '$query',
      '$params',
      '$visibleView',
    ];

    render() {
      const {
        omit = [],
        relation = null,
        item,
        isVisible,
        toggleView,
        $: $style,
      } = this.props;

      const $ = $style('view');
      const $item = relation ? item[relation] : item;
      const $loading = $item ? $item.$loading : null;
      const $id = $item ? $item.$id : null;
      const $service = relation || ($item && $item.env('service'));
      const $toggleView = item ? item.toggleView : toggleView;
      const $omit = this.omit.concat(omit);
      const $snapshot = $item ? _.omit($item.snapshot(), $omit) : null;

      const data = $snapshot ?
        Object.keys($snapshot)
          .map(key => ({
            key,
            val: _.isObject($snapshot[key])
              ? undefined
              : $snapshot[key],
          })) : [];

      return (
        <Dock
          position="bottom"
          loading={$loading}
          found={!!$item}
          id={$id}
          service={$service}
          toggleView={$toggleView}
          isVisible={isVisible}
          minSize={0.5}
          fluid
        >
          {data.length &&
            <div className={$.container}>
              <table className={$.table} cellSpacing="0">
                <tbody className={$.tbody}>
                  {data.map(el => (
                    <tr key={el.key}>
                      <td className={$.cells.left}>{el.key}</td>
                      <td className={$.cells.right}>{el.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>}
        </Dock>
      );
    }
  },
));
