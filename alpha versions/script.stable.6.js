/**
 * @problem fixed
 * @todo fixe map stack overflow
 * @properties <\> @observer @entries @observer_callback
 */

/**
 * @problem fixed
 * @todo use elements for mapping
 * @properties <\> @observer @entries @observer_callback
 */

/**
 * @problem fixed
 * @todo use bottom to top loop for handler remover
 * @properties <\> @re_entries @observer_callback
 */


 (function () {
    /**
     * @Legacy
     */
    if (!window.Promise) {
        window.Promise = new Function()
        Node.prototype.remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this)
            }
        }
    }


    var properties = {
        useElement: 1,
        nameSpace: {
            attribute: 'route'
        },
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
                    data = undefined
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
                    foo = undefined
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
                e = undefined
            }).observe(elm || document, {
                childList: true,
                characterData: true,
                subtree: true,
            })
            elm = undefined
        } : function (foo, elm) {
            elm.addEventListener('DOMNodeInserted', function (e) {
                foo(e.target);
                e = undefined
            })
            elm = undefined
        }),
        observer: function (foo) {
            properties._observer(function (e) {
                if (e instanceof Comment && e.parentNode) {
                    foo(e)
                } else if (e instanceof Element) {
                    if (properties.useElement) {
                        if (e.hasAttribute(properties.nameSpace.attribute)) {
                            foo(e, 'element')
                        } else {
                            var _e = e.querySelectorAll('[' + properties.nameSpace.attribute + ']')
                            for (var i = 0; i < _e.length; i++) {
                                foo(_e[i], 'element')
                            }
                            var val = document.createTreeWalker(e, NodeFilter.SHOW_COMMENT, null, false),
                                d;
                            while (d = val.nextNode()) {
                                if (d.parentNode) {
                                    foo(d)
                                }
                            }
                        }
                    } else {
                        var val = document.createTreeWalker(e, NodeFilter.SHOW_COMMENT, null, false),
                            d;
                        while (d = val.nextNode()) {
                            if (d.parentNode) {
                                foo(d)
                            }
                        }
                    }
                }
                e = undefined
            }, document)
        },
        re_entries: function (node) {
            for (var i = node.__children__.length - 1; i >= 0; i--) {
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
            node = undefined
        },
        type_entries: function (node, data, i) {
            if (data instanceof NodeList || data instanceof Array) {
                for (var i = 0; i < data.length; i++) {
                    properties.type_entries(node, data[i], i)
                }
                return
            } else if (data instanceof Node) {
                data = data.cloneNode(true)
            }
            if (!(data instanceof Node)) {
                data = document.createTextNode(data)
            }
            if (!i) {
                node.innerHTML = ''
                node.value = ''
            }
            if (node instanceof HTMLTitleElement) {
                node.innerText += data.textContent
            } else if (node instanceof HTMLInputElement) {
                node.value += data.textContent
            } else if (node.hasOwnProperty('src')) {
                node.src = data.textContent
            } else if (node instanceof HTMLLinkElement) {
                node.href = data.textContent
            } else {
                node.appendChild(data)
            }
            node = data = undefined
        },
        entries: function (node, data, ch, cloned, x_data) {
            if (data['[[man-formed]]']) {
                properties.console.warn('unstable handler for type Promise', data)
            } else if (data instanceof DocumentFragment) {
                properties.entries(node, data.cloneNode(true).childNodes, ch, true)
                x_data = node = data = undefined
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
                x_data = node = data = undefined
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
                elm = undefined
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
                x_data = undefined;
            } else {
                if (node.target_child.nextSibling) {
                    node.parentElement.insertBefore(data, node.target_child.nextSibling)
                } else {
                    node.parentElement.appendChild(data)
                }
            }
            node.target_child = data
            data = node = undefined
        },
        stringtolist: function (e) {
            var elm = arguments.callee.elm.cloneNode()
            elm.innerHTML = e;
            return elm.childNodes
        },
        exacute_data: function (e) {

        },
        observer_callback: function (e, type) {
            var node,
                data;
            if (type) {
                if (!e.getAttribute) {
                    return
                }
                e.data = e.getAttribute(properties.nameSpace.attribute)
                if (!e.data) {
                    return
                }
                node = e
                data = e.data;
            } else {
                node = document.createTextNode('')
                e._node = node
                e.parentElement.replaceChild(node, e)
                node.__children__ = []
                data = e.data.substring(1, e.data.length - 1)
            }



            data = data.trim().split(/\s/)
            node.__data__ = data[0].trim().toLowerCase()

            if (node.__data__ === e.parent_data) {
                return properties.console.error('map stack limit reached.', node.__data__)
            }

            node.__data__ = node.__data__.split(':')
            data = data[1];
            if (data && !type) {
                data = data.trim()
                if ('#'.includes(data[0])) {
                    data = document.querySelector(data) || document.createTextNode('');
                    data = data.content || data
                } else {
                    data = properties.stringtolist(data)
                }
                if (!((e = properties.store[node.__data__[0]]) && (e = e.events) && (e = e.has(node.__data__[1])))) {
                    node.target_child = node;
                    properties.entries(node, data, 0, true)
                }
            }

            data = e = undefined;

            properties.events.on(node.__data__[0], function () {
                arguments[0].on(node.__data__[1], function () {
                    if (!arguments[0] && typeof arguments[0] !== 'string') {
                        arguments[0] = ''
                    }
                    if (type) {
                        properties.type_entries(node, arguments[0])
                    } else {
                        node.target_child = node;
                        properties.entries(node, arguments[0])
                    }
                })
            })
            return node
        },
        console: console,
        store: {}
    }
    properties.stringtolist.elm = document.createElement('x');
    properties.events = properties.Event('router', {})
    properties.observer(properties.observer_callback, document);

    window.RouteJs = function (name, data) {
        if (typeof name !== "string") {
            return properties.console.error('string expected, but ' + typeof name + ' provided', name, data)
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
        this.useTemplate = function (template) {
            if (template instanceof HTMLTemplateElement) {
                return template.content.childNodes
            } else {
                return null
            }
        }
        this.mapAll(data)
        properties.events.emit(name, store.events)
    }
    RouteJs.initExtention = function () {}
})()