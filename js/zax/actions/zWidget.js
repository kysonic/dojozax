define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/on",
    "dojo/query",
    "dojo/parser",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom-construct"
],
    function (declare, lang, array, on, query, parser, domAttr, domClass, domConstruct) {
        /**
         * Сущность zWidget.
         */
        return declare("ztel.mv.actions.zWidget", null, {
            /**
             * Конструктор
             */
            constructor: function () {
            },
            zWidget: function () {
                var self = this;
                query('*[z-widget]', this.baseNode).forEach(function (node) {
                    domAttr.set(node, 'data-dojo-type', domAttr.get(node, 'z-widget'));
                    domAttr.set(node, 'data-dojo-props', 'id:"' + Utils.randomString(5) + '"');
                    var container = domConstruct.create('div', {className: 'b-widgets'}, node, 'before');
                    domConstruct.place(node, container, 'first');
                    domClass.add(node, 'b-not-visible');
                    parser.parse(node.parentNode).then(function (widgets) {
                        widgets.forEach(function (widget) {
                            node.widget = widget;
                            self.setAllNodeAttrs(widget, node);
                            if (domAttr.get(node, 'z-widget-on-load')) lang.getObject(domAttr.get(node, 'z-widget-on-load'), false, self).call(self, widget, node);
                            widget[domAttr.get(node, 'z-model-event')] = on(widget, widget['z-model-event'], function (v) {
                                self.store.set('data.' + domAttr.get(node, 'z-model'), widget.get('value'));
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
                    widget.set('value', value);
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

