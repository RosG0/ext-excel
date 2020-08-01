import {defaultStyles, defaultTitle} from '@/constants';
import {clone} from '@core/helper';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  stylesState: {},
  dataState: {},
  currentText: '',
  colState: {},
  currentStyles: defaultStyles,
  openedData: new Date().toJSON()
};
const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});

export function normalizeInitialState(state) {
  return state ? normalize : clone(defaultState);
}
