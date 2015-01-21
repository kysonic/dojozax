Dojozax
=======

Zax is a small MV framework based on dojo.

#Basics 

Structural unit of dojo zax is a html tag with data-dojo-type attribute (called ZaxNode) when constraint link of coincident class (use dojo declare). This class must be inherits of zax/mv base class. For default parsing you must on parseOnLoad setting in  [dojoConfig](http://dojotoolkit.org/documentation/tutorials/1.9/dojo_config/).

Dojo zax works as follows: 
  1. Parsing. 
  2. Binding.
  
All subsequent steps with the DOM occur at the level of adding\removing nodes with special core methods - injectBoundHTML and removeBoundNode. 




