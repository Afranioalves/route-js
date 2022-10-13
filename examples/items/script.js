/** @init RouteJs */
var app = new RouteJs('app', {
    name: 'RouteJs',
    item: "Hello App"
});

event= function (type, data, onInit, childAffectsParent) {
    if (2>=arguments.length) {
        onInit=true
    }
    if (3>=arguments.length) {
        childAffectsParent=true
    }

    var EventData = function () {
        this.value = arguments[0]
        this.childData = {}
    }
    if (type instanceof Array === false) {
        type = (type + "").split(/\\|\//img)
    }
    // console.trace(type);
    // type=array
    if ("object" !== typeof arguments.callee.store || !(arguments.callee.store instanceof Object)) {
        arguments.callee.store = {}
    }
    var store = arguments.callee.store,
        childEvents = [];
    for (var i = 1; i < type.length; i++) {
        store = store[type[i]] || {}
    }
    store.events = store.events || {};
    store.data = {};
console.dir(store.data);
    i = i - 1
    return {
        has: function (name) {
            if (name instanceof Array === false) {
                name = (name + "").split(/\\|\//img)
            }
            var _data = store.data
            for (var i = 0; i < name.length; i++) {
                if ("string" !== typeof name[i]) {
                    name[i] = Sting(name[i])
                }
                if (typeof _data[name[i]] !== "object") {
                    if (!_data.hasOwnProperty(name[i])) {
                        return false
                    }
                }
                
                if ( i + 1 >= name.length) {
                    return true
                } else {
                    _data = _data[name[i]]
                }
            }
            return false
        },
        emit: function (name, data) {
            if (name instanceof Array === false) {
                name = (name + "").split(/\\|\//img)
            }
            var _store = store.events
            var _data= store.data
            for (var i = 0; i < name.length; i++) {
                if ("string" !== typeof name[i]) {
                    name[i] = Sting(name[i])
                }
                if (name[i] === "") {
                    return
                }
                
                if ((_store[name[i]] instanceof Array) === false) {
                    _store[name[i]] = new Array()
                    _store[name[i]].childEvents = {}
                    _store = _store[name[i]]
                    _store.emited = true
                }else{
                    _store = _store[name[i]]
                }
                // if (typeof _data[name[i]] !== "object") {
                //     if (!_data.hasOwnProperty(name[i])) {
                //         _data[name[i]]={}
                //     }
                // }

                if (typeof _data[name[i]] !== "object") {
                    if (!_data.hasOwnProperty(name[i])) {
                        _data={}
                if (name.length > i + 1) {
                    _data[name[i]]={}
                }
                    }
                }

                if (i + 1 >= name.length) {
                    // _store.data = data
                    _data[name[i]]=data
                    for (var _i = 0; _i < _store.length; _i++) {
                        if ("function" === typeof _store[_i]) {
                            _store[_i](data)
                        }
                    }
                    if (!_store.emited) {
                        _store.emited = true
                    }
                } else {
                    if (childAffectsParent) {
                        for (var _i = 0; _i < _store.length; _i++) {
                            if ("function" === typeof _store[_i]) {
                                _store[i]()
                            }
                        }
                    }
                    _store = _store.childEvents
                _data=_data[name[i]]
                }
            }
        },
        on: function (name, foo, index) {
            if (name instanceof Array === false) {
                name = (name + "").split(/\\|\//img)
            }
            var _store = store.events
            var _data= store.data

            for (var i = 0; i < name.length; i++) {
                if ("string" !== typeof name[i]) {
                    name[i] = Sting(name[i])
                }
                if (name[i] === "") {
                    return
                }
                if ((_store[name[i]] instanceof Array) === false) {
                    _store[name[i]] = new Array()
                    _store[name[i]].childEvents = {}
                }
                if (typeof _data[name[i]] !== "object") {
                    if (!_data.hasOwnProperty(name[i])) {
                        _data={}
                // if (name.length > i + 1) {
                //     _data[name[i]]={}
                // }
                    }
                }
                _store = _store[name[i]]
                if (name.length <= i + 1) {
                    _data=_data[name[i]]
                    if ("function" === typeof foo) {
                        if (onInit || _store.emited) {
                            foo(_data)
                        }
                        if (index && _store.length > index) {
                            _store[index] = foo
                        } else {
                            _store.push(foo)
                        }
                        return _store.length - 1
                    }
                } else {
                    if (i + 1 < name.length) {
                        _store = _store.childEvents
                _data=_data[name[i]]
                    }
                }
            }
        },
        get: function (name) {
            if (name instanceof Array === false) {
                name = (name + "").split(/\\|\//img)
            }
            var _data = store.data
            for (var i = 0; i < name.length; i++) {
                if ("string" !== typeof name[i]) {
                    name[i] = Sting(name[i])
                }
                if (typeof _data[name[i]] !== "object") {
                    if (!_data.hasOwnProperty(name[i])) {
                        return undefined
                    }
                }
                
                if ( i + 1 >= name.length) {
                    return _data[name[i]]
                } else {
                    _data = _data[name[i]]
                }
            }

            return undefined
        },
        clearEvent: function (name, index) {
            if (name instanceof Array === false) {
                name = (name + "").split(/\\|\//img)
            }
            var _store = store.events
            for (var i = 0; i < name.length; i++) {
                if ("string" !== typeof name[i]) {
                    name[i] = Sting(name[i])
                }
                _store = _store[name[i]]
                if (!_store) {
                    break;
                }
                if (name.length <= i + 1) {
                    if (index < _store.length) {
                        _store[index] = null
                        return true
                    } else {
                        break
                    }
                } else {
                    if (i + 1 < name.length) {
                        _store = _store.childEvents
                    }
                }
            }
            return false
        },
        clearAllEvents: function (name) {
            if (name instanceof Array === false) {
                name = (name + "").split(/\\|\//img)
            }
            var _store = store.events
            for (var i = 0; i < name.length; i++) {
                if ("string" !== typeof name[i]) {
                    name[i] = Sting(name[i])
                }
                _store = _store[name[i]]
                if (!_store) {
                    break;
                }
                if (name.length <= i + 1) {
                    _store.length = 0
                    return true
                } else {
                    if (i + 1 < name.length) {
                        _store = _store.childEvents
                    }
                }
            }
            return false
        },
        appendChildEvent: function (_type, data, _1, _2, _3) {
            return childEvents[childEvents.push(exe.cores.event(type.push(_type) ? type : type, data, _1, _2, _3)) - 1]
        },
        get name() {
            return [String(type), type]
        },
        get childEvents() {
            return childEvents
        },
        get NEST_SIZE() {
            return i
        }
    };
}

d= event(['page'],undefined)
d.on('parent/child/l',function(e){
    console.log('child/l',e);
})

d.on('parent',function(e){
    console.log('parent',e);
})

d.emit('parent','mom')

console.dir(d.get('parent'));