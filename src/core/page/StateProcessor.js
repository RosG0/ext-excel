import {debounce} from '@core/helper';

export class StateProcessor {
  constructor(saver, delay = 200) {
    this.listen = debounce(this.listen.bind(this), delay);
    this._client = saver;
  }

  listen(state) {
    this._client.save(state);
  }

  get() {
    return this._client.get();
  }
}
