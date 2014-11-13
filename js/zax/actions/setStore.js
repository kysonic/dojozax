define([
    "dojo/_base/declare",
    "dojo/Stateful"
],
    function (declare, Stateful) {
        /**
         * Сущность setStore.
         */
        return declare("zax.mv.actions.setStore", null, {
            /**
             * Конструктор
             */
            constructor: function () {
            },
            setStore: function () {
                var self = this;
                /**
                 * Изменени базового метода set
                 * @type {Function}
                 */
                var setter = Stateful.prototype.set;
                Stateful.prototype.set = function (model, data) {
                    var modelName = model.replace(/data\./g, '');
                    //if(!self.inArray(self.changeState,model)) self.changeState.push(model);
                    //if(self.store.data.zGlobal) self[self.store.data.zGlobal].apply(self,arguments);
                    if (modelName && self.zStore[modelName]) self.zStore[modelName].data = data;
                    setter.apply(this, arguments);
                };
                var Store = declare([Stateful], {data: this.model});
                this.store = new Store();
            },
            inArray: function (array, value) {
                var inArray = false;
                for (key in array) {
                    var val = array[key];
                    if (val == value) inArray = true;
                }
                return inArray;
            }
        });
    }
);

