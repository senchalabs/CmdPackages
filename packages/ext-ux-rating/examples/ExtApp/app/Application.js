/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('ExtApp.Application', {
    extend: 'Ext.app.Application',
    
    name: 'ExtApp',

    launch: function () {
        // IE often decides to not download web fonts, so force it to:
        if (Ext.isIE) {
            var style = document.getElementById('fonts');
            style.href = style.href;
            Ext.getBody().repaint();
        }
    }
});
