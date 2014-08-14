/**
 * A field that can be clicked to bring up the color picker. The value changes based on the color picker selection.
 * The defaul selected color is configurable via {@link #value}.
 *
 *      @example
 *      Ext.create({
 *          xtype: 'colorfield',
 *          renderTo: Ext.getBody(),
 *
 *          value: '993300',  // initial selected color
 *
 *          listeners : {
 *              change: function (field, color) {
 *                  console.log('New color: ' + color);
 *              }
 *          }
 *      });
 */
Ext.define('Ext.ux.colorpick.Field', {
    extend: 'Ext.form.field.Picker',
    xtype: 'colorfield',

    mixins: [
        'Ext.ux.colorpick.Selection'
    ],

    controller: 'colorpick-fieldcontroller',

    requires: [
        'Ext.window.Window',
        'Ext.ux.colorpick.Selector',
        'Ext.ux.colorpick.FieldController',
        'Ext.ux.colorpick.ColorUtils',
        'Ext.layout.container.Fit'
    ],

    matchFieldWidth : false, // picker is usually wider than field
    editable        : false,

    beforeBodyEl: [
        '<div class="x-color-swatch" id="{id}-swatchEl" data-ref="swatchEl"></div>'
    ],

    cls: 'x-colorpicker-field',
    childEls: [
        'swatchEl'
    ],

    /**
     * @event change
     * Fires when a color is selected.
     * @param {Ext.ux.colorpick.Field} this
     * @param {String} color The value of the selected color as per specified {@link #format}.
     * @param {String} previousColor The previous color value.
     */

    // override as required by parent pickerfield
    createPicker: function() {
        var me     = this,
            picker = {
                xtype               : 'colorselector',
                format              : me.getFormat(),
                showPreviousColor   : true,
                showOkCancelButtons : true,
                color               : me.getColor(),
                listeners           : {
                    ok     : 'onColorPickerOK',
                    cancel : 'onColorPickerCancel'
                }
            };

        // create a color picker instance but don't render yet
        me.colorPicker = picker = Ext.create(picker);

        // the window will actually be shown and will house the picker
        me.colorPickerWindow = Ext.widget('window', {
            items     : [ picker ],
            minWidth  : 540,
            minHeight : 200,
            header    : false,
            resizable : true,
            layout    : 'fit'
        });

        return me.colorPickerWindow;
    },

    afterRender: function () {
        this.callParent();
        this.updateValue(this.value);
    },

    onExpand: function () {
        var color = this.getColor();
        this.colorPicker.setPreviousColor(color);
    },

    // Expects value formatted as per "format" config
    setValue: function(color) {
        var me = this,
            c = me.applyValue(color),
            current = me.value;

        me.callParent([c]);

        if (current !== c) {
            me.updateValue(c);
        }
    },

    // Sets this.format and color picker's setFormat()
    updateFormat: function(format) {
        var cp = this.colorPicker;

        if (cp) {
            cp.setFormat(format);
        }
    },

    updateValue: function (color) {
        var me = this,
            swatchEl = me.swatchEl,
            c;

        // If the "value" is changed, update "color" as well. Since these are always
        // tracking each other, we guard against the case where we are being updated
        // *because* "color" is being set.
        if (!me.syncing) {
            me.syncing = true;
            me.setColor(color);
            me.syncing = false;
        }

        c = me.getColor();

        if (swatchEl) {
            c = Ext.ux.colorpick.ColorUtils.formats['#hex6'](c);
            swatchEl.setStyle('background-color', c);
        }

        if (me.colorPicker) {
            me.colorPicker.setColor(c);
        }
    }
});
