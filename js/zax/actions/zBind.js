define([
    "dojo/_base/declare",
    "dojo/dom-attr"
],
    function (declare,domAttr) {
        /**
         * z-bind attr Entity.
         */
        return declare("zax.mv.actions.zBind", null, {
            zBind: function (node,value,model,notFirst) {
                var zFunc = domAttr.get(node,'z-func');
                if(node.tagName.toLowerCase()=='input') {
                    if(!notFirst) node.value = value ? zFunc ? this[zFunc].call(this,node,value) : value : '';
                }else {
                    if(!notFirst) node.innerHTML = value ? zFunc ? this[zFunc].call(this,node,value) : value : '';
                }

            }
        });
    }
);

