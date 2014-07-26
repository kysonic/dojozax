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
                var Store = declare([Stateful], {data: this.model});
                this.store = new Store();
            }
        });
    }
);

