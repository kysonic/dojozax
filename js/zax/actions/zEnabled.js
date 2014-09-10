define([
    "dojo/_base/declare",
    "dojo/dom-attr"
],
    function (declare,domAttr) {
        /**
         * z-show attr Entity.
         */
        return declare("zax.mv.actions.zEnabled", null, {
            zEnabled: function (node,value) {
                var zEnt = domAttr.get(node,'z-ent');
                node.disabled =  zEnt ? !(zEnt==value) : value ? false : true;
                if(node.widget) node.widget.set('disabled',zEnt ? !(zEnt==value) : value ? false : true);
            }
        });
    }
);

