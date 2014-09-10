define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/dom-attr",
    "zax/actions/zView"
],
    function (declare,array,lang,domConstruct,domAttr,zView) {
        /**
         * z-each attr Entity.
         */
        return declare("zax.mv.actions.zEach", [zView], {
            zEach: function (node,value,strModel) {
                var self = this;
                var query = domAttr.get(node,'z-query');
                var value = node.currentValue = !query ? this.zStore[strModel].data : this.useQuery(query,strModel,node);
                if(node.zEachTemplate ==undefined) node.zEachTemplate = lang.trim(node.innerHTML);
                domConstruct.empty(node);
                if(value instanceof Array){
                    var itemHtml = node.zEachTemplate;
                    var modelArray = itemHtml.match(/`(.*?)`/g);
                    array.forEach(value,function(item){
                        itemHtml = node.zEachTemplate;
                        array.forEach(modelArray,function(expression){
                            var model = expression.replace(/`/g,'');
                            var regexp = new RegExp('\\`('+model+'.*?)\\`','g');
                            itemHtml = itemHtml.replace(regexp,function(){
                                var exp = model=='value' ? 'item' : arguments[1].replace(model,'item.'+model);
                                return eval(exp);
                            });
                        });
                        domConstruct.place(lang.trim(itemHtml),node,'last');
                    });
                    /**
                     * Parse attrs in new Nodes
                     */
                    this.parseView(node);
                }
            },
            getObjectKeys: function(o){
                var keys = [];
                for(var k in o) keys.push(k);
                return keys[0] ? keys : false;
            },
            useQuery: function(query,strModel,node){
                var self = this;
                var tmp = '';
                query = query.replace(/\`(.*?)\`/g,function(){
                    tmp = eval(arguments[1].replace(arguments[1],'self.store.data.'+arguments[1]));
                    return tmp;
                });
                var splitter = query.split('},{');
                var qQuery = splitter[0]+'}';
                var sQuery = '{'+splitter[1];
                try {
                    var qObject = eval('('+qQuery+')');
                    var sObject = sQuery ? eval('('+sQuery+')') :{};
                }catch(e){
                    console.log('Query is wrong!');
                    return this.zStore[strModel].queryArray({},{});
                }
                node.queryValue = this.zStore[strModel].queryArray(qObject);
                return this.zStore[strModel] ? this.zStore[strModel].queryArray(qObject,sObject) : [];
            }
        });
    }
);

