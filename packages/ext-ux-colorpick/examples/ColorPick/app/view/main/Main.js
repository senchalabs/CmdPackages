/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ColorPick.view.main.Main', {
    extend: 'Ext.tab.Panel',

    xtype: 'app-main',

    ui: 'navigation',
    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            text: 'Color Pick',
            flex: 0
        },
        glyph: 10070
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Field',
        glyph: 9734,
        items: [{
            xtype: 'colorfield',
            fieldLabel: 'Select color',
            value: 'red'
        }]
    }, {
        title: 'Selector',
        glyph: 9672,
        items: [{
            xtype: 'panel',
            bind: {
                title: 'Color Selector - {color}'
            },
            viewModel: {
                data: {
                    color: 'blue'
                }
            },
            frame      : true,
            shrinkWrap : true,
            items      : [{
                xtype  : 'colorselector',
                format : 'hex8',
                bind   : '{color}'
            }]
        }]
    }, {
        title: 'Button',
        glyph: 9673,
        items: [{
            xtype: 'colorbutton',
            value: 'green'
        }]
    }]
});
