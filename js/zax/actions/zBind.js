define([
    "dojo/_base/declare"
],
    function (declare) {
        /**
         * z-bind attr Entity.
         */
        return declare("zax.mv.actions.zBind", null, {
            zBind: function (node,value) {
                node.innerHTML = value ? value : '';
            }
        });
    }
);

