export default ({
  background, zIndex,
}) => ({
  root: {
    zIndex,
    position: 'fixed',
    right: 'auto',
    bottom: 'auto',
    overflow: 'visible',
  },
  sidebar: {
    position: 'fixed',
    background,
  },
  content: {
    left: 'auto',
    bottom: 'auto',
    overflow: 'visible',
  },
  overlay: {

  },
  dragHandle: {
    zIndex: 1,
    position: 'fixed',
    top: '0px',
    bottom: '0px',
  },
});
