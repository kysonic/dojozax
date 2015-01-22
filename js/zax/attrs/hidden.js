define([
    "dojo/_base/declare",
    "dojo/dom-class",
    "zax/polyfills/getComputedStyle"

],
    function (declare,domClass,getCompStyles) {
        /**
         * Parser entity
         */
        return declare("hidden", null, {
            hidden: function(p,o,n){
                this.attrExecutor();
                // IE hidden Polyfill
                if(!!n) domClass.add(this.node,'hide'); else domClass.remove(this.node,'hide');
                if(/MSIE (8|9|10)/.test(window.navigator.userAgent)){
                    this.startDisplay = this.startDisplay || getComputedStyle(this.node).display;
                    this.node.style.display = n ? 'none' : this.startDisplay ? this.startDisplay : 'block';
                }
            }
        });
    }
);


