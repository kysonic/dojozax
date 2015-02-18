define([
        "dojo/_base/declare",
        "dojo/_base/array",
        "dojo/query",
        "dojo/parser",
        "dojo/dom-attr",
        "zax/utils/utils",
        "dojo/dom-construct",
        "dojo/dom-class",
        "zax/actions/Action"
    ],
    function (declare,array,query,parser,domAttr,Utils,domConstruct,domClass,Action) {
        /**
         * Parser entity
         */
        return declare("zWidget", null, {
            zWidget: function(zaxNode){
                var self = this;
                query('*[z-widget]',zaxNode).forEach(function(node){
                    domAttr.set(node, 'data-dojo-type', domAttr.get(node, 'z-widget'));
                    var container = domConstruct.create('div');
                    domClass.add(container,'widget-load');
                    domConstruct.place(container,node,'before');
                    domConstruct.place(node,container,'first');
                    parser.parse(container).then(function (widgets) {
                        widgets.forEach(function (widget) {
                            try {
                                self.bindWidget(node,widget,zaxNode);
                                self.removeBoundNode(node);
                                self.basicWidgetSets(widget.domNode.models.attrs,zaxNode);
                                Utils.unWarp(container);
                            }catch(e){
                                console.error(e);
                            }
                        });
                    });
                });
            },
            bindWidget: function(node,widget,zaxNode){
                widget.domNode.models = {};
                widget.domNode.actions= [];
                widget.canSet = true;
                /*for (var i = 0, atts = node.attributes, n = atts.length, arr = []; i < n; i++){
                    var attr = atts[i];
                    // TODO: Solve a problem with a dynamic adding new element (attribute evaluate code) or save tpl of attribute
                    if(this.bindExpr.expression.test(attr.nodeValue) && attr.nodeValue!=undefined) {
                        widget.domNode.models.attrs = this.getModelProperties(attr.nodeValue,zaxNode);
                        widget.domNode.widget = widget;
                        array.forEach(widget.domNode.models.attrs,function(item){
                            zaxNode.context.actionNode.zaxData.actions[item] = zaxNode.context.actionNode.zaxData.actions[item] || [];
                            zaxNode.zaxData.models.push(item);
                            var action = new Action({node:widget.domNode,attr:attr.nodeName.toLowerCase(),expression:attr.nodeValue,model:item,context:zaxNode.context});
                            zaxNode.context.actionNode.zaxData.actions[item].push(action);
                            widget.domNode.actions.push(action.uid);
                        });
                    }
                }*/
                for(var attrName in node.bindData.attrTemplates) {
                    var attrValue = node.bindData.attrTemplates[attrName];
                    widget.domNode.models.attrs = this.getModelProperties(attrValue,zaxNode);;
                    widget.domNode.widget = widget;
                    array.forEach(widget.domNode.models.attrs,function(item){
                        zaxNode.context.actionNode.zaxData.actions[item] = zaxNode.context.actionNode.zaxData.actions[item] || [];
                        zaxNode.zaxData.models.push(item);
                        var action = new Action({node:widget.domNode,attr:attrName.toLowerCase(),expression:attrValue,model:item,context:zaxNode.context});
                        zaxNode.context.actionNode.zaxData.actions[item].push(action);
                        widget.domNode.actions.push(action.uid);
                    });
                }
            },
            basicWidgetSets: function(models,zaxNode){
                if(models){
                    array.forEach(Utils.uniqueArray(models),function(property){
                        zaxNode.context[property] = zaxNode.context._context[property];
                    });
                }
            }
        });
    }
);



