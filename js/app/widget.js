define([
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/query",
        "zax/mv"
    ],
    function (declare,domConstruct,query,mv) {
        return declare("Widget", mv, {
            options: null,
            model: {
                date: '10.01.2015',
                time: '10:22',
                name:'Name',
                check: true,
                select: 'VA',
                radio1: true,
                radio2: false,
                dates: [
                    {date:'10.01.2015'},
                    {date:'10.02.2015'},
                    {date:'10.03.2015'}
                ]

            },
            constructor: function (options, node) {
                var self = this;
                app = this;
            }
        });
    }
);

