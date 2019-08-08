import React from 'react';

import ActionDropdown from './ActionDropdown';
import ActionButtons from './ActionButtons';

import ItemCheckbox from './Checkbox';
import ItemTypeDate from './Type/TypeDate';
import ItemTypeString from './Type/TypeString';
import ItemTypeComputed from './Type/TypeComputed';
import ItemTypeIcon from './Type/TypeIcon';
import ItemTypeLink from './Type/TypeLink';
import ItemTypeButton from './Type/TypeButton';
import ItemTypeReveal from './Type/TypeReveal';
import ItemTypeList from './Type/TypeList';

export default (type, {
  extend = () => {},

  actionButtons = null,
  actionDropdown = null,

  item,
  value,
  column,
  collection,

}) => (Object.assign({

  actionDropdown: <ActionDropdown actions={actionDropdown} item={item} />,
  actionButtons: <ActionButtons actions={actionButtons} item={item} />,

  checkbox: <ItemCheckbox item={item} col={column} collection={collection} />,
  date: <ItemTypeDate item={item} col={column} value={value} />,
  icon: <ItemTypeIcon item={item} col={column} />,
  link: <ItemTypeLink item={item} col={column} />,
  button: <ItemTypeButton value={value} item={item} col={column} />,
  list: <ItemTypeList value={value} />,
  computed: <ItemTypeComputed item={item} col={column} />,
  reveal: <ItemTypeReveal value={value} />,
  string: <ItemTypeString value={value} />,

}, extend({

  item,
  value,
  column,
  collection,

})))[type];
