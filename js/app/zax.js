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
                    {name:'Grisha',age:25},
                    {name:'Lisha',age:20}
                ],
                person: {name:'AaA',age:20},
                name: 'Anton',
                age: 25,
                test: true
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
               setTimeout(function(){
                   self.model.name = 'Book';
                   console.log('Book')
               },1000);
            }
        });
    }
);

