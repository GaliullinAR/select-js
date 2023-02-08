const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'Placeholder по умолчанию';

  const items = data.map(item => {
    let cls = '';
    if (item.id === selectedId) {
      text = item.value;
      cls = 'selected';
    }

    return `
      <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>    
    `;
  })

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="value">${text}</span> 
      <i class="fa-solid fa-caret-down" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join('')}
      </ul>
    </div>
  `;
}

export class Select {
  constructor(selector, options) {
    this.selector = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.#render();
    this.#setup();
  }

  #render() {
    const { placeholder, data } = this.options;
    this.selector.classList.add('select');
    this.selector.insertAdjacentHTML('beforeend', getTemplate(data, placeholder, this.selectedId));
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.selector.addEventListener('click', this.clickHandler);
    this.arrow = this.selector.querySelector('[data-type="arrow"]');
    this.value = this.selector.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
    const { type } = event.target.dataset;

    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  get isOpen() {
    return this.selector.classList.contains('open');
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = Number(id);
    this.value.textContent = this.current.value;

    this.selector.querySelectorAll('[data-type="item"]').forEach(item => {
      item.classList.remove('selected');
    })
    this.selector.querySelector(`[data-id="${id}"]`).classList.add('selected');

    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.selector.classList.add('open');
    this.arrow.classList.remove('fa-caret-down');
    this.arrow.classList.add('fa-caret-up');
    if (this.selector.classList.contains('open')) true;
    return false;
  }

  close() {
    this.selector.classList.remove('open');
    this.arrow.classList.add('fa-caret-down');
    this.arrow.classList.remove('fa-caret-up');
    if (!this.selector.classList.contains("open")) true;
    return false;
  }

  destroy() {
    this.select.removeEventListener('click', this.clickHandler);
    this.select.innerHTML = '';
  }

}