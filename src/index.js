import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import './index.scss';

export default class extends Controller {
  static targets = ['src', 'dst'];
  static values = {
    maxOptions: Number,
    sortOptions: { type: Boolean, default: false },
    selectOnSubmit: { type: Boolean, default: true }
  };
  static actions = [
    ['src', 'dblclick->add'],
    ['src', 'keydown->addByKey'],
    ['dst', 'dblclick->remove'],
    ['dst', 'keydown->removeByKey']
  ];

  get form() {
    return this.element.closest('form');
  }

  initialize() {
    this._submit = this.submit.bind(this);
  }

  connect() {
    if (this.selectOnSubmitValue && this.form) {
      this.form.addEventListener('submit', this._submit);
    }
  }

  disconnect() {
    if (this.selectOnSubmitValue && this.form) {
      this.form.removeEventListener('submit', this._submit);
    }
  }

  submit(e) {
    this.srcTarget.querySelectorAll('option').forEach(elem => elem.selected = false)
    this.dstTarget.querySelectorAll('option').forEach(elem => elem.selected = true);
  }

  add(e) {
    this.addOptions();
  }

  addByKey(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      this.addOptions();
    }
  }

  remove(e) {
    this.removeOptions();
  }

  removeByKey(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      this.removeOptions();
    }
  }

  addOptions() {
    this.srcTarget.querySelectorAll('option:checked').forEach(option => {
      if (this.maxOptionsValue && this.dstTarget.querySelectorAll('option').length >= this.maxOptionsValue) {
        return false;
      }
      this.addOption(option);
    });

    if (this.sortOptionsValue) this.sortOptions(this.dstTarget);
  }

  removeOptions() {
    this.dstTarget.querySelectorAll('option:checked').forEach(option => {
      this.removeOption(option);
    });

    if (this.sortOptionsValue) this.sortOptions(this.srcTarget);
  }

  addOption(option) {
    option.selected = false;
    this.dstTarget.append(option);
    this.dispatch('added', { detail: { option: option } });
  }

  removeOption(option) {
    option.selected = false;
    this.srcTarget.append(option);
    this.dispatch('removed', { detail: { option: option } });
  }

  sortOptions(target) {
    let sorted = Array.from(target.querySelectorAll('option')).sort((a, b) => {
      return a.value > b.value ? 1 : -1;
    });
    target.innerHTML = '';
    target.append(...sorted);
  }
}
