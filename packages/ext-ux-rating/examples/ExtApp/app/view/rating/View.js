Ext.define('ExtApp.view.rating.View', {
    extend: 'Ext.grid.Panel',
    xtype: 'ratingsview',

    requires: [
        'Ext.grid.column.Widget',

        'ExtApp.store.Ratings'
    ],

    store: {
        type: 'ratings'
    },

    columns: [{
        text: 'Employee',
        dataIndex: 'name',
        sortable: true,
        flex: 1
    },{
        text: 'Rating',
        columns: [{
            text: 'Last Year',
            dataIndex: 'lastYear',
            sortable: true,
            xtype: 'widgetcolumn',
            widget: {
                width: 90,
                xtype: 'rating',
                overStyle: 'color: orange;'
            }
        },{
            text: 'This Year',
            dataIndex: 'thisYear',
            sortable: true,
            xtype: 'widgetcolumn',
            widget: {
                width: 90,
                xtype: 'rating',
                selectedStyle: 'color: rgb(96, 169, 23);',
                overStyle: 'color: rgb(23, 23, 189);',
                tooltip: [
                    '<div style="white-space: nowrap;"><b>',
                        '{[this.rank[values.value]]}',
                    '</b>',
                    '<tpl if="trackOver && tracking !== value">',
                        '<br><span style="color:#aaa">(click to set to ',
                            '{[this.rank[values.tracking]]}',
                        ')</span>',
                    '</tpl></span>',
                    {
                        rank: {
                            1: 'Probation',
                            2: 'Needs Improvement',
                            3: 'Valued Contributor',
                            4: 'Excellent',
                            5: 'Rock Star'
                        }
                    }
                ]
            }
        }]
    }]
});
