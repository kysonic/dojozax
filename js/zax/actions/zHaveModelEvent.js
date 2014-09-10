define([
    "dojo/_base/declare",
    "dojo/query",
    "dojo/dom-attr"
],
    function (declare, query, domAttr) {
        /**
         * Сущность mv.
         */
        return declare("zax.mv.actions.zHaveModelEvent", null, {
            zHaveModelEvent: function (node) {
                var self = this;
                query('*[z-have-model-event]', node).forEach(function (node) {
                    if(node[domAttr.get(node,'z-have-model-event')]) node[domAttr.get(node,'z-have-model-event')].remove();
                    delete node[domAttr.get(node,'z-have-model-event')];
                });
            }
        });
    }
);

