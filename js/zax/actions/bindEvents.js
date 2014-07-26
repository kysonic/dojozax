define([
    "dojo/_base/declare",
    "dojo/query",
    "dojo/on",
    "dojo/dom-attr",
    "dojo/_base/array",
    "dojo/_base/lang"
],
    function (declare, query, on, domAttr,array,lang) {
        /**
         * Сущность bindEvents.
         */
        return declare("zax.mv.actions.bindEvents", null, {
            events: ['z-click','z-change'],
            bindEvents: function () {
                var self = this;
                array.forEach(this.events,function(event){
                    query('*['+event+']', self.baseNode).forEach(function (node) {
                        on(node, event.split('-')[1], function () {
                            lang.getObject(domAttr.get(node, event), false, self).call(this, arguments, self);
                        });
                    });
                });
            }
        });
    }
);

