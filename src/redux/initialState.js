import {storage} from '@core/helper';
import {defaultStyles, defaultTitle} from "@/constants";

const defaultState = {
  title: defaultTitle,
  rowState: {},
  stylesState: {},
  dataState: {},
  currentText: '',
  colState: {},
  currentStyles: defaultStyles
};
const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});

export const initialState = storage('excelState') ?
  normalize(storage('excelState')) : defaultState;
