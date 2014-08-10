/**
 * The main colorful square for selecting color shades by dragging around the
 * little circle.
 */
Ext.define('Ext.ux.colorpick.ColorMap', {
    extend     : 'Ext.container.Container',
    alias      : 'widget.colorpickercolormap',
    controller : 'colorpickercolormapcontroller',

    requires: [
        'Ext.ux.colorpick.ColorMapController'
    ],

    cls  : 'x-colorpicker-colormap',

    width: 256,
    height: 256,

    // This is the drag "circle"; note it's 1x1 in size to allow full 
    // travel around the color map; the inner div has the bigger image
    items: [{
        xtype     : 'component',
        cls       : 'x-colorpicker-colormap-draghandle-container',
        itemId    : 'dragHandle',
        width     : 1,
        height    : 1,
        draggable : true,
        html: '<div class="x-colorpicker-colormap-draghandle"></div>'
    }],

    listeners : {
        boxready : {
            single  : true,
            fn      : 'onFirstBoxReady',
            scope   : 'controller'
        },
        colorbindingchanged: {
            fn    : 'onColorBindingChanged',
            scope : 'controller'
        },
        huebindingchanged: {
            fn    : 'onHueBindingChanged',
            scope : 'controller'
        }
    },

    // Called via data binding whenever selectedColor changes; fires "colorbindingchanged"
    setPosition: function(data) {
        var me         = this,
            dragHandle = me.down('#dragHandle');

        // Too early in the render cycle? Skip event
        if (!dragHandle.dd || !dragHandle.dd.constrain) {
            return;
        }

        // User actively dragging? Skip event
        if (typeof dragHandle.dd.dragEnded !== 'undefined' && !dragHandle.dd.dragEnded) {
            return;
        }

        me.fireEvent('colorbindingchanged', data);
    },

    // Called via data binding whenever selectedColor.h changes; fires "huebindingchanged" event
    setHue: function(hue) {
        var me = this;

        // Too early in the render cycle? Skip event
        if (!me.getEl()) {
            return;
        }

        me.fireEvent('huebindingchanged', hue);
    }
});
