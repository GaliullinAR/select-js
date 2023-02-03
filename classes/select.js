const getTemplate = () => {
  return `
    <div class="select__input">
      <span>Hello select</span> 
      <i class="fa-solid fa-caret-down"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        <li class="select__item">123</li>
        <li class="select__item">123</li>
        <li class="select__item">123</li>
        <li class="select__item">123</li>
        <li class="select__item">123</li>
        <li class="select__item">123</li>
      </ul>
    </div>
  `;
}

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