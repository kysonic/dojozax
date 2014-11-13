define([
    "dojo/_base/declare"
],
    function (declare) {
        /**
         * Additional zax functions
         */
        return declare("zax.util", null, {
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
            }
        });
    }
);

