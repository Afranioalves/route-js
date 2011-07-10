var properties = {
    Event: function (type, data) {
        if (type instanceof Array === false) {
            type = [String(type)]
        }
        // console.trace(type);
        // type=array
        // var store = arguments.callee.store
        var store = {}
        for (var i = 1; i < type.length; i++) {
            store = store[type[i]] || {}
        }
        store.data = store.data || data || {};
        store.events = store.events || {};
        if (!store.eventhandler) {
            store.eventhandler = {}
        }
        i = i - 1
        return store.eventhandler[type[i]] = store.eventhandler[type[i]] || {
            name: [String(type), type],
            emit: function (name, data) {
                if (arguments.length <= 1) { // refresher
                } else {
                    store.data[name] = data
                }
                if (name in store.events) {
                    for (var i = 0; i < store.events[name].length; i++) {
                        store.events[name][i](store.data[name])
                    }
                }
            },
            on: function (name, foo) {
                if (store.events[name] instanceof Array) {
                    store.events[name].push(foo)
                } else {
                    store.events[name] = [foo]
                }
                if (name in store.data) {
                    foo(store.data[name])
                }
            },
            get: function (name) {
                if (name in store.data) {
                    return store.data[name]
                }
                return null
            },
            has: function (name) {
                return name in store.data
            },
            appendChildEvent: function (_type, data) {
                return this.childEvents[this.childEvents.push(makeEvent(type.push(_type) ? type : type, data)) - 1]
            },
            childEvents: [],
            NEST_SIZE: i
        };
    },
    _Event: function (type, data, onInit, executeParent) {
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
        store.data = store.data || data || {};
        store.events = store.events || {};
        if (!store.eventhandler) {
            store.eventhandler = {}
        }
        i = i - 1
        return store.eventhandler[type[i]] = store.eventhandler[type[i]] || {
            has: function (name) {
                if (name instanceof Array === false) {
                    name = (name + "").split(/\\|\//img)
                }
                var _store = store.events
                for (var i = 0; i < name.length; i++) {
                    if ("string" !== typeof name[i]) {
                        name[i] = Sting(name[i])
                    }
                    if (name[i].trim() === "" && (_store instanceof Object) && i + 1 >= name.length) {
                        console.log(_store);
                        return Object.keys(_store).length > 0
                    } else {
                        _store = _store[name[i]]
                        if ((_store instanceof Array) === false) {
                            return false;
                        }
                        if (name.length > i + 1) {
                            _store = _store.childEvents
                        }
                    }
                }
                return ((_store instanceof Array) && _store.length > 0)
            },
            emit: function (name, data) {
                if (name instanceof Array === false) {
                    name = (name + "").split(/\\|\//img)
                }
                var _store = store.events
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
                    _store = _store[name[i]]
                    if (i + 1 >= name.length) {
                        _store.data = data
                        for (var _i = 0; _i < _store.length; _i++) {
                            if ("function" === typeof _store[_i]) {
                                _store[_i](_store.data)
                            }
                        }
                        if (!_store.emited) {
                            _store.emited = true
                        }
                    } else {
                        if (!executeParent) {
                            for (var _i = 0; _i < _store.length; _i++) {
                                if ("function" === typeof _store[_i]) {
                                    _store[i]()
                                }
                            }
                        }
                        _store = _store.childEvents
                    }
                }
            },
            on: function (name, foo, index) {
                if (name instanceof Array === false) {
                    name = (name + "").split(/\\|\//img)
                }
                var _store = store.events
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
                    _store = _store[name[i]]
                    if (name.length <= i + 1) {
                        if ("function" === typeof foo) {
                            if (!onInit && _store.emited) {
                                foo(_store.data)
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
                        }
                    }
                }
            },
            get: function (name) {
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
                        return _store.data
                    } else {
                        if (i + 1 < name.length) {
                            _store = _store.childEvents
                        }
                    }
                }

                return null
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
    },
    _observer: (window.MutationObserver ? function (foo, elm) {
        new window.MutationObserver(function (e) {
            for (var i = 0; i < e.length; i++) {
                for (var _i = 0; _i < e[i].addedNodes.length; _i++) {
                    foo(e[i].addedNodes[_i]);
                }
            }
        }).observe(elm || document, {
            childList: true,
            characterData: true,
            subtree: true,
        })
    } : function (foo) {
        elm.addEventListener('DOMNodeInserted', function (e) {
            foo(e.target);
        })
    }),
    observer: function (foo) {
        properties._observer(function (e) {
            if (e instanceof Comment && e.parentNode) {
                foo(e)
            } else if (e instanceof Element) {
                var val = document.createTreeWalker(e, NodeFilter.SHOW_COMMENT, null, false),
                    d;
                while (d = val.nextNode()) {
                    if (d.parentNode) {
                        foo(d)
                    }
                }
            }
        }, document)
    },
    re_entries: function (node) {
        for (var i = 0; i < node.__children__.length; i++) {
            if (node.__children__[i].__children__) {
                properties.re_entries(node.__children__[i])
            } else {
                if (node.__children__[i]._node) {
                properties.re_entries(node.__children__[i]._node)
                } else {
                    node.__children__[i].remove()
                }
            }
        }
    },
    entries: function (node, data, ch, cloned, x_data) {
        if (data['[[man-formed]]']) {
            properties.console.warn('unstable handler for type Promise',data)
        } else if (data instanceof DocumentFragment) {
            properties.entries(node, data.cloneNode(true).childNodes, ch, true)
            return
        } else if (data instanceof NodeList || data instanceof Array) {
            if (cloned) {
                for (var i = 0; data.length > 0; i++) {
                    if (data[0] instanceof Element) {
                        var val = document.createTreeWalker(data[0], NodeFilter.SHOW_COMMENT, null, false),
                            d;
                        while (d = val.nextNode()) {
                            if (d.data[0] + d.data[d.data.length - 1] === '??') {
                                properties.observer_callback(d, node)
                            }
                        }
                    }
                    properties.entries(node, data[0], i, cloned,x_data)
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i] instanceof Element) {
                        var val = document.createTreeWalker(data[i], NodeFilter.SHOW_COMMENT, null, false),
                            d;
                        while (d = val.nextNode()) {
                            if (d.data[0] + d.data[d.data.length - 1] === '??') {
                                properties.observer_callback(d, node)
                            }
                        }
                    }
                    properties.entries(node, data[i], i, cloned,x_data)
                }
            }
            return
        } else if (data instanceof Node && !cloned) {
            data = data.cloneNode(true)
        } else if (data instanceof Promise) {
             properties.console.warn('unstable handler for type Promise',data)
             var elm = document.createTextNode("")
            data.then(function (e) {
                properties.entries(node, arguments[0], true, cloned,elm)
            });
            data=elm
        }

        if (!(data instanceof Node)) {
            data = document.createTextNode(data)
        }

        if (!ch&&!x_data) {
            properties.re_entries(node)
            node.__children__ = [data]
        } else {
            node.__children__.push(data)
        }

        if (x_data) {
             node.target_child = x_data;
            x_data.parentElement.insertBefore(data, x_data)
        }else{
            if (node.target_child.nextSibling) {
                node.parentElement.insertBefore(data, node.target_child.nextSibling)
            } else {
                node.parentElement.appendChild(data)
            }
        }

        node.target_child = data
    },
    stringtolist: function (e) {
        var elm = arguments.callee.elm.cloneNode()
        elm.innerHTML = e;
        return elm.childNodes
    },
    exacute_data: function (e) {
        new Function(`
            var echo=arguments[0];
            var template = 
            `)(arguments[1])
    },
    observer_callback: function (e, d) {
        var data = e.data.substring(1, e.data.length - 1)
        var node = document.createTextNode('')
        e._node=node
        e.parentElement.replaceChild(node, e)
        node.__children__ = []

        data = data.trim().split(/\s/)
        node.__data__ = data[0].trim().split(':')
        data = data[1];
        if (data) {
            data = data.trim()
            if ('#'.includes(data[0])) {
                data = document.querySelector(data) || document.createTextNode('');
                data = data.content || data
            } else {
                data = properties.stringtolist(data)
            }
            if (!((e = properties.store[node.__data__[0]]) && (e = e.events) && (e = e.has(node.__data__[1])))) {
                e = undefined
                node.target_child = node;
                properties.entries(node, data, 0, true)
            }
        }
        properties.events.on(node.__data__[0], function () {
            arguments[0].on(node.__data__[1], function () {
                node.target_child = node;
                properties.entries(node, arguments[0])
            })
        })
    },
    console: console,
    store: {}
};
properties.stringtolist.elm = document.createElement('x');
properties.events = properties.Event('router', {})
properties.observer(properties.observer_callback, document);
(function () {
    // var b = '<b>bold</b> text <mark>mark</mark>'
    // var el = document.createElement('x');
    // el.innerHTML = b;
    window.RouteJs = arguments[0]
    RouteJs.initExtention = function(){
        
    }
    // var e = new RouteJs('app', {
    //     name: (el.innerHTML = "[<b>bold1</b> text <mark>mark</mark>6<mark>mark</mark>]", el.childNodes),
    //     name1: (el = el.cloneNode(), el.innerHTML = "<b>bold2</b> text<?app:name1?> <mark>mark</mark>6<mark>mark5</mark>", el.childNodes),
    //     name2: (el = el.cloneNode(), el.innerHTML = "[<b>bold3</b> text000<c><?app:name3?></c> <mark>mark</mark>6<mark>mark0</mark>]", el.childNodes),
    //     name3: '9000'
    // })
})(function (name, data) {
    if (typeof name !== "string") {
        return properties.console.error(`string expected, but ${typeof name} provided`)
    }
    name = name.toLowerCase().trim()
    if (properties.store.hasOwnProperty(name)) {
        return properties.store[name].items
    }
    var store = (properties.store[name] = {
        events: properties.Event(name, {}),
        items: this
    })



    // store.events.emit('name', opt.name)
    // store.events.emit('name3', opt.name3)
    // store.events.emit('name1', opt.name)
    // setTimeout(function() {
    //     store.events.emit('name', opt.name1)
    //     setTimeout(function() {
    //         store.events.emit('name1', opt.name2)
    //         setTimeout(function() {
    //             store.events.emit('name', opt.name3)
    //         }, 3000);
    //     }, 3000);
    // }, 3000);



    this.map = function (name, data) {
        if (typeof name !== "string") {
            return properties.console.error('invalid argument @map',name,data)
        }
        name = name.toLowerCase().trim()
        store.events.emit(name, data)
    }
    this.mapAll = function (data) {
        if (typeof data === 'object') {
            for (var key in data) {
                store.items.map(key, data[key])
            }
        } else {
            return properties.console.error('invalid argument @mapAll',data)
        }
    }

    this.createNodeList = function (string) {
        return properties.stringtolist(string)
    }
    this.createPromise = function (data,placeholder) {
        return {
            data:data,
            placeholder:placeholder,
            "[[man-formed]]":true
        }
    }
    this.mapAll(data)
    properties.events.emit(name, store.events)
})




/*
 if (arguments[1]) {
                    return;
                }
                var val = document.createTreeWalker(arguments[0], NodeFilter.SHOW_COMMENT, null, false)
                var d;
                while (d = val.nextNode()) {
                    entries.roll.examine(d);
                }

    (window.MutationObserver ? function (foo, elm) {
                new window.MutationObserver(function (e) {
                    for (var i = 0; i < e.length; i++) {
                        for (var _i = 0; _i < e[i].addedNodes.length; _i++) {
                            foo(e[i].addedNodes[_i]);
                        }
                    }
                }).observe(elm || document, {
                    childList: true,
                    characterData: true,
                    subtree: true,
                })
            } : function (foo) {
                console.error('browser not support')
                elm.addEventListener('DOMNodeInserted', function (e) {
                    foo(e.target);
                })
            })(foo, document);
*/