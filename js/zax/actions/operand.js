define([
    "dojo/_base/declare",
    "dojo/query",
    "dojo/dom-attr",
    "dojo/dom-construct"
],
    function (declare, query, domAttr,domConstruct) {
        /**
         * Сущность execOperand.
         */
        return declare("zax.mv.actions.operand", null, {
            operand: function () {
                var self = this;
                query('*[z-for]', this.baseNode).forEach(function (node) {
                    var inc = domAttr.get(node, 'z-for').split('-');
                    var html = '';
                    var step = inc[3] ? parseInt(inc[3]) : 1;
                    var tpl = node.outerHTML.replace(/z\-for=.+?("|')/g, '');
                    for (var i = parseInt(inc[0]); i <= parseInt(inc[1]); i += step) {
                        html += tpl.replace(/\!(i.*?)\!/g, function () {
                            return eval(arguments[1]);
                        });
                    }
                    domConstruct.place(html, node, 'after');
                    domConstruct.destroy(node);
                });
            }
        });
    }
);

