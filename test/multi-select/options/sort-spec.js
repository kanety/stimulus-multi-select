import { Application } from '@hotwired/stimulus';
import MultiSelectController from 'index';

const application = Application.start();
application.register('multi-select', MultiSelectController);

describe('sort', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <div data-controller="multi-select" data-multi-select-sort-options-value="true">
          <div>
            <select multiple data-multi-select-target="src">
              <option value="option1">option1</option>
              <option value="option3">option3</option>
            </select>
          </div>
          <div>
            <div><button type="button" data-action="multi-select#add">&gt;</button></div>
            <div><button type="button" data-action="multi-select#remove">&lt;</button></div>
          </div>
          <div>
            <select multiple data-multi-select-target="dst">
              <option value="option2">option2</option>
            </select>
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
    add = document.querySelector('[data-action="multi-select#add"]');
    remove = document.querySelector('[data-action="multi-select#remove"]');
  });

  it('sorts options', () => {
    src.querySelector('option').selected = true;
    add.click();
    expect(Array.from(dst.querySelectorAll('option')).map(elem => elem.value)).toEqual(['option1', 'option2']);

    dst.querySelector('option').selected = true;
    remove.click();
    expect(Array.from(src.querySelectorAll('option')).map(elem => elem.value)).toEqual(['option1', 'option3']);
  });
});
