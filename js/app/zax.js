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
                persons: [
                    {name:'Grisha'}
                ],
                name: 'Anton',
                age: 25,
                test: false
            },
            filters: {
                upper: function(value){
                    return value + 22;
                }
            },
            constructor: function (options, node) {
                /*Declare*/
                var self = this;
                this.options = options;

            }
        });
    }
);

