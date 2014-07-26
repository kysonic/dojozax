define([
    "dojo/_base/declare",
    "dojo/query",
    "dojo/dom-attr"
],
    function (declare, query, domAttr) {
        /**
         * Сущность mv.
         */
        return declare("zax.mv.actions.parseNodes", null, {
            /**
             * Конструктор
             */
            constructor: function () {
            },
            parseNodes: function () {
                var self = this;
                query('*[z-node]', this.baseNode).forEach(function (node) {
                    self.nodes[domAttr.get(node, 'z-node')] = node;
                });
            }
        });
    }
);

