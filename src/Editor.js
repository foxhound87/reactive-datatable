/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { observer, inject } from 'mobx-react';
import { reaction } from 'mobx';
import _ from 'lodash';

import { Spinner } from './components/LoadingSpinner';
import Dock from './components/Dock';
import EditorForm from './forms/editor';
import { hook } from './forms/utils';

const isDisabledSubmit = form =>
  (form.submitting || form.validating);

const makeLabels = $values =>
  _.transform($values, (result, val, key) =>
    (Object.assign(result, {
      [key]: key,
    })), {});

const FieldSwitch = (type, {

  extend = () => {},
  collection,
  store,
  form,
  field,

}) => extend({

  collection,
  store,
  form,
  field,

})[type];

export default inject('$')(observer(
  // eslint-disable-next-line react/prefer-stateless-function
  class EditorComponent extends React.Component {

    componentWillMount() {
      // eslint-disable-next-line object-curly-newline
      const { mode, item, store, name, components } = this.props;

      this.form = null;
      this.components = components ||
        (store.extensions ? store.extensions.editorSwitch : null);

      const plugins = store.extensions ? store.extensions.plugins : null;
      const bindings = store.extensions ? store.extensions.bindings : null;
      const form = store.collections[name].form({ store });
      const collection = store.collections[name].data;

      // form[0] // fields definitions
      // form[1] // callback function

      if (!item || mode === 'new') {
        // create mode

        this.form = EditorForm({
          collection,
          store,
          plugins,
          bindings,
        }, form[1])
          .apply(null, [
            form[0],
          ]);

        form[1].apply(null, [{
          form: this.form,
          hook: hook(this.form),
          item: null,
          collection,
        }]);

        const labels = makeLabels(this.form.values());
        this.form.set('label', labels);
        return; // exit
      }

      // edit mode

      this.makeEditorForm = EditorForm({
        collection,
        store,
        item,
        plugins,
        bindings,
      });

      const values = form[0].fields
        ? _.pick(item.snapshot(), form[0].fields)
        : undefined;

      const labels = makeLabels(values);

      Object.assign(form[0], {
        values,
        labels,
        placeholders: labels,
      });

      this.disposeReaction = reaction(
        () => item.$visibleView,
        ($visibleView) => {
          if ($visibleView !== 'showEditor') {
            this.form = null;
            return;
          }

          this.form = this.makeEditorForm(form[0]);

          form[1].apply(null, [{
            form: this.form,
            hook: hook(this.form),
            collection,
            item,
          }]);
        // eslint-disable-next-line function-paren-newline
        }, { fireImmediately: true });
    }

    componentWillUnmount() {
      if (this.disposeReaction) {
        this.disposeReaction();
      }
    }

    render() {
      // eslint-disable-next-line object-curly-newline
      const { $, service, isVisible, toggleView, item, store, name } = this.props;
      const collection = store.collections[name].data;
      const $toggleView = toggleView || item.toggleView;
      const $service = item ? (item.$service || item.env('service')) : service;
      const $id = item ? item.$id : null;

      return (
        <Dock
          showMobileId
          position="left"
          size={480}
          fluid={false}
          isVisible={isVisible}
          toggleView={$toggleView}
          service={$service}
          id={$id}
        >
          {(this.form && _.has(this.form, 'state')) &&
          <form>
            <div className={$('editor').content}>
              {this.form && this.form.map(field =>
                FieldSwitch(field.type, {
                  extend: this.components,
                  form: this.form,
                  collection,
                  store,
                  field,
                }))}
            </div>

            <div className={$('editor').controls.main}>
              {(this.form.hasError && this.form.error) &&
                <div className={$('editor').controls.error}>
                  {this.form.error}
                </div>}

              {(this.form.submitting || this.form.validating) &&
                <span className={$('editor').controls.loading}>
                  <Spinner />
                </span>}

              <div className={$('editor').controls.buttons}>
                <button
                  type="button"
                  onClick={this.form.onClear}
                  style={{ marginRight: '0.25rem' }}
                  className={$('button')({
                    medium: true,
                    rounded: true,
                    theme: 'gray',
                  })}
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={this.form.onReset}
                  style={{ marginRight: '0.25rem' }}
                  className={$('button')({
                    medium: true,
                    rounded: true,
                    theme: 'gray',
                  })}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className={$('button')({
                    medium: true,
                    rounded: true,
                  })}
                  disabled={isDisabledSubmit(this.form)}
                  onClick={this.form.onSubmit}
                >
                  &#10004; Submit
                </button>
              </div>
            </div>
          </form>}
        </Dock>
      );
    }
  },
));
