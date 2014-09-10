define([
        "dojo/_base/declare",
        "zax/mv",
        "dojo/query",
        "dojo/dom-attr",
        "dojo/dom-class"
    ],
    function (declare, mv,query,domAttr,domClass) {
        return declare("app.zax", mv, {
            options: null,
            model: {
                name: 'hide',
                show: false,
                person: [
                    {id: 2, name: 'John Doe', age: 22, status: 'employer'},
                    {id: 3, name: 'Edward Snouden', age: 22, status: 'spy'},
                    {id: 1, name: 'Eric Kripke', age: 22, status: 'make a supernatural'},
                    {id: 8, name: 'Arseny Jazenuh', age: 22, status: 'betrayer'},
                    {id: 10, name: 'Oby Van Kenoby', age: 22, status: 'jedi'},
                    {id: 22, name: 'Han Baty', age: 22, status: 'conquer'},
                    {id: 22, name: 'Oliver Kan', age: 25, status: 'goalkeeper'}
                ],
                ages: 22,
                count: 2,
                start: 0,
                nav: [0, 1, 2, 3, 4]
            },
            constructor: function (options, node) {
                /*Declare*/
                this.options = options;
                this.options.model = {name: 'someName'};
            },
            check: function (args, mv) {
                mv.store.set('data.show', mv.store.data.name == 'show' && mv.store.data.password == "password");
            },
            test: {
                addRndPerson: function (args, mv) {
                    mv.zStore['person'].put({name: mv.utils.randomString(5), age: 22, status:"rnd"});
                    mv.store.set('data.person', mv.zStore['person'].data);
                    mv.zStore['nav'].data.push(mv.zStore['nav'].data.length);
                    mv.store.set('data.nav', mv.zStore['nav'].data);
                    mv.store.set('data.start',0);
                },
                getJson: function (args, mv) {
                    mv.zStore['person'].getJson('/dojozax/person.json');
                }
            },
            utils: {
                randomString: function (length, chars) {
                    chars = chars ? chars : '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    var result = '';
                    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
                    return result;
                }
            },
            setStart: function (args, mv) {
                var value = domAttr.get(this, 'data-value');
                var count = mv.store.data.count;
                mv.store.set('data.start', parseInt(value*count));
                query('div[z-each="nav"] .b-button').forEach(function(node){
                    domClass.remove(node,'b-selected');
                });
                domClass.add(this,'b-selected');
            },
            validator:{
                isNumber: function(node,value){
                    node.style.borderColor = /^\d+$/g.test(value) ? "" : 'red';
                }
            },
            changeNav: function(node,value){
                if(value){
                    var arr = [];
                    var top = Math.round(this.nodes.person.queryValue.length/value);
                    for(var i=0;i<top;i++){
                        arr.push(i);
                    }
                    this.zStore['nav'].data = arr;
                    this.store.set('data.nav', arr);
                }
            }
        });
    }
);

