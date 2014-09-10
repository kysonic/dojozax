define([
    "dojo/_base/declare",
    "dojo/query",
    "dojo/on",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom-construct",
    "dojo/_base/lang",
    "dojo/has",
    "dojo/has",
    "zax/actions/zEach",
    "zax/actions/zWidget"
],
    function (declare, query, on, array, domAttr, domConstruct, lang, has, zEach,zWidget) {
        /**
         * z-model attr Entity.
         */
        return declare("zax.mv.actions.zModel", [zEach,zWidget], {
            zModel: function (node, value, model,notDependent) {
                value = node.widget ? this.widgetSetValues(node.widget,value) : this.setValues(node, value); //:
                model = domAttr.get(node,'z-model');
                lang.setObject(model, value, this.store.data);
                if(!notDependent) this.dependentAttribute(node, value, model);
                if(this[this.store.data.zGlobal]) this[this.store.data.zGlobal].call(this,this.baseNode);
                if (this.options.isDebug) console.log(node, value, this.store.data)
            },
            setWatcherEvent: function (node, strModel, watcherEvent) {
                var self = this;
                watcherEvent = watcherEvent ? watcherEvent == 'input' && has('ie') < 9 ? 'keyup' : watcherEvent : 'keyup';
                if (watcherEvent && node[watcherEvent] == undefined) {
                    node.model = strModel;
                    node.watcherEvent = watcherEvent;
                    node.callback = function (event) {
                        var value = node.type == 'checkbox' ? this.checked : this.value;
                        self.store.set('data.' + strModel, value);
                    };
                    domAttr.set(node,'z-have-model-event',watcherEvent);
                    node[watcherEvent] = on(node, watcherEvent, node.callback);
                }
            },
            setValues: function (node, value) {
                if (value!=undefined && !node.widget) {
                    if (node.tagName.toLowerCase() == 'select') {
                        node.value = value;
                        if (!node.value) node.value = node.options[0] ? node.options[0].value : '';
                        if (node.value) value = node.value;
                    }
                    if (domAttr.get(node, 'type') == 'text') node.value = value;
                    if (domAttr.get(node, 'type') == 'radio') node.checked = node.value == value;
                    if (domAttr.get(node, 'type') == 'checkbox') node.checked = value;
                    return value;
                }
            },
            dependentAttribute: function (node, value, strModel, watcherEvent) {
                this.zFunc(node, value, strModel, watcherEvent);
                this.zQuery(node, value, strModel, watcherEvent);
            },
            zFunc: function (node, value, strModel, watcherEvent) {
                var self = this;
                var zFunc = domAttr.get(node, 'z-func');
                if (zFunc) {
                    array.forEach(zFunc.split(','), function (func) {
                        if (lang.getObject(func, false, self)) lang.getObject(func, false, self).call(self, node, value, strModel, watcherEvent);
                    });
                }
            },
            zQuery: function (node, value, strModel, watcherEvent) {
                var zQuery = domAttr.get(node, 'z-query');
                var zEach = domAttr.get(node, 'z-each');
                if (zQuery && zEach) {
                    this.zEach(node, value, zEach);
                }
            }
        });
    }
);

