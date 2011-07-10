 // if ('replaceWith' in e) {
        // } else {
        //     e.parentElement.replaceChild(node,e)
        // //     e.parentElement.insertBefore(node,e)
        // // e.remove()
        // }



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
                        return ((_store instanceof Array)&&_store.length>0)
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
            }
            ,
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
                console.error('browser not support')
                elm.addEventListener('DOMNodeInserted', function (e) {
                    foo(e.target);
                })
            }),
            observer: function(foo){
                properties._observer(function(e){
                    if (e instanceof Comment &&e.data[0]+e.data[e.data.length-1]==='??') {
                        foo(e)
                    }else if(e instanceof Element){
                        var val = document.createTreeWalker(e, NodeFilter.SHOW_COMMENT, null, false),
                        d;
                        while (d = val.nextNode()) {
                            if (d.data[0]+d.data[d.data.length-1]==='??') {
                                // foo(d)
                            }
                        }
                    }
                },document)
            },
            re_entries : function(node){
                 for (var i = 0; i < node.__children__.length; i++) {
                     if (node.__children__[i].__children__) {
                    properties.re_entries(node.__children__[i])
                     }else{
                        node.__children__[i].remove()
                     }
                    }
            },
            entries: function (node, data, ch) {
                if (!node.parentElement) {
                    return
                }
                if (data instanceof NodeList) {
                    for (var i = 0; i < data.length; i++) {
                        properties.entries(node, data[i], i)
                    }
                    return
                } else if (!(data instanceof Node)) {
                    data = document.createTextNode(data)
                } else {
                    data = data.cloneNode(true)
                }
                if (!ch) {
                    properties.re_entries(node)
                    node.__children__ = [data]
                }else{
                    node.__children__.push(data)
                }
        // console.log(node.parentElement,node,node.target_child);
                if (node.target_child.nextSibling) {
            node.parentElement.insertBefore(data, node.target_child.nextSibling)
        } else {
            node.parentElement.appendChild(data)
        }
        
        
                // document.insertBefore(data,node.target_child)
                node.target_child=data
        
                // console.log(node.__children__);
            },
            exacute_data: function (e) {
                new Function(`
                    var echo=arguments[0];
                    var template = 
                    `)(arguments[1])
            },
            store: {}
        };
        properties.events = properties.Event('router', {})
        properties.observer(function (e) {
                var node = document.createTextNode('')
                node.__data__ = e.data.substring(1, e.data.length - 1).trim().split(':')
                e.__children__=[node]
                e.replaceWith(node)
                node.__children__ = []
                node.data=node.__data__[1]
                properties.events.on(node.__data__[0], function () {
                    arguments[0].on(node.__data__[1], function () {
                      node.target_child=node;
                        properties.entries(node, arguments[0])
                    })
                })
                // properties.exacute_data(e,function() {
                // })
                // properties.entries(e)
        }, document);
        (function (g) {
            var b='<b>bold</b> text <mark>mark</mark>'
            var el=document.createElement('x');
            el.innerHTML=b;
            var e = new g('app', {
                name: (el.innerHTML="[<b>bold1</b> text <mark>mark</mark>6<mark>mark</mark>]",el.childNodes),
                name1: (el=el.cloneNode(),el.innerHTML="<b>bold2</b> text<?app:name1?> <mark>mark</mark>6<mark>mark5</mark>",el.childNodes),
                name2: (el=el.cloneNode(),el.innerHTML="[<b>bold3</b> text000<?app:name3?> <mark>mark</mark>6<mark>mark0</mark>]",el.childNodes),
                name3: '9000'
            })
        })(function (name, opt) {
        
            if (properties.store.hasOwnProperty(name)) {
                return properties.store[name].items
            }
            var store = (properties.store[name] = {
                events: properties.Event(name, {}),
                items: this
            })
        
        
        
            store.events.emit('name', opt.name)
            store.events.emit('name3', opt.name3)
            store.events.emit('name1', opt.name)
        setTimeout(() => {
            store.events.emit('name', opt.name1)
            setTimeout(() => {
                store.events.emit('name1',  opt.name2)
                setTimeout(() => {
                    store.events.emit('name',  opt.name3)
                }, 3000);
            }, 3000);
        }, 3000);
            // properties.state.on('d',function(e) {
            //     console.log(e);
            // })
        
        
            this.updateValue = function () {
        
            }
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