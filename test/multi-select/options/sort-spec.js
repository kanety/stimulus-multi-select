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
            <select multiple name="src" data-multi-select-target="src">
              <option value="option1">option1</option>
              <option value="option3">option3</option>
            </select>
          </div>
          <div>
            <div><button type="button" name="add" data-action="multi-select#add">&gt;</button></div>
            <div><button type="button" name="remove" data-action="multi-select#remove">&lt;</button></div>
          </div>
          <div>
            <select multiple name="dst" data-multi-select-target="dst">
              <option value="option2">option2</option>
            </select>
        </div>
        </div>
        <input type="submit" value="submit">
      </form>
    `;
  });

  it('sorts options', () => {
    $('select[name="src"] option').selected = true;
    $('button[name="add"]').click();
    expect(Array.from($$('select[name="dst"] option')).map(elem => elem.value)).toEqual(['option1', 'option2']);

    $('select[name="dst"] option').selected = true;
    $('button[name="remove"]').click();
    expect(Array.from($$('select[name="src"] option')).map(elem => elem.value)).toEqual(['option1', 'option3']);
  });
});
