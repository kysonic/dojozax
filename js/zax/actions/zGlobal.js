define([
    "dojo/_base/declare",
    "dojo/query",
    "dojo/dom-attr"
],
    function (declare, query, domAttr) {
        /**
         * Сущность mv.
         */
        return declare("zax.mv.actions.zGlobal", null, {
            zGlobal: function(){
                if(!this.store.data.zGlobal){
                    var zGlobalName = domAttr.get(this.baseNode,'z-global');
                    if(zGlobalName) this.store.data.zGlobal = zGlobalName;
                }
            }
        });
    }
);

