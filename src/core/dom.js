class Dom {
  constructor(selector) {
    this._element = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this._element.innerHTML = html;
      return this;
    }
    return this._element.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node._element;
    }
    this._element.appendChild(node);

    return this;
  }

  closest(selector) {
    return $(this._element.closest(selector));
  }

  getCoords() {
    return this._element.getBoundingClientRect();
  }

  css(style, value= null) {
    if (typeof style === 'string' && value) {
      this._element.style[style] = value;
    } else if (typeof style === 'object') {
      Object.keys(style).forEach((styleName) => {
        this._element.style[styleName] = style[styleName];
      });
    }
  }

  getData(field) {
    return this._element.dataset[field];
  }
  findAll(selector) {
    return this._element.querySelectorAll(selector);
  }
  find(selector) {
    return $(this._element.querySelector(selector));
  }
  addClass(className) {
    this._element.classList.add(className);
  }
  removeClass(className) {
    this._element.classList.remove(className);
  }
  text(text) {
    if (typeof text === 'string') {
      this._element.textContent = text;
      return this;
    } else {
      if (this._element.tagName.toLowerCase() === 'input') {
        return this._element.value.trim();
      }
      return this._element.textContent.trim();
    }
  }
  focus() {
    this._element.focus();
    return $(this._element);
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: parsed[0],
        col: parsed[1]
      };
    }
    return this.getData('id');
  }

  on(eventType, callback) {
    this._element.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this._element.removeEventListener(eventType, callback);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes) => {
  const element = document.createElement(tagName);

  if (classes) {
    element.classList.add(classes);
  }

  return $(element);
};
