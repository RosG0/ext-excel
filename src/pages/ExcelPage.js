import {Page} from '@core/page/Page';
import {createStore} from '@core/store/createStore';
import {storage} from '@core/helper';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {rootReducer} from '@/redux/rootReducer';
import {normalizeInitialState} from '@/redux/initialState';
import {StateProcessor} from '@core/page/StateProcessor';

function storageName(param) {
  return `excel:${param}`;
}

class LocalStorageClient {
  constructor(name) {
    this._name = storageName(name);
  }

  save(state) {
    storage(this._name, state);
    return Promise.resolve();
  }

  get() {
    return Promise.resolve(storage(this._name));
  }
}

export class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this._storeSub = null;
    this._processor = new StateProcessor(
        new LocalStorageClient(this._params)
    );
  }

  async getRoot() {
    const state = await this._processor.get();
    const store = createStore(rootReducer, normalizeInitialState(state));

    this._storeSub = store.subscribe(this._processor.listen);

    this._excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    });

    return this._excel.getRoot();
  }

  afterRender() {
    this._excel.init();
  }

  destroy() {
    this._storeSub();
  }
}
