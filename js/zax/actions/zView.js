define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "zax/actions/zHaveModelEvent"
],
    function (declare,domConstruct,zHaveModelEvent) {
        /**
         * z-view attr Entity.
         */
        return declare("zax.mv.actions.zView", [zHaveModelEvent], {
            zView: function (node,value) {
                this.zHaveModelEvent(node);
                domConstruct.empty(node);
                node.innerHTML='';
                node.innerHTML = value;
                this.baseNode = node;
                this.initialize(true);
                this.baseNode = this.domNode;
            }
        });
    }
);

