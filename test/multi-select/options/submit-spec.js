import { Application } from '@hotwired/stimulus';
import MultiSelectController from 'index';

const application = Application.start();
application.register('multi-select', MultiSelectController);

describe('submit', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <div data-controller="multi-select" data-multi-select-select-on-submit-value="true">
          <div>
            <select multiple name="src" data-multi-select-target="src">
              <option value="option1" selected="selected">option1</option>
              <option value="option2" selected="selected">option2</option>
              <option value="option3" selected="selected">option3</option>
          </select>
          </div>
          <div>
            <div><button type="button" name="add" data-action="multi-select#add">&gt;</button></div>
            <div><button type="button" name="remove" data-action="multi-select#remove">&lt;</button></div>
          </div>
          <div>
            <select multiple name="dst" data-multi-select-target="dst">
              <option value="option1">option1</option>
              <option value="option2">option2</option>
              <option value="option3">option3</option>
            </select>
        </div>
        </div>
        <input type="submit" value="submit">
      </form>
    `;
  });

  it('selects options before submit', () => {
    $('form').dispatchEvent(new CustomEvent('submit'));
    expect($$('select[name="src"] option:checked').length).toEqual(0);
    expect($$('select[name="dst"] option:checked').length).toEqual(3);
  });
});
