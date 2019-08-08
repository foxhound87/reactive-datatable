/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-undef */

const isClient = (typeof window !== 'undefined');

const Popup = isClient
  ? require('react-popup').default
  : null;


const registerPopupAsk = () =>
  Popup && Popup.registerPlugin('ask', function ({
    title,
    content,
    callback,
    confirmLabel = 'Confirm',
    confirmClass = null,
    cancelLabel = 'Cancel',
    cancelClass = null,
  }) {
    this.create({
      title,
      content,
      className: 'ask',
      buttons: {
        right: [{
          text: confirmLabel,
          className: confirmClass,
          action: () => ([
            callback(),
            Popup.close(),
          ]),
        }, {
          text: cancelLabel,
          className: cancelClass,
          action: () => Popup.close(),
        }],
      },
    });
  });

const registerPopupPopover = () =>
  Popup && Popup.registerPlugin('popover', function ({
    content,
    target,
  }) {
    this.create({
      content,
      className: 'popover',
      noOverlay: true,
      position: (box) => {
        const bodyRect      = document.body.getBoundingClientRect();
        const btnRect       = target.getBoundingClientRect();
        const btnOffsetTop  = btnRect.top - bodyRect.top;
        const btnOffsetLeft = btnRect.left - bodyRect.left;
        const scroll        = document.documentElement.scrollTop || document.body.scrollTop;

        box.style.top  = (btnOffsetTop - box.offsetHeight - 10) - scroll + 'px';
        box.style.left = (btnOffsetLeft + (target.offsetWidth / 2) - (box.offsetWidth / 2)) + 'px';
        box.style.margin = 0;
        box.style.opacity = 1;
      },
    });
  });

const registerPopupReveal = () =>
  Popup && Popup.registerPlugin('reveal', function ({
    content,
    target,
    callback,
  }) {
    this.create({
      content,
      className: 'reveal',
      noOverlay: true,
      buttons: {
        right: [{
          text: 'Copy',
          className: 'right',
          action: callback,
        }],
      },
      position: (box) => {
        const bodyRect      = document.body.getBoundingClientRect();
        const btnRect       = target.getBoundingClientRect();
        const btnOffsetTop  = btnRect.top - bodyRect.top;
        const btnOffsetLeft = btnRect.left - bodyRect.left;
        const scroll        = document.documentElement.scrollTop || document.body.scrollTop;

        box.style.top  = (btnOffsetTop - box.offsetHeight - 10) - scroll + 'px';
        box.style.left = (btnOffsetLeft + (target.offsetWidth / 2) - (box.offsetWidth / 2)) + 'px';
        box.style.margin = 0;
        box.style.opacity = 1;
      },
    });
  });

const registerPopupPlugins = () => ([
  registerPopupAsk(),
  registerPopupPopover(),
  registerPopupReveal(),
]);

export {
  Popup,
  registerPopupPlugins,
};
