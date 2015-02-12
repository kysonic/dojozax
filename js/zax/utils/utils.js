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
            decorator: function decorator(f, cb1, cb2) {
                return function () {
                    var cbr = cb1(arguments);
                    f.apply(this, arguments);
                    if(cb2) cb2(cbr);
                }
            },
            decorateMethod: function(object,method,cb1,cb2){
                object[method] = this.decorator(object[method],cb1,cb2);
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
            objectSize:function(obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            },
            deleteMustaches: function(expr){
                return expr.replace('{{','').replace('}}','');
            },
            unWarp: function(node) {
                query(' > *', node).forEach(function(childNode) {
                    domConstruct.place(childNode, node, 'before');
                });
                domConstruct.destroy(node);
            },
            s4:function () {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            },
            createUID: function() {
                return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
                    this.s4() + '-' + this.s4() + this.s4() + this.s4();
                }
        }
    }
);

