Ext.define('ExtApp.overrides.WidgetColumn', {
    override: 'Ext.grid.column.Widget',

    compatibility: [
        // This bug is fixed in 5.0.2 so disable this override for 5.0.2+
        'ext@5.0.0 - 5.0.1'
    ],

    privates: {
        getFreeWidget: function () {
            var result = this.callParent(arguments);
            result.ownerCmp = this;
            return result;
        }
    }
});
