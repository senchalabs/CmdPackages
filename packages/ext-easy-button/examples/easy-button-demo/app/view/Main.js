Ext.define('EasyButtonDemo.view.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',
    defaults: {
        margin: 50
    },
    items: [{
        xtype: 'easybutton'
    },{
        xtype: 'easybutton',
        ui: 'easy-red'
    }]
});