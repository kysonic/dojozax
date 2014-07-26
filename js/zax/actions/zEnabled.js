define([
    "dojo/_base/declare"
],
    function (declare) {
        /**
         * z-show attr Entity.
         */
        return declare("zax.mv.actions.zEnabled", null, {
            zEnabled: function (node,value) {
                node.disabled = value ? false : true;
            }
        });
    }
);

