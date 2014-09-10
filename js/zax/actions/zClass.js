define([
    "dojo/_base/declare",
    "dojo/dom-class",
    "dojo/dom-attr"
],
    function (declare,domClass,domAttr) {
        /**
         * z-class attr Entity.
         */
        return declare("zax.mv.actions.zClass", null, {
            zClass: function (node,value) {
                var cls = domAttr.get(node, 'z-cls');
                if (cls) {
                    if (value) {
                        domClass.add(node, cls);
                    }
                    else {
                        domClass.remove(node, cls);
                    }
                }
            }
        });
    }
);

