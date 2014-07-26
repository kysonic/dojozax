define([
        "dojo/_base/declare",
        "zax/mv",
        "dojo/dom-attr"
    ],
    function (declare, mv, domAttr) {
        return declare("app.zax", mv, {
            options: null,
            model: {name: 'hide', show: false, person: [
                {id:2,name: 'John Doe', age: 22,status:1},
                {id:3,name: 'Edward Snouden', age: 22,status:3},
                {id:1,name: 'Eric Kripke', age: 22,status:4},
                {id:8,name: 'Arseny Jazenuh', age: 22,status:5},
                {id:10,name: 'Oby Van Kenoby', age: 22,status:2},
                {id:22,name: 'Han Batyy', age: 22,status:5}
            ],ages:22,count:2,nav:[0,1,2,3,4]},
            constructor: function (options, node) {
                /*Declare*/
                this.options = options;
                this.options.model = {name: 'someName'};
            },
            clicker: function (args, mv) {
                mv.store.set('data.show', mv.store.data.name == 'show' && mv.store.data.pixel == "password");
            },
            test: {
                addRndPerson: function (args, mv) {
                    mv.zStore['person'].put({name:mv.utils.randomString(5),age:22});
                    mv.store.set('data.person',mv.zStore['person'].data);
                    mv.zStore['nav'].data.push(mv.zStore['nav'].data.length);
                    mv.store.set('data.nav',mv.zStore['nav'].data);
                },
                getJson: function(args, mv){
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
            setStart: function(args,mv){
                var value = domAttr.get(this,'data-value');
                mv.store.set('data.start',value);
            }
        });
    }
);

