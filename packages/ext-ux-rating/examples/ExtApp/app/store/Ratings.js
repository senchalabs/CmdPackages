Ext.define('ExtApp.store.Ratings', function () {
    var firstNames = ['Homer','Seymour','Nick','Ned','Troy','Montgomery','Moe','Kent','Rainier'],
        lastNames = ['Simpson','Skinner','Riviera','Flanders','McClure','Burns','Szyslak',
                     'Brockman','Wolfcastle'],
        suffix = ['', ', Jr.', ', Sr.'],
        data = [],
        mul = 1103515245,
        off = 12345,
        mod = 0x80000000, // 2^31
        seed = 1,
        id = 1,
        i, k, m, t;

    function rand (min, max) {
        seed = ((mul * seed * mod + off) % mod) / mod;

        return Math.round(seed * (max - 1)) + min;
    }

    for (m = 0; m < suffix.length; ++m) {
        for (i = 0; i < firstNames.length; ++i) {
            for (k = 0; k < lastNames.length; ++k) {
                data.push({
                    id: ++id,
                    name: firstNames[i] + ' ' + lastNames[k] + suffix[m],
                    lastYear: rand(1, 5),
                    thisYear: rand(1, 5)
                });
            }
        }
    }

    for (i = 0; i < 150; ++i) {
        k = rand(1, data.length - 1);
        do {
            m = rand(1, data.length - 1);
        } while (m === k);
        t = data[k];
        data[k] = data[m];
        data[m] = t;
    }

    return {
        extend: 'Ext.data.Store',
        alias: 'store.ratings',

        fields: ['id', {
            name: 'name'
        },{
            name: 'lastYear'
        },{
            name: 'thisDate'
        }],

        data: data
    };
});
