import { Application } from '@hotwired/stimulus';
import MultiSelectController from 'index';

const application = Application.start();
application.register('multi-select', MultiSelectController);

describe('callbacks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <div data-controller="multi-select">
          <div>
            <select multiple data-multi-select-target="src">
              <option value="option1">option1</option>
              <option value="option2">option2</option>
              <option value="option3">option3</option>
            </select>
          </div>
          <div>
            <div><button type="button" data-action="multi-select#add">&gt;</button></div>
            <div><button type="button" data-action="multi-select#remove">&lt;</button></div>
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
    add = document.querySelector('[data-action="multi-select#add"]');
    remove = document.querySelector('[data-action="multi-select#remove"]');
  });

  let message;
  beforeEach(() => {
    element.addEventListener('multi-select:added', (e) => {
      message = 'added: ' + e.detail.option.value;
    });
    element.addEventListener('multi-select:removed', (e) => {
      message = 'removed: ' + e.detail.option.value;
    });
  });

  it('has callbacks', () => {
    src.querySelector('option').selected = true;
    add.click();
    expect(message).toEqual('added: option1');

    dst.querySelector('option').selected = true;
    remove.click()
    expect(message).toEqual('removed: option1');
  });
});
