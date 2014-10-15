/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 */
Ext.define('ExtApp.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.rtl.*',

        'ExtApp.view.main.MainController',
        'ExtApp.view.main.MainModel',
        'ExtApp.view.rating.View',

        'Ext.ux.rating.Picker'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main',
        data: {
            ratingOne: 3,
            ratingTwo: 3.5,
            ratingThree: 2.25,

            trackOver: true
        }
    },

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        title: 'Details',
        region: 'west',
        width: 250,
        split: true,
        bodyPadding: 10,
        items: [{
            xtype: 'button',
            enableToggle: true,
            text: 'trackOver',
            bind: {
                pressed: '{trackOver}'
            },

            // Needed to enable two-way binding of "pressed"
            reference: 'trackOverBtn'
        },{
            xtype: 'fieldset',
            title: 'Ratings',
            defaultType: 'displayfield',
            items: [{
                fieldLabel: 'Example #1',
                bind: '{ratingOne}'
            },{
                fieldLabel: 'Example #4',
                bind: '{ratingTwo}'
            },{
                fieldLabel: 'Example #3',
                bind: '{ratingThree}'
            }]
        }]
    },{
        region: 'center',
        xtype: 'tabpanel',

        items:[{
            title: 'Basic',
            bodyPadding: 10,
            layout: 'anchor',
            defaults: {
                anchor: '0'
            },
            items: [{
                xtype: 'component',
                html: '<h2>Defaults</h2>'
            },{
                xtype: 'rating',
                bind: {
                    trackOver: '{trackOver}',
                    value:'{ratingOne}'
                }
            },{
                xtype: 'component',
                html: '<h2>Double Size (round=0.5)</h2>'
            },{
                xtype: 'rating',
                scale: '2em',
                rounding: 0.5,
                minimum: 0.5,
                bind: {
                    trackOver: '{trackOver}',
                    value:'{ratingTwo}'
                }
            },{
                xtype: 'component',
                html: '<h2>Custom Glyphs and Styles (FontAwesome, rounding=0.25)</h2>'
            },{
                xtype: 'rating',
                rounding: 0.25,
                // We've added FontAwesome in index.html
                family: 'FontAwesome',
                glyphs: [ 0xf10c, 0xf111 ], // font-awesome empty/full circles
                overStyle: 'color: red;',
                selectedStyle: 'color: rgb(96, 169, 23);',
                scale: '8em',
                minimum: 0.25,
                limit: 8,
                bind: {
                    trackOver: '{trackOver}',
                    value: '{ratingThree}'
                }
            },{
                xtype: 'component',
                html: '<h2>Custom Glyphs, Styles and Tooltip (FontAwesome, rounding=0.1)</h2>'
            },{
                xtype: 'rating',
                rounding: 0.1,
                family: 'FontAwesome',
                glyphs: [ 0xf08a, 0xf004 ], // font-awesome empty/full hearts
                selectedStyle: 'color: rgb(23, 23, 189);',
                scale: '8em',
                minimum: 0.25,
                value: 2.25,
                tooltip: [
                    '<b><tpl if="value===1">',
                        '1 Heart',
                    '<tpl else>',
                        '{value} Hearts',
                    '</tpl></b>',
                    '<tpl if="trackOver && tracking !== value">',
                        '<br><span style="color:#aaa">(click to set to ',
                        '<tpl if="tracking===1">',
                            '1 Heart',
                        '<tpl else>',
                            '{tracking} Hearts',
                        '</tpl>',
                        ')</span>',
                    '</tpl>'
                ],
                listeners: {
                    change: 'onRatingChange'
                },
                bind: {
                    trackOver: '{trackOver}'
                }
            }]
        },{
            title: 'Grid',
            xtype: 'ratingsview'
        },{
            title: 'RTL',
            layout: 'fit',
            items: [{
                rtl: true,
                xtype: 'ratingsview'
            }]
        }]
    }]
});
