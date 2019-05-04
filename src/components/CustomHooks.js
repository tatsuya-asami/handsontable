import Handsontable from "handsontable";

export const MaxLengthEditor = Handsontable.editors.TextEditor.prototype.extend();
MaxLengthEditor.prototype.prepare = function() {
  Handsontable.editors.TextEditor.prototype.prepare.apply(this, arguments);
  this.TEXTAREA.maxLength = this.cellProperties.maxLength;
};
Handsontable.editors.MaxLengthEditor = MaxLengthEditor;
Handsontable.editors.registerEditor("maxlength", MaxLengthEditor);
