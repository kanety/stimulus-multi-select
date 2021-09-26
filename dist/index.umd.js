!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("@hotwired/stimulus"),require("@kanety/stimulus-static-actions")):"function"==typeof define&&define.amd?define(["@hotwired/stimulus","@kanety/stimulus-static-actions"],e):(t||self).StimulusMultiSelect=e(t.Stimulus)}(this,function(t){class e extends t.Controller{get form(){return this.element.closest("form")}initialize(){this._submit=this.submit.bind(this)}connect(){this.selectOnSubmitValue&&this.form&&this.form.addEventListener("submit",this._submit)}disconnect(){this.selectOnSubmitValue&&this.form&&this.form.removeEventListener("submit",this._submit)}submit(t){this.srcTarget.querySelectorAll("option").forEach(t=>t.selected=!1),this.dstTarget.querySelectorAll("option").forEach(t=>t.selected=!0)}add(t){this.addOptions()}addByKey(t){13==t.keyCode&&(t.preventDefault(),this.addOptions())}remove(t){this.removeOptions()}removeByKey(t){13==t.keyCode&&(t.preventDefault(),this.removeOptions())}addOptions(){this.srcTarget.querySelectorAll("option:checked").forEach(t=>{if(this.maxOptionsValue&&this.dstTarget.querySelectorAll("option").length>=this.maxOptionsValue)return!1;this.addOption(t)}),this.sortOptionsValue&&this.sortOptions(this.dstTarget)}removeOptions(){this.dstTarget.querySelectorAll("option:checked").forEach(t=>{this.removeOption(t)}),this.sortOptionsValue&&this.sortOptions(this.srcTarget)}addOption(t){t.selected=!1,this.dstTarget.append(t),this.dispatch("added",{detail:{option:t}})}removeOption(t){t.selected=!1,this.srcTarget.append(t),this.dispatch("removed",{detail:{option:t}})}sortOptions(t){var e=Array.from(t.querySelectorAll("option")).sort((t,e)=>t.value>e.value?1:-1);t.innerHTML="",t.append(...e)}}return e.targets=["src","dst","add","remove"],e.values={maxOptions:Number,sortOptions:{type:Boolean,default:!1},selectOnSubmit:{type:Boolean,default:!0}},e.actions=[["add","click->add"],["remove","click->remove"],["src","dblclick->add"],["src","keydown->addByKey"],["dst","dblclick->remove"],["dst","keydown->removeByKey"]],e});
//# sourceMappingURL=index.umd.js.map
