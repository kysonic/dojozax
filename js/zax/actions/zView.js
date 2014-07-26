define([
    "dojo/_base/declare",
    "dojo/dom-construct"
],
    function (declare,domConstruct) {
        /**
         * z-view attr Entity.
         */
        return declare("zax.mv.actions.zView", null, {
            zView: function (node,value) {
                domConstruct.empty(node);
                var view = domConstruct.place(value, node);
                this.baseNode = view.parentNode;
                this.initialize(true);
                this.baseNode = this.domNode;
            }
        });
    }
);

