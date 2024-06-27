# stimulus-multi-select

A stimulus controller for simple multiple select.

## Dependencies

* @hotwired/stimulus 3.0+

## Installation

Install from npm:

    $ npm install @kanety/stimulus-multi-select --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import MultiSelectController from '@kanety/stimulus-multi-select';

const application = Application.start();
application.register('multi-select', MultiSelectController);
```

Import css:

```css
@import '@kanety/stimulus-multi-select';
```

Build html as follows:

```html
<div class="st-multi-select" data-controller="multi-select">
  <div>
    <select multiple data-multi-select-target="src">
      <option value="option1">option1</option>
      <option value="option2">option2</option>
      <option value="option3">option3</option>
    </select>
  </div>
  <div>
    <div><button type="button" class="st-multi-select__handler" data-action="multi-select#add"></button></div>
    <div><button type="button" class="st-multi-select__handler" data-action="multi-select#remove"></button></div>
  </div>
  <div>
    <select multiple data-multi-select-target="dst"></select>
  </div>
</div>
```

### Options

#### max-options

Set max number of addable options:

```html
<div data-controller="multi-select"
     data-multi-select-max-options-value="2">
</div>
```

#### sort-options

Enable sorting when options moved:

```html
<div data-controller="multi-select"
     data-multi-select-sort-options-value="true">
</div>
```

### Callbacks

```javascript
let element = document.querySelector('[data-controller="multi-select"]')
element.addEventListener('multi-select:added', (e) => {
  console.log(e.detail.option);  // added option
});
element.addEventListener('multi-select:removed', (e) => {
  console.log(e.detail.option);  // removed option
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
