define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/date/locale",
    "dojo/_base/array",
    "dojo/on",
    "dojo/query",
    "dojo/parser",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom-construct",
    "zax/utils/utils"
],
    function (declare, lang,locale, array, on, query, parser, domAttr, domClass, domConstruct,Utils) {
        /**
         * Сущность zWidget.
         */
        return declare("ztel.mv.actions.zWidget", null, {
            /**
             * Конструктор
             */
            constructor: function () {
                this.Utils = new Utils();
            },
            zWidget: function () {
                var self = this;
                query('*[z-widget]', this.baseNode).forEach(function (node) {
                    domAttr.set(node, 'data-dojo-type', domAttr.get(node, 'z-widget'));
                    //domAttr.set(node, 'data-dojo-id', 'id:"' + Utils.randomString(5) + '"');
                    var container = domConstruct.create('div', {className: 'b-widgets'}, node, 'before');
                    domConstruct.place(node, container, 'first');
                    domClass.add(node, 'b-not-visible');
                    parser.parse(node.parentNode).then(function (widgets) {
                        widgets.forEach(function (widget) {
                            node.widget = widget;
                            var zModel =  domAttr.get(node, 'z-model');
                            var widgetName = (domAttr.get(node,'z-name') ? domAttr.get(node,'z-name') : zModel);
                            self.widgets[widgetName]=widget;
                            self.setAllNodeAttrs(widget, node);
                            if (domAttr.get(node, 'z-widget-on-load')) lang.getObject(domAttr.get(node, 'z-widget-on-load'), false, self).call(self, widget, node);
                            widget[domAttr.get(node, 'z-model-event')] = on(widget, widget['z-model-event'], function (v) {
                                var value = widget.get('value');
                                if(value instanceof Date) value = 'T'+locale.format(value, {datePattern: "HH:mm:ss", selector: "date"});
                                self.store.set('data.' + zModel, value);
                                if(!self.Utils.inArray(self.changeState,zModel)) self.changeState.push(zModel);
                            });
                            domClass.remove(widget.domNode, 'b-not-visible');
                            domClass.remove(container, 'b-widgets');
                            domConstruct.place(widget.domNode, container, 'before');
                            domConstruct.destroy(container);
                        });
                    });
                });
            },
            widgetSetValues: function (widget, value) {
                if (widget.declaredClass == "dijit.form.Select") {
                    this.setSelectValue(widget, value);
                } else {
                   if(widget.set) widget.set('value', value);
                }
                return value;
            },
            setAllNodeAttrs: function (widget, node) {
                array.forEach(this.getAttributes(node), function (attr) {
                    if (/z-/g.test(attr.attr)) domAttr.set(widget.domNode, attr.attr, attr.value)
                });
            },
            getAttributes: function (node) {
                var arr = [];
                for (var i = 0, attrs = node.attributes, l = attrs.length; i < l; i++) {
                    arr.push({attr: attrs.item(i).nodeName, value: attrs.item(i).value});
                }
                return arr;
            },
            setSelectValue: function (widget, value) {
                var self = this;
                widget[widget['z-model-event']].remove();
                widget.set('value', value);
                setTimeout(function () {
                    widget[widget['z-model-event']] = on(widget, widget['z-model-event'], function (v) {
                        self.store.set('data.' + widget['z-model'], widget.get('value'));
                    });
                }, 0);

                /*widget.set('ignoreEvent',true);
                 widget.set('value',value);
                 setTimeout(function(){
                 widget.set('ignoreEvent',false);
                 },0)*/
            }
        });
    }
);

