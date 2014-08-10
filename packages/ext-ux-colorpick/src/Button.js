/**
 * A button (not extending from Button) that can be clicked to bring up the
 * color picker. It also changes its color based on the color picker selection.
 * The defaul selected color is configurable via {@link #value}.
 *
 *     @example
 *     Ext.create('Ext.ux.colorpick.Button', {
 *         value     : '993300',  // initial selected color
 *         renderTo  : Ext.getBody(),
 *         listeners : {
 *             select: function(picker, selColor) {
 *                 alert(selColor);
 *             }
 *         }
 *     });
 */
Ext.define('Ext.ux.colorpick.Button', {
    extend     : 'Ext.Component',
    xtype      : 'colorbutton',

    controller : 'colorpick-buttoncontroller',

    mixins: [
        'Ext.ux.colorpick.Selection'
    ],

    requires: [
        'Ext.window.Window',
        'Ext.ux.colorpick.Selector',
        'Ext.ux.colorpick.ButtonController',
        'Ext.ux.colorpick.ColorUtils'
    ],

    baseCls : 'x-colorpicker-button',

    width: 20,
    height: 20,

    // hack to solve issue with IE, when applying a filter the click listener is not being fired.
    html: '<div class="filter" style="height:100%; width:100%; position: absolute;"></div>'+
          '<a class="btn" style="height:100%; width:100%; position: absolute;"></a>',
    // eo hack

    // button's background reflects the selected color
    bgStyleTpl: Ext.create('Ext.XTemplate',
        Ext.isIE && Ext.ieVersion < 10 ?
          'filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=\'#{hexAlpha}{hex}\', endColorstr=\'#{hexAlpha}{hex}\');' /* IE6-9 */
          : 'background: {rgba};'
    ),
    
    listeners: {
        click: 'onClick'
    },

    /**
     * @event change
     * Fires when a color is selected.
     * @param {Ext.ux.colorpick.Selector} this
     * @param {String} color The value of the selected color as per specified {@link #format}.
     * @param {String} previousColor The previous color value.
     */

    afterRender: function () {
        var me = this,
            btn;

        me.callParent();

        me.btn = btn = me.el.down('.btn');
        me.mon(btn, 'click', me.onClick, me);

        me.syncColor(me.getColor());
    },

    onClick: function (e) {
        this.fireEvent('click', this, e);
    },

    syncColor: function (color) {
        var ColorUtils = Ext.ux.colorpick.ColorUtils,
            me = this,
            el = me.getEl().down('.filter'),
            hex, alpha, rgba, bgStyle;

        hex     = ColorUtils.rgb2hex(color.r, color.g, color.b);
        alpha   = Math.floor(color.a * 255).toString(16) ;
        rgba    = ColorUtils.getRGBAString(color);
        bgStyle = me.bgStyleTpl.apply({hex: hex, hexAlpha: alpha, rgba: rgba});

        el.applyStyles(bgStyle);
    },

    updateColor: function (color) {
        var me = this,
            cp = me.colorPicker;

        me.mixins.colorselection.updateColor.call(me, color);

        if (me.rendered) {
            me.syncColor(color);
        }

        if (cp) {
            cp.setColor(color);
        }
    },

    // Sets this.format and color picker's setFormat()
    updateFormat: function(format) {
        var cp = this.colorPicker;

        if (cp) {
            cp.setFormat(format);
        }
    }
});
