function _beNamespaced(rootNs){
    this.rootNs = rootNs
    if (window[rootNs] === undefined){
        window[rootNs] = {}
    }
};

_beNamespaced.prototype = {
    add: function(ns, objectToAdd){
        var nsSplit = ns.split('.')
        this._addRecursive(nsSplit, 0, window[this.rootNs], objectToAdd)
    },
    
    _addRecursive: function(ns, current, root, objectToAdd){
        if (root[ns[current]] === undefined) {
            root[ns[current]] = {}
        }
        
        if (current === (ns.length - 1)){
            root[ns[current]] = objectToAdd
        } else {
            var newRoot = root[ns[current]]
            current++
            this._addRecursive(ns, current, newRoot, objectToAdd)
        }
    },
    
    get: function(ns){
        var nsSplit = ns.split('.')
        return this._getRecursive(nsSplit, 0, window[this.rootNs])
    },
    
    _getRecursive: function(ns, current, root){
        if (current === (ns.length - 1)){
            return root[ns[current]]
        } else {
            var newRoot = root[ns[current]]
            current++
            return this._getRecursive(ns, current, newRoot)
        }
    }
};



ns = new _beNamespaced('_root')

ns.add('dupa.blada.maryni', function(){alert(1)})
ns.get('dupa.blada.maryni')()
window['_root']