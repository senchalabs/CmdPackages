Ext.define('Ext.ux.colorpick.ButtonController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.colorpick-buttoncontroller',

    requires: ['Ext.layout.container.Fit'],

    destroy: function () {
        var view = this.getView(),
            colorPickerWindow = view.colorPickerWindow;

        if (colorPickerWindow) {
            colorPickerWindow.destroy();
            view.colorPickerWindow = view.colorPicker = null;
        }

        this.callParent();
    },

    getPopup: function () {
        var view = this.getView(),
            popup = view.colorPickerWindow;

        if (!popup) {
            popup = Ext.create({
                xtype     : 'window',
                minWidth  : 540,
                minHeight : 200,
                layout    : 'fit',
                header    : false,
                resizable : true,
                items     : [{
                    xtype               : 'colorselector',
                    format              : view.getFormat(),
                    showPreviousColor   : true,
                    showOkCancelButtons : true,

                    listeners: {
                        ok     : 'onColorPickerOkBtn',
                        cancel : 'onColorPickerCancelBtn',
                        scope  : this
                    }
                }]
            });

            view.colorPickerWindow = popup;
            popup.colorPicker = view.colorPicker = popup.items.getAt(0);
        }

        return popup;
    },

    // When button is clicked show the color picker window
    onClick: function() {
        var me = this,
            view = me.getView(),
            color = view.getColor(),
            popup = me.getPopup(),
            colorPicker = popup.colorPicker;

        colorPicker.setColor(color);
        colorPicker.setPreviousColor(color);

        popup.showBy(view, 'tl-br?');
    },

    onColorPickerOkBtn: function (picker) {
        var view  = this.getView(),
            color = picker.getColor(),
            cpWin = view.colorPickerWindow;

        cpWin.hide();

        view.setColor(color);
    },

    onColorPickerCancelBtn: function () {
        var view  = this.getView(),
            cpWin = view.colorPickerWindow;

        cpWin.hide();
    }
});
