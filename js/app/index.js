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
                name:'John',
                age: 22,
                lost: 11,
                ifer: true,
                persons: [
                    {name: 'John',lastName: 'Doe',age:55},
                    {name: 'Jim',lastName: 'Stranger',age:28},
                    {name: 'Frank',lastName: 'Moon',age:67}
                ],
                context: {
                    name: 'Arsenyy',
                    ig: true,
                    oga: {
                        igg: true,
                        name: 'Suka'
                    }
                }
            },
            filters: {
            },
            constructor: function (options, node) {
                app = this;
                //this.injectBoundHTML('<input type="text" id="inpt" value="{{name}}" z-bind /><div z-bind>{{name}}</div>',this.$.cool);
            },
            clicker: function(){
                this.removeBoundNode(this.$.inpt);
            }
        });
    }
);

