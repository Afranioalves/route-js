/**
 * @todo fixe call stack loop
 * @properties > @observer @entries @observer_callback
 */

 var properties = {
    Event: function (type, data) {
        if (type instanceof Array === false) {
            type = [String(type)]
        }
        
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
            properties.console.warn('unstable handler for type Promise', data)
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
                    properties.entries(node, data[0], i, cloned, x_data)
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
                    properties.entries(node, data[i], i, cloned, x_data)
                }
            }
            return
        } else if (data instanceof Node && !cloned) {
            data = data.cloneNode(true)
        } else if (data instanceof Promise) {
            properties.console.warn('unstable handler for type Promise', data)
            var elm = document.createTextNode("")
            data.then(function (e) {
                properties.entries(node, arguments[0], true, cloned, elm)
            });
            data = elm
        }

        if (data instanceof Comment) {
            data.parent_data = node.__data__.join(':')
        }

        if (!(data instanceof Node)) {
            data = document.createTextNode(data)
        }

        if (!ch && !x_data) {
            properties.re_entries(node)
            node.__children__ = [data]
        } else {
            node.__children__.push(data)
        }

        if (x_data) {
            node.target_child = x_data;
            x_data.parentElement.insertBefore(data, x_data)
        } else {
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

    },
    observer_callback: function (e) {
        var data = e.data.substring(1, e.data.length - 1)
        var node = document.createTextNode('')
        e._node = node
        e.parentElement.replaceChild(node, e)
        node.__children__ = []

        data = data.trim().split(/\s/)
        node.__data__ = data[0].trim().toLowerCase()

        if (node.__data__ === e.parent_data) {
            return properties.console.error('map stack limit reached.', node.__data__)
        }

        node.__data__ = node.__data__.split(':')
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
        return node
    },
    console: console,
    store: {}
};
properties.stringtolist.elm = document.createElement('x');
properties.events = properties.Event('router', {})
properties.observer(properties.observer_callback, document);
(function () {
    window.RouteJs = arguments[0]
    RouteJs.initExtention = function () {

    }
})(function (name, data) {
    if (typeof name !== "string") {
        return properties.console.error(`string expected, but ${typeof name} provided`, name, data)
    }
    name = name.toLowerCase().trim()
    if (properties.store.hasOwnProperty(name)) {
        return properties.store[name].items
    }
    var store = (properties.store[name] = {
        events: properties.Event(name, {}),
        items: this
    })

    this.map = function (name, data) {
        if (typeof name !== "string") {
            return properties.console.error('invalid argument @map', name, data)
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
            return properties.console.error('invalid argument @mapAll', data)
        }
    }

    this.createNodeList = function (string) {
        return properties.stringtolist(string)
    }
    this.createPromise = function (data, placeholder) {
        return {
            data: data,
            placeholder: placeholder,
            "[[man-formed]]": true
        }
    }
    this.mapAll(data)
    properties.events.emit(name, store.events)
})