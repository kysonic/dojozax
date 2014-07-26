define([
    "dojo/_base/declare",
    "dojo/query",
    "dojo/on",
    "dojo/request/xhr",
    "dojo/dom-attr",
    "dojo/dom-construct",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/store/Memory",
    "zax/actions/zBind",
    "zax/actions/zModel",
    "zax/actions/zShow",
    "zax/actions/zEnabled",
    "zax/actions/zView",
    "zax/actions/zClass",
    "zax/actions/zEach"
],
    function (declare, query, on, xhr, domAttr, domConstruct, lang, array, Memory, zBind, zModel, zShow, zEnabled, zView, zClass, zEach) {
        /**
         * Base action entity.
         */
        return declare("zax.mv.actions.baseAction", [zBind, zModel, zShow, zEnabled, zView, zClass, zEach], {
            baseAction: function (attr) {
                var self = this;
                query('*[' + attr + ']', self.baseNode).forEach(function (node) {
                    var own = this;
                    /**
                     * Get all strings and variables
                     */
                    var strModels = domAttr.get(node, attr).split(',');
                    array.forEach(strModels, function (strModel) {
                        var id = domAttr.get(node, 'z-id');
                        id = id ? id : 'notUnique';
                        var watcherEvent = domAttr.get(node, 'z-model-event');
                        watcherEvent = watcherEvent ? watcherEvent : '';
                        var watcherName = watcherEvent ? attr + '-' + strModel + '-' + id + '-' + watcherEvent : attr + '-' + strModel + '-' + id;
                        var value = lang.getObject(strModel, false, self.store.data);
                        if (value instanceof Array || value instanceof Object) self.setMemory(strModel, value);
                        /**
                         * Unwatch if this watcher exist
                         */
                        if (self.watcher[watcherName] !== undefined) self.watcher[watcherName].unwatch();
                        var actionName = self.convertToCamel(attr);
                        self.watcher[watcherName] = self.store.watch('data.' + strModel, function (name, oldValue, value) {
                            self[actionName](node, value, strModel, watcherEvent, watcherName);
                        });
                        self[actionName](node, value, strModel, watcherEvent, watcherName);
                    });
                });
            },
            setMemory: function (strModel, value) {
                var own = this;
                this.zStore[strModel] = new Memory({data: value,
                    queryArray: function (query, sort) {
                        var queryArray = [];
                        this.query(query, sort).map(function (item) {
                            queryArray.push(item);
                        });
                        return queryArray;
                    },
                    getJson: function (target) {
                        var self = this;
                        this.deffered = xhr(target, {
                            sync: false,
                            method: 'GET',
                            handleAs: 'json'
                        }).then(function (data) {
                                self.data = data;
                                own.store.set('data.'+strModel,self.data);
                            },
                            function (err) {
                                console.error(err);
                            });
                    }
                });
            }
        });
    }
);

