export const globals = {
  main: 'bg-white',
  link: 'link underline pointer blue hover-navy',
  errorMessage: 'red m2 pt4',
  loading: 'tc ph3 pv5',
  notFound: 'tc mv0 ph3 pv5',
};

export const buttons = {
  base: 'link ba pointer bg-animate bg-transparent',
  active: 'link pointer bn white bg-blue',

  normal: 'f6',
  icon: 'f6 ph3 pv2',

  fullwidth: 'db w-100 ',

  disabled: 'b--grey grey hover-bg-grey',
  generic: 'br2',
  pill: 'br-pill',
  rounded: 'br2',

  types: {
    small: 'ph2 pv1 f7 b ttu',
    medium: 'ph3 pv2 f6 b ttu',
    big: 'ph4 pv3 f3',

    smallResp: 'ph2-ns pv2-ns f7 b ttu',
    mediumResp: 'ph3-ns pv1 pv2-ns f6 b ttu',
    bigResp: 'ph4-ns pv3-ns f3 b ttu',
  },

  themes: {
    gray: 'ba gray bg-white hover-bg-light-blue hover-white',
    blue: 'bn white bg-light-blue hover-bg-blue hover-white',
    green: 'bn white bg-green hover-bg-dark-green',
    bgBlue: 'bn white bg-blue hover-bg-dark-blue',
    lightRed: 'bn white bg-light-red hover-bg-red',
    lightBlue: 'bn white bg-light-blue hover-bg-blue',
    lightestBlue: 'bn blue bg-lightest-blue hover-bg-light-blue hover-white',
  },
};

export const actions = {
  dropdownContainer: 'absolute db br2 ma0 pa0 right-0 bt bl b--light-gray bg-white shadow-4 z-999',
  dropdownButton: 'link b ba dib pointer bg-animate ph2 pv1 f7 br2 bn black bg-light-gray hover-bg-lightest-blue',
  dropdownActionButton: 'pointer f7 ttu b db m0 ph3 pv2 tl z-9999 bb gray hover-white b--light-gray bg-white bg-animate hover-bg-light-blue',
  mobileButtons: 'db w-100 pv2 ph3 mv3 dark-gray bg-white hover-bg-near-white ba b--moon-gray br2',
  bulkActionBar: {
    container: 'z-4 bg-white fixed pb5 bottom-0 left-0 right-0 shadow-5 pt1 pb1 bt b--light-gray',
    main: 'dt w-100 center',
    left: 'dtc v-mid pb2-ns pt3 ph4 w-10 b green',
    right: 'dtc v-mid pb2-ns pt3 ph4 w-90 tr',
    selected: 'f6 b br-pill white bg-green ph3 pv1 mr2',
    toggle: 'dn-ns pointer tc f5 db br2 link dim ph2 pv1 dib mid-gray',
    buttons: {
      mobile: 'dn-ns mh3',
      desktop: 'dn db-ns',
    },
  },
};

export const header = {
  main: 'cf pv3 pv4-ns ph3 ph4-ns bg-washed-blue bb b--near-white',
  title: 'fl w-40 f3 f2-ns',
  buttons: 'fl w-60 tr f3 mt1-ns',
};

export const table = {
  container: 'nowrap overflow-x-auto',
  main: 'w-100 center pb5',
  head: {
    row: '',
    cell: 'f6 fw6 ttu bb gray b--light-gray tl ph3 pt4 pb3 bg-white',
    first: 'pl3 pl4-ns',
    sort: 'hover-blue pointer',
  },
  body: {
    row: 'f6 hover-bg-washed-blue',
    cell: 'pa3 bb b--near-white',
    first: 'pl3 pl4-ns',
  },
};

export const pagination = {
  container: 'dt w-100 center f5-ns f6 z-5 pt1-ns pb1-ns fixed bottom-0 left-0 right-0 bt b--light-gray bg-white-80',
  left: 'dtc v-mid pv2 pl2 pl4-ns w5-ns w-40 b',
  center: 'dtc v-mid pv2 ph3-ns ph2 w5-ns w-30 tc-ns tr b',
  right: 'dtc v-mid pv2 pr2 pr4-ns w5-ns w-20 tr',
  pages: 'di-ns tl tc-ns',
  buttons: {
    left: 'dib',
    right: 'dib',
  },
};

export const dock = {
  content: 'mt4',
  bar: {
    main: 'dt f6 w-100 center absolute bg-near-white dark-gray bb b--moon-gray z-999',
    left: 'dtc pa1 v-mid w6 tl',
    right: 'dtc pa1 v-mid w6 tr',
    name: 'ph3 pv1 br1 bg-blue white b ttu',
    close: 'link ph3 pv1 bn f5 br1 white bg-blue hover-bg-dark-blue',
    id: {
      desktop: {
        main: '',
        container: 'ml1 pv1 br1 white bg-light-silver tracked',
        icon: 'ph2 pv1 br b--white',
        value: 'ph2 pv1',
      },
      mobile: {
        main: 'pt5 pb3 tc-ns bg-light-gray',
        container: 'br1 pl3 gray tracked',
        icon: 'pl2 pr1 pv1 br2 bg-moon-gray mid-gray',
        value: 'ph2 pv1',
      },
    },
  },
};

export const editor = {
  content: 'ma3 ma5-ns',
  controls: {
    main: 'cf w-100 center absolute bg-near-white dark-gray bt b--moon-gray bottom-0 left-0 right-0',
    error: 'tc pa3 v-mid w6 b bg-light-red white',
    loading: 'fl mt2 ml2',
    buttons: 'fr pa1 v-mid w6 tr',
  },
};

export const view = {
  container: 'pa4',
  table: 'f6 w-100 mw8 center',
  tbody: 'lh-copy',
  cells: {
    left: 'pv3 pr3 bb b--black-20 b',
    right: 'pv3 pr3 bb b--black-20',
  },
};
