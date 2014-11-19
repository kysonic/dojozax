define([
    "dojo/_base/declare",
    "dojo/query",
    "dojo/on",
    "dojo/date/locale",
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
    function (declare, query, on,locale,xhr, domAttr, domConstruct, lang, array, Memory, zBind, zModel, zShow, zEnabled, zView, zClass, zEach) {
        /**
         * Base action entity.
         */
        return declare("zax.mv.actions.baseAction", [zBind, zModel, zShow, zEnabled, zView, zClass, zEach], {
            baseAction: function (attr) {
                var self = this;
                query('*[' + attr + ']', self.baseNode).forEach(function (node) {
                    var models = domAttr.get(node, attr);
                    var actionName = self.convertToCamel(attr);
                    var watcherEvent = domAttr.get(node, 'z-model-event');
                    var id = domAttr.get(node, 'z-id') || 'default';
                    array.forEach(models.split(' | '), function (expression) {
                        var models = expression.match(/(\s|[!<>=\+\-\*?\/\%\:]|)([a-zA-Z0-9\.])+/g);
                        array.forEach(models,function(model){
                            model = model.replace(/(\s|[!<>=\+\-\*\/\%\:])/g,'');
                            var executorName = model + '-' + actionName + '-' + id;
                            self.executors[model] = self.executors[model] || {};
                            self.executors[model][executorName] = {node: node, action: actionName,expression:expression};
                            var value = /~/g.test(expression) ? self.execute.call(self,expression) : lang.getObject(model, false, self.store.data); //
                            var modelData = lang.getObject(model, false, self.store.data);
                            if(!modelData && self.options.isDebug) console.debug('Your model has no instance '+model);
                            if(modelData && modelData instanceof Array && !self.zStore[model]) self.setMemory(model,lang.getObject(model, false, self.store.data));
                            if(actionName=='zModel') lang.setObject(model, value, self.store.data);
                            self[actionName].call(self, node, value, model,domAttr.get(node, 'z-not-first'));
                            if (watcherEvent && actionName!='zEach') self.setWatcherEvent(node, model, watcherEvent);
                        });
                    });
                });

            },
            setWatchers: function () {
                var self = this;
                for (var key in this.executors) {
                    if (self.watcher[key] == undefined) {
                        self.watcher[key] = self.store.watch('data.' + key, function (prop, action, value, oldValue) {
                            if (oldValue != value) {
                                for(var k in self.executors[prop.replace('data.', '')]){
                                    var item = self.executors[prop.replace('data.', '')][k];
                                    var replace = '$1"'+value+'"';
                                    var regexp = new RegExp('(\\s|[!<>=\\+\\-\\*\\/\\%\\:]|)('+ prop.replace('data.', '')+')','g');
                                    value = /~/g.test(item.expression) ?
                                        self.execute.call(self,item.expression.replace(regexp,replace)) : value;
                                    self[item.action].call(self, item.node, value, prop.replace('data.', ''));
                                }
                            }
                        });
                    }
                }
            },
            setMemory: function (strModel, value) {
                var own = this;
                var put  = Memory.prototype.put;
                var remove  = Memory.prototype.remove;
                Memory.prototype.put = function(){
                    put.apply(this,arguments);
                    own.store.set('data.' + strModel, this.data);
                }
                Memory.prototype.remove = function(){
                    remove.apply(this,arguments);
                    own.store.set('data.' + strModel, this.data);
                }
                Memory.prototype.update = function(query,values){
                    var item = this.query(query)[0];
                    if(item!=undefined) {
                        for(var key in values) {
                            var value = values[key];
                            item[key] = value;
                        }
                        own.store.set('data.' + strModel, declare.safeMixin(this.data,item));
                    }
                }
                this.zStore[strModel] = new Memory({data: value,
                    queryArray: function (query, sort) {
                        var queryArray = [];
                        this.query(query, sort).map(function (item) {
                            queryArray.push(item);
                        });
                        return queryArray;
                    },
                    getJson: function (target,localStorageName,callback,preProcessing) {
                        var self = this;
                        if(localStorage && localStorage.getItem(localStorageName)) {
                            var data = JSON.parse(localStorage.getItem(localStorageName))[target];
                            var date = locale.parse(JSON.parse(localStorage.getItem(localStorageName))[target+'date'], {datePattern: 'yyyy-MM-dd HH:mm:ss', selector: "date"});
                            var currentDelta = new Date()-date;
                            console.log('This value will be updated through '+ ((360*60*60-currentDelta)/60/60/360).toFixed(5) + ' hours');
                            if(currentDelta>360*60*60)  data = null;
                        }
                        if(data) {
                            self.data = data;
                            own.store.set('data.' + strModel, self.data);
                            if(callback) callback(data);
                        }else {
                            this.deffered = xhr(target, {
                                sync: false,
                                method: 'GET',
                                handleAs: 'json'
                            }).then(function (data) {
                                    if(localStorage && localStorageName) {
                                        var localData = localStorage.getItem(localStorageName) ? JSON.parse(localStorage.getItem(localStorageName)) : {};
                                        localData[target] = data;
                                        localData[target+'date'] = locale.format(new Date(), {datePattern: "yyyy-MM-dd HH:mm:ss", selector: "date"});
                                        localStorage.setItem(localStorageName, JSON.stringify(localData));
                                    }
                                    self.data = preProcessing ? preProcessing(data) : data;
                                    own.store.set('data.' + strModel, self.data);
                                    if(callback) callback(data);
                                },
                                function (err) {
                                    console.error(err);
                                });
                        }
                    }
                });
            },
            execute: function (strModel) {
                var result = '';
                var model = strModel.replace(/~/g, '').replace(/\\/g,',');
                var self = this;
                with (this.store.data) {
                    try {
                        result = eval(model);
                    }
                    catch(e){
                        result = '';
                    }
                }
                return result;
            },
            sortModel: function(wheare,nameOfPropertyArray){
                var sortModel = {};
                var self = this;
                var data = lang.getObject(wheare,false,self.store.data);
                if(data instanceof Array){
                    sortModel=[];
                    array.forEach(data,function(item){
                        var tmpItem = {};
                        array.forEach(nameOfPropertyArray,function(property){
                            lang.setObject(property, lang.getObject(property,false,item), tmpItem);
                        });
                        sortModel.push(tmpItem);
                    });
                }else {
                    array.forEach(nameOfPropertyArray,function(property){
                        lang.setObject(property, lang.getObject(property,false,lang.getObject(wheare,false,self.store.data)), sortModel);
                    });
                }
                return sortModel;
            },
            reset: function(data){
                var self = this;
                array.forEach(this.changeState,function(key){
                    var value = lang.getObject(key,false,data);
                    if(self.options.isDebug) console.log('%s has been restored with value %s',key,value);
                    self.store.set('data.'+key,value);
                });
                self.store.data = declare.safeMixin(self.store.data,data);
            },
            setModelData: function(data){
                var self = this;
                for(var key in data){
                    if(self.options.isDebug) console.log('%s has been set %s',key,value);
                    self.store.set('data.'+key,data[key]);
                }
            },
            addState: function(state){
                if(!this.inArray(this.changeState,state)) this.changeState.push(state);
            }
        });
    }
);

