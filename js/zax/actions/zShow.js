define([
    "dojo/_base/declare",
    "dojo/dom-style",
    "dojo/dom-attr"
],
    function (declare,domStyle,domAttr) {
        /**
         * z-show attr Entity.
         */
        return declare("zax.mv.actions.zShow", null, {
            zShow: function (node,value) {
                if(value instanceof Array) value = value[0] ? value : null;
                if(!node.display) node.display = domStyle.get(node,'display');
                domStyle.set(node,'display',value ? domAttr.get(node,'z-display') ? domAttr.get(node,'z-display') : node.display : 'none');
            }
        });
    }
);

