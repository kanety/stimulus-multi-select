describe('index', () => {
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

  it('moves options', () => {
    $('select[name="src"] option').selected = true;
    $('button[name="add"]').click();
    expect($$('select[name="src"] option').length).toEqual(2);
    expect($$('select[name="dst"] option').length).toEqual(1);

    $('select[name="dst"] option').selected = true;
    $('button[name="remove"]').click();
    expect($$('select[name="src"] option').length).toEqual(3);
    expect($$('select[name="dst"] option').length).toEqual(0);
  });

  it('moves options by dblclick', () => {
    $('select[name="src"] option').selected = true;
    $('select[name="src"]').dispatchEvent(new MouseEvent('dblclick'));
    expect($$('select[name="src"] option').length).toEqual(2);
    expect($$('select[name="dst"] option').length).toEqual(1);

    $('select[name="dst"] option').selected = true;
    $('select[name="dst"]').dispatchEvent(new MouseEvent('dblclick'));
    expect($$('select[name="src"] option').length).toEqual(3);
    expect($$('select[name="dst"] option').length).toEqual(0);
  });

  it('moves options by enter key', () => {
    $('select[name="src"] option').selected = true;
    $('select[name="src"]').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 }));
    expect($$('select[name="src"] option').length).toEqual(2);
    expect($$('select[name="dst"] option').length).toEqual(1);

    $('select[name="dst"] option').selected = true;
    $('select[name="dst"]').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 }));
    expect($$('select[name="src"] option').length).toEqual(3);
    expect($$('select[name="dst"] option').length).toEqual(0);
  });
});
