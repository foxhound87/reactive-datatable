import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spinner } from './LoadingSpinner';

export default inject('$')(observer(({
  $,
  form,
  disabled = {},
  labels = {},
  controls = null,
}) => (
  <div>
    <div className="pt3">

      {(!controls || controls.onSubmit) &&
        (form.submitting || form.validating) ?
          <Spinner /> :
          <button
            type="submit"
            onClick={form.onSubmit}
            disabled={disabled.submit || form.submitting}
            className={$('button')({ medium: true, pill: true, disabled: disabled.submit })}
          >
            <b>{labels.submit || 'Submit'}</b>
          </button>}

      {(!controls || controls.onClear) &&
        <button
          type="button"
          onClick={form.onClear}
          disabled={disabled.clear}
          style={{ marginLeft: '0.5rem' }}
          className={$('button')({ medium: true, pill: true, disabled: disabled.clear })}
        >
          {labels.clear || 'Clear'}
        </button>}

      {(!controls || controls.onReset) &&
        <button
          type="button"
          onClick={form.onReset}
          disabled={disabled.reset}
          style={{ marginLeft: '0.5rem' }}
          className={$('button')({ medium: true, pill: true, disabled: disabled.reset })}
        >
          {labels.reset || 'Reset'}
        </button>}

    </div>

    {((!controls || controls.error) && form.hasError) &&
      <div className={$('globals').errorMessage}>
        <i>{form.error}</i>
      </div>}

  </div>
)));
