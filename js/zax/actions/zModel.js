define([
    "dojo/_base/declare",
    "dojo/query",
    "dojo/on",
    "dojo/dom-attr",
    "dojo/dom-construct",
    "dojo/_base/lang",
    "dojo/has",
    "dojo/has",
    "zax/actions/zEach"
],
    function (declare, query, on, domAttr,domConstruct, lang,has,zEach) {
        /**
         * z-model attr Entity.
         */
        return declare("zax.mv.actions.zModel", [zEach], {
            zModel: function(node,value,strModel,watcherEvent){
                var self = this;
                /**
                 * Values
                 */
                this.setValues(node,value);
                /**
                 * Model
                 */
                lang.setObject(strModel, value, this.store.data);
                /**
                 * Watcher event
                 */
                this.setWatcherEvent(node,watcherEvent,strModel);
                /**
                 * dependent Attribute control
                 */
                this.dependentAttribute(node,value,strModel,watcherEvent);
                /**
                 * Debug
                 */
                if(this.options.isDebug) console.log(node,value,this.store.data)
            },
            setWatcherEvent: function(node,watcherEvent,strModel){
                var self = this;
                watcherEvent = watcherEvent ? watcherEvent == 'input' && has('ie')<9 ? 'keyup' : watcherEvent : 'keyup';
                if (watcherEvent && node[watcherEvent] == undefined) {
                    node[watcherEvent] = on(node, watcherEvent, function (event) {
                        self.store.set('data.' + strModel, this.value);
                    });
                }
            },
            setValues: function(node,value){
                if (value) {
                    if (domAttr.get(node, 'type') == 'text' || node.tagName.toLowerCase()=='select') node.value = value;
                    if (domAttr.get(node, 'type') == 'radio' || domAttr.get(node, 'type') == 'checkbox') node.checked = node.value == value;
                }
            },
            dependentAttribute: function(node,value,strModel,watcherEvent){
                this.zFunc(node,value,strModel,watcherEvent);
                this.zQuery(node,value,strModel,watcherEvent);
            },
            zFunc:function(node,value,strModel,watcherEvent){
                var zFunc = domAttr.get(node, 'z-func');
                if(zFunc){
                    lang.getObject(zFunc, false, this).call(this,node,value,strModel,watcherEvent);
                }
            },
            zQuery:function(node,value,strModel,watcherEvent){
                var zQuery = domAttr.get(node, 'z-query');
                var zEach =  domAttr.get(node, 'z-each');
                if(zQuery && zEach){
                    this.zEach(node,value,zEach);
                }
            }
        });
    }
);

