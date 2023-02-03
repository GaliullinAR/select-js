export class Select {
  constructor(selector, options) {
    this.selector = document.querySelector(selector);
    this.options = options;
  }

  open() {
    this.selector.classList.add('open');
    if (this.selector.classList.contains('open')) return true;
    return false;
  }

  close() {
    this.selector.classList.remove('open');
    if (!this.selector.classList.contains("open")) return true;
    return false;
  }
}