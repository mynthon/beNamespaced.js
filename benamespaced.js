function _beNamespaced(){
    this.rootNs = window
	this.currentNS = '';

};

_beNamespaced.prototype = {

	/*
	 * Add new element to namespace. if no root is given window is set as root.
	 *
	 * @param root object 	Optional param. This is the root object. If not given window object will be root
	 * @param ns string 		Dot separated path
	 * @param objectToAdd	Object to add namespace.
	 */
    add: function(root, ns, objectToAdd){
		var _objectToAdd, _ns, _root;

		if (arguments.length === 2){
			/* no root param was given, so rewrite params to correct vars */
			_objectToAdd = ns;
			_ns = root;
			_root = this.rootNs;
		} else {
			_objectToAdd = objectToAdd;
			_ns = ns;
			_root = root;
		}

		this.currentNS = _ns
        var nsSplit = _ns.split('.')
        this._addRecursive(nsSplit, 0, _root, _objectToAdd)
    },

    _addRecursive: function(ns, current, root, objectToAdd){
		var key = ns[current]

        if (current === (ns.length - 1)){
            root[key] = objectToAdd
        } else {

			if (root[key] === undefined) {
				root[key] = {}
			} else if (!this.isObject(root[key])) {
				throw new Error('Element ' + key + ' exists but cannot be extended in namespace ' + this.currentNS)
			}

            var newRoot = root[key]
            current++
            this._addRecursive(ns, current, newRoot, objectToAdd)
        }
    },

    get: function(ns){
		this.currentNS = ns
        var nsSplit = ns.split('.')
        return this._getRecursive(nsSplit, 0, this.rootNs)
    },

    _getRecursive: function(ns, current, root){
		var key = ns[current]

		if (!(key in root)){
			throw new Error('No element ' + key + ' in namespace ' + this.currentNS)
		}

        if (current === (ns.length - 1)){
            return root[ns[current]]
        } else {
            var newRoot = root[ns[current]]
            current++
            return this._getRecursive(ns, current, newRoot)
        }
    },


	isObject: function(_obj) {
		var _test  = _obj;
		return (  typeof _obj !== 'object' || _obj === null ?
              false :
              (
                (function () {
                  while (!false) {
                    if (  Object.getPrototypeOf( _test = Object.getPrototypeOf(_test)  ) === null) {
                      break;
                    }
                  }
                  return Object.getPrototypeOf(_obj) === _test;
                })()
              )
         );
	}
};


/*
ns = new _beNamespaced()
ns.add('dupa.blada.maryni', function(){console.log(1)})
ns.get('dupa.blada.maryni')()
dupa.blada.maryni()
*/