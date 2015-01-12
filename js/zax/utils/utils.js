define([
    "dojo/dom-construct",
    "dojo/query"

],
    function (domConstruct,query) {
        /**
         * Additional zax functions
         */
        return {
            eEach: function (data, callback) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        callback(key, data[key]);
                    }
                }
            },
            inArray: function (array, value) {
                var inArray = false;
                this.eEach(array, function (key, val) {
                    if (val == value) inArray = true;
                });
                return inArray;
            },
            convertToCamel: function(str){
                return str.replace(/\-(\D+?)/g,function(){
                    return arguments[1].toUpperCase();
                });
            },
            decorator: function decorator(f, cb) {
                return function () {
                    cb(arguments);
                    f.apply(this, arguments);
                }
            },
            decorateMethod: function(object,method,cb){
                object[method] = this.decorator(object[method],cb);
            },
            uniqueArray: function (a) {
                var seen = {};
                var out = [];
                var len = a.length;
                var j = 0;
                for(var i = 0; i < len; i++) {
                    var item = a[i];
                    if(seen[item] !== 1) {
                        seen[item] = 1;
                        out[j++] = item;
                    }
                }
                return out;
            },
            deleteMustaches: function(expr){
                return expr.replace('{{','').replace('}}','');
            },
            unWarp: function(node) {
                query(' > *', node).forEach(function(childNode) {
                    domConstruct.place(childNode, node, 'before');
                });
                domConstruct.destroy(node);
            }
        }
    }
);

