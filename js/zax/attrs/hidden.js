define([
    "dojo/_base/declare",
    "zax/polyfills/getComputedStyle",
    "dojo/dom-attr",
    "dojo/on"
],
    function (declare,domAttr,on) {
        /**
         * Parser entity
         */
        return declare("hidden", null, {
            hidden: function(p,o,n){
                this.attrExecutor();
                // IE hidden Polyfill
                if(/MSIE (8|9|10)/.test(window.navigator.userAgent)){
                    this.startDisplay = this.startDisplay || getComputedStyle(this.node).display;
                    this.node.style.display = n ? this.startDisplay=='none' ? 'block' : this.startDisplay : 'none';
                }
            }
        });
    }
);


