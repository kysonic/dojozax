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
                var query = domAttr.get(node,'z-query');
                var value = node.currentValue = !query ? this.zStore[strModel].data : this.useQuery(query,strModel,node);
                if(node.zEachTemplate ==undefined) node.zEachTemplate = lang.trim(node.innerHTML);
                domConstruct.empty(node);
                if(value instanceof Array){
                    var keys = this.getObjectKeys(value[0]);
                    array.forEach(value,function(item){
                        var itemHtml = node.zEachTemplate;
                        if(keys){
                            array.forEach(keys,function(key){
                                var regexp = new RegExp('\\~('+key+'.*?)\\~','ig');
                                itemHtml = itemHtml.replace(regexp,function(){
                                    return eval(arguments[1].replace(key,'item.'+key));
                                });
                            });
                        }else {
                            var itemHtml = node.zEachTemplate;
                            itemHtml = itemHtml.replace(/~(value.*?)~/ig,function(){
                                return eval(arguments[1].replace('value','item'));
                            });
                        }
                        node.innerHTML+=lang.trim(itemHtml);
                    });
                    /**
                     * Parse attrs in new Nodes
                     */
                    this.baseNode = node;
                    this.initialize(true);
                    this.baseNode = this.domNode;
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
                query = query.replace(/\~(.*?)\~/g,function(){
                    tmp = eval(arguments[1].replace(arguments[1],'self.model.'+arguments[1]));
                    return tmp;
                });
                var splitter = query.split('},{');
                var qQuery = splitter[0]+'}';
                var sQuery = '{'+splitter[1];
                try {
                    var qObject = eval('('+qQuery+')');
                    var sObject = sQuery ? eval('('+sQuery+')') :{};
                }catch(e){

                }
                node.queryValue = this.zStore[strModel].queryArray(qObject);
                return this.zStore[strModel] ? this.zStore[strModel].queryArray(qObject,sObject) : [];
            }
        });
    }
);

