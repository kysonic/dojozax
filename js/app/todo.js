define([
        "dojo/_base/declare",
        "dojo/_base/array",
        "dojo/query",
        "zax/mv"
    ],
    function (declare,array,query,mv) {
        return declare("app.todo", mv, {
            options: null,
            model: {
                todos: [],
                name:'Abr'
            },
            constructor: function (options, node) {

            },
            add: function(){
                this.model.todos.push({checked:false,text:'-------',isEdit:false})
            },
            edit: function(e){
                e.target.parentNode.parentNode.context.isEdit = true;
            },
            enterKey: function(e){
                if(e.which==13) {
                    e.target.parentNode.context.isEdit = false;
                }
            },
            remove: function(e){
                this.model.todos.splice(e.target.parentNode.sn);
            },
            showAll: function(){
                this.model.todos.resetQuery();
            },
            showEnds: function(){
                this.model.todos.query({checked:true});
            },
            showNotEnded: function(){
                this.model.todos.query({checked:false});
            }
        });
    }
);

