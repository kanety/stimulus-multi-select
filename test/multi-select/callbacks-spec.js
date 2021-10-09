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
            <select multiple name="src" data-multi-select-target="src">
              <option value="option1">option1</option>
              <option value="option2">option2</option>
              <option value="option3">option3</option>
            </select>
          </div>
          <div>
            <div><button type="button" name="add" data-action="multi-select#add">&gt;</button></div>
            <div><button type="button" name="remove" data-action="multi-select#remove">&lt;</button></div>
          </div>
          <div>
            <select multiple name="dst" data-multi-select-target="dst"></select>
          </div>
        </div>
        <input type="submit" value="submit">
      </form>
    `;
  });

  let message;
  beforeEach(() => {
    $('[data-controller="multi-select"]').addEventListener('multi-select:added', (e) => {
      message = 'added: ' + e.detail.option.value;
    });
    $('[data-controller="multi-select"]').addEventListener('multi-select:removed', (e) => {
      message = 'removed: ' + e.detail.option.value;
    });
  });

  it('has callbacks', () => {
    $('select[name="src"] option').selected = true;
    $('button[name="add"]').click();
    expect(message).toEqual('added: option1');

    $('select[name="dst"] option').selected = true;
    $('button[name="remove"]').click()
    expect(message).toEqual('removed: option1');
  });
});
