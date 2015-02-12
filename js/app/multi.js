define([
        "dojo/_base/declare",
        "dojo/_base/array",
        "dojo/query",
        "zax/mv"
    ],
    function (declare, array, query, mv) {
        return declare("app.zax", mv, {
            options: null,
            model: {
                name: 'John',
                persons: [
                    {name: 'John', lastName: 'Doe', age: 55, address: {
                        country: 'Russia',
                        city: 'Taganrog',
                        street: 'Petrovskaya 21',
                        out: [
                            {one:1},
                            {one:2}
                        ]
                    }, children: [
                        {name: 'Mike',age:18,books: [
                            {author: 'Lindsey Lohan'},
                            {author: 'Kirck Hammet',data: {date:'20-20-20'}}
                        ]},
                        {name: 'Sofie',books: [
                            {author: 'Cool man',data: {date:'11-11-11'}},
                            {author: 'Spigel son'}]
                        }
                    ]},
                    {name: 'Jim', lastName: 'Stranger', age: 28, address: {
                        country: 'China',
                        city: 'Pekin',
                        street: 'Sun Hun Pin 22'
                    }, children: []},
                    {name: 'Frank', lastName: 'Moon', age: 67, address: {
                        country: 'Holland',
                        city: '',
                        street: 'Canabis 333'
                    }, children: [
                        {
                            name: 'Eddie'
                        }
                    ]}
                ],
                context: {
                    age: 22,
                    name:'Adolf'
                }
            },
            filters: {
                upper: function (value) {
                    return value.toUpperCase();
                }
            },
            constructor: function (options, node) {
                app = this;
            }
        });
    }
);

