Ext.define('Ext.ux.colorpick.FieldController', {
    extend : 'Ext.app.ViewController',

    alias  : 'controller.colorpick-fieldcontroller',

    // When the Ok button is clicked on color picker, preserve the previous value
    onColorPickerOK: function (colorPicker) {
        var view = this.getView();

        view.setColor(colorPicker.getColor());

        view.collapse();
    },

    onColorPickerCancel: function () {
        var view = this.getView();

        view.collapse();
    }
});
