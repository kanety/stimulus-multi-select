import { Application } from '@hotwired/stimulus';
import MultiSelectController from 'index';

const application = Application.start();
application.register('multi-select', MultiSelectController);

describe('max', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <div data-controller="multi-select" data-multi-select-max-options-value="2">
          <div>
            <select multiple data-multi-select-target="src">
              <option value="option1">option1</option>
              <option value="option2">option2</option>
              <option value="option3">option3</option>
            </select>
          </div>
          <div>
            <div><button type="button" data-multi-select-target="add">&gt;</button></div>
            <div><button type="button" data-multi-select-target="remove">&lt;</button></div>
          </div>
          <div>
            <select multiple data-multi-select-target="dst"></select>
          </div>
        </div>
        <input type="submit" value="submit">
      </form>
    `;
  });

  let element, src, dst, add, remove;
  beforeEach(() => {
    element = document.querySelector('[data-controller="multi-select"]');
    src = document.querySelector('[data-multi-select-target="src"]');
    dst = document.querySelector('[data-multi-select-target="dst"]');
    add = document.querySelector('[data-multi-select-target="add"]');
    remove = document.querySelector('[data-multi-select-target="remove"]');
  });

  it('has max option', () => {
    src.querySelectorAll('option').forEach(elem => elem.selected = true);
    add.click();
    expect(dst.querySelectorAll('option').length).toEqual(2);
  });
});
