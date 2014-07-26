define([
    "dojo/_base/declare"
],
    function (declare) {
        /**
         * z-show attr Entity.
         */
        return declare("zax.mv.actions.zShow", null, {
            zShow: function (node,value) {
                node.style.display = value ? 'block' : 'none';
            }
        });
    }
);

