define([
    "dojo/_base/declare",
    "zax/mv",
    "dojo/query",
    "dojo/dom-attr",
    "dojo/dom-class"
],
    function (declare, mv, query, domAttr, domClass) {
        return declare("app.zEach", mv, {
            options: null,
            model: {
                person: [
                    {"id":2,"name": "Maxi Rodriguez", "age": 22,"status":"football player"},
                    {"id":1,"name": "Max Mistr", "age": 25,"status":"unknown"},
                    {"id":4,"name": "Lindsey Pool", "age": 12,"status":"unknown"},
                    {"id":55,"name": "Denis Pool", "age": 22,"status":"unknown"},
                    {"id":11,"name": "Georg Doe", "age": 22,"status":"unknown"},
                    {"id":1,"name": "Ninja Doe", "age": 22,"status":"unknown"}
                ],
                age: 22,
                name: 'Edward Snouden'
            },
            changePerson: function (args, mv) {
                mv.zStore.person.put({id: 1, name: 'Kreeper', age: 22, status: 'ho'})
            }
        });
    }
);

