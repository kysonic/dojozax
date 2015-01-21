define([
        "dojo/_base/declare",
        "dojo/query",
        "dijit/form/DateTextBox",
        "zax/mv"
    ],
    function (declare,query,DateTextBox,mv) {
        return declare("app.zax", mv, {
            options: null,
            model: {
                name: 'John',
                text: 'Lorem ipsum dolor sit amet',
                age: 25,
                hide: true,
                check: true,
                radio: '2',
                select: 'two'
            },
            filters: {
                upper: function(value){
                    return value.toUpperCase();
                }
            },
            constructor: function (options, node) {
                window.app = this;
            }
        });
    }
);

