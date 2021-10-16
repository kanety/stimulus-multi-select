describe('max', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <div data-controller="multi-select" data-multi-select-max-options-value="2">
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

  it('has max option', () => {
    $$('select[name="src"] option').forEach(elem => elem.selected = true);
    $('button[name="add"]').click();
    expect($$('select[name="dst"] option').length).toEqual(2);
  });
});
