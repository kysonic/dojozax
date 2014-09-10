define([
    "dojo/_base/declare",
    "dojo/dom-style"
],
    function (declare,domStyle) {
        /**
         * z-show attr Entity.
         */
        return declare("zax.mv.actions.zShow", null, {
            zShow: function (node,value) {
                if(value instanceof Array) value = value[0] ? value : null;
                if(!node.display) node.display = domStyle.get(node,'display');
                domStyle.set(node,'display',value ? node.display : 'none');
            }
        });
    }
);

