define([
        "dojo/_base/declare",
        "dojo/_base/array",
        "dojo/query",
        "zax/mv"
    ],
    function (declare,array,query,mv) {
        return declare("app.zax", mv, {
            options: null,
            model: {
                name: 'John',
                text: 'Lorem ipsum dolor sit amet',
                age: 25,
                hide: true,
                check: true,
                radio: '2',
                select: 'two',
                ifData: true,
                persons: [
                    {name: 'John',lastName: 'Doe',age:55},
                    {name: 'Jim',lastName: 'Stranger',age:28},
                    {name: 'Frank',lastName: 'Moon',age:67}
                ]
            },
            filters: {
                upper: function(value){
                    return value.toUpperCase();
                }
            },
            constructor: function (options, node) {
                var self = this;
                window.app = this;
                this.model.persons.query({name:/Jim/i});
                setTimeout(function(){
                    self.model.persons.resetQuery();
                },2000);
            },
            clicker: function(e){
                console.log(this,e);
            }
        });
    }
);

