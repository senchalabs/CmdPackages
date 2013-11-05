Ext.define('EasyButton.button.Easy', {
    extend: 'Ext.button.Button',
    xtype: 'easybutton',
    ui: 'easy-default',
    text: 'Easy',
    requires: [
        'Ext.window.MessageBox'
    ],
    handler: function() {
        Ext.Msg.alert('Easy', 'That was easy!');
    }
});