import {Page} from '@core/Page';
import {createStore} from '@core/createStore';
import {debounce, storage} from '@core/helper';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {rootReducer} from '@/redux/rootReducer';
import {normalizeInitialState} from '@/redux/initialState';

function storageName(param) {
  return `excel${param}`;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this._params ? this._params : Date.now().toString();

    const state = storage(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce((state) => {
      storage(storageName(params), state);
    }, 300);


    store.subscribe(stateListener);

    this._excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    });

    this._excel.getRoot();
  }

  afterRender() {
    this._excel.init();
  }
}
