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

/**
 * @problem pending
 * @todo handle HTMLCollection and Array just like NodeList
 * @properties <\> @entries
 */

/**
 * @problem pending
 * @todo prevent node re-occurance (same repaint)
 * @properties <\> @observer_callback @on
 */
//DOMActivate

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
        String.prototype.includes = function () {
            return this.match(arguments[0]) ? true : false;
        }

        var DOMOBserver = window.document.createEvent("Event");
        DOMOBserver.initEvent("DOMNodeInserted", true, true)
        document.documentElement.dispatchEvent(DOMOBserver)
        setInterval(function () {
            document.documentElement.dispatchEvent(DOMOBserver)
        }, 500)
    }


    var properties = {
            use_attributes: true,
            nameSpace: {
                attribute: 'route',
                offline: 'still_offline',
                element_flag: 'element'
            },
            APPPromise: function () {
                this.data = arguments[0]
                this.placeholder = arguments[1]
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
            getEvent: function () {
                var ev = properties.store[arguments[0]];
                //    (ev&&(ev=ev.events)&&(ev=ev.get(arguments[0][1])))
                (ev && (ev = ev.events))
                return ev
            },
            isPending: function () {
                var ev = properties.store[arguments[0]];
                if (!ev) {
                    return true
                } else {
                    return ev.pending
                }
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
                        if (properties.use_attributes) {
                            if (e.hasAttribute(properties.nameSpace.attribute)) {
                                foo(e, properties.nameSpace.element_flag)
                            } else {
                                var _e = e.querySelectorAll('[' + properties.nameSpace.attribute + ']')
                                for (var i = 0; i < _e.length; i++) {
                                    foo(_e[i], properties.nameSpace.element_flag)
                                }
                                var val = document.createTreeWalker(e, NodeFilter.SHOW_COMMENT, null, false),
                                    d;
                                while (d = val.nextNode()) {
                                    foo(d)
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
                        if (node.__children__[i]._points_to) {
                            properties.re_entries(node.__children__[i]._points_to)
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
                    data = '';
                } else if (data instanceof DocumentFragment) {
                    if (cloned) {
                        properties.entries(node, data.childNodes, ch, true)
                    } else {
                        properties.entries(node, data.cloneNode(true).childNodes, ch, true)
                    }
                    x_data = node = data = undefined
                    return
                } else if (data instanceof NodeList /*|| data instanceof Array || data instanceof HTMLCollection*/ ) {
                    if (cloned) {
                        for (var i = 0; data.length > 0; i++) {
                            if (data[0] instanceof Element) {
                                var val = document.createTreeWalker(data[0], NodeFilter.SHOW_COMMENT, null, false),
                                    d;
                                while (d = val.nextNode()) {
                                    if (d.data[0] + d.data[d.data.length - 1] === '??') {
                                        d.parent_data = node.__data__.join(':')
                                        // properties.observer_callback(d,node)
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
                                        d.parent_data = node.__data__.join(':')
                                        // properties.observer_callback(d,node)
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
                    var ev = properties.store[node.__data__[0]]
                    if (ev) {
                        node.pending = 1
                        data.then(function () {
                            node.pending = 0
                            ev.events.emit(node.__data__[1], arguments[0])
                            ev = node = x_data = data = undefined
                        });
                    }
                    return
                } else if (data instanceof properties.APPPromise) {
                    var ev = properties.store[node.__data__[0]]
                    if (ev) {
                        properties.entries(node, data.placeholder, ch, cloned, x_data)
                        // ev.events.emit(node.__data__[1], data.placeholder)
                        node.pending = 1
                        data.data.then(function () {
                            node.pending = 0
                            ev.events.emit(node.__data__[1], arguments[0])
                            ev = node = x_data = data = undefined
                        });
                    }
                    // properties.console.warn('unstable handler for type Promise', data)
                    // var elm = document.createTextNode("")
                    // data.then(function (e) {
                    //     properties.entries(node, arguments[0], true, cloned, elm)
                    // });
                    // data = elm
                    // elm = undefined
                    return
                }

                if (data instanceof Comment) {
                    data.parent_data = node.__data__.join(':')
                }

                if (!(data instanceof Node)) {
                    data = document.createTextNode(data)
                }

                if (!ch && !x_data) {
                    properties.re_entries(node)
                    node.__children__ = []
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
                node.__children__.push(node.target_child = data)
                ev = data = node = undefined
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
                if (type === properties.nameSpace.element_flag) {
                    if (!e.getAttribute) {
                        return
                    }
                    e.data = e.getAttribute(properties.nameSpace.attribute)
                    e.removeAttribute(properties.nameSpace.attribute)
                    if (!e.data) {
                        return
                    }
                    node = e
                    data = e.data;
                } else {
                    if (type instanceof Node) {
                        node = type
                    } else {
                        node = document.createTextNode('')
                        node.pending = 0
                    }

                    if (type !== properties.nameSpace.offline) {
                        e._points_to = node
                        e.parentElement.replaceChild(node, e)
                    }

                    type = undefined
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
                        data = document.querySelector(data);
                        if (data) {
                            if (data.content) {
                                data = data.content
                                data = data.cloneNode(true)
                            } else {
                                data = data.childNodes
                            }
                        } else {
                            data = document.createTextNode('')
                        }
                    } else {
                        data = properties.stringtolist(data)
                        data.exeception = true
                    }
                    if (!((e = properties.store[node.__data__[0]]) && (e = e.events) && (e = e.has(node.__data__[1])))) {
                        node.target_child = node;
                        if (data instanceof NodeList && !data.exeception) {
                            properties.entries(node, data, 0)
                        } else {
                            properties.entries(node, data, 0, true)
                        }
                    }
                }

                data = e = undefined;

                properties.events.on(node.__data__[0], function () {
                    arguments[0].on(node.__data__[1], function () {
                        if (node.pending) {
                            return;
                        }
                        if (!arguments[0] && typeof arguments[0] !== 'string') {
                            arguments[0] = ''
                        }
                        if (type === properties.nameSpace.element_flag) {
                            properties.type_entries(node, arguments[0])
                        } else {
                            node.target_child = node;
                            properties.entries(node, arguments[0])
                        }
                    })
                })
                // return node
            },

            console: console,
            store: {}
        },
        RouteJsCore = function () {

            this.map = function (name, data) {
                if (typeof name !== "string") {
                    return properties.console.error('invalid argument @map', name, data)
                }
                name = name.toLowerCase().trim()
                // if (!store.keys.hasOwnProperty(name)) {
                //     store.keys[name]=[]
                // }
                if (properties.store.hasOwnProperty(this.name)) {
                    properties.store[this.name].events.emit(name, data)
                }
            }
            this.mapAll = function (object) {
                if (typeof object === 'object') {
                    for (var key in object) {
                        this.map(key, object[key])
                    }
                } else {
                    return properties.console.error('invalid argument @mapAll', object)
                }
            }

            this.createNodeList = function (string) {
                return properties.stringtolist(string)
            }
            this.createPromise = function (promise, placeholder) {
                return {
                    data: promise,
                    placeholder: placeholder,
                    "[[man-formed]]": true
                }
            }
            this.useTemplate = function (template) {
                if (!window.HTMLTemplateElement) {
                    if (template instanceof Element) {
                        return template.childNodes
                    }
                    return template
                }
                if (template instanceof HTMLTemplateElement) {
                    return template.content.childNodes
                } else {
                    return null
                }
            }
            this.usePromise = function () {
                return new properties.APPPromise(arguments[0], arguments[1])
            }
        }

    properties.stringtolist.elm = document.createElement('x');
    properties.events = properties.Event('router', {})
    properties.observer(properties.observer_callback, document);

    window.RouteJs = function (name, object) {
        if (typeof name !== "string") {
            return properties.console.error('string expected, but ' + typeof name + ' provided', name, object)
        }
        name = name.toLowerCase().trim()
        this.name=name

        if (properties.store.hasOwnProperty(name)) {
            return;
        }

        var store = (properties.store[name] = {
            events: properties.Event(name, {}),
            items: this
        })
        
        Object.freeze(this)
        this.mapAll(object)
        object=undefined
        properties.events.emit(this.name, store.events)
    }

    RouteJs.prototype = new RouteJsCore()
    RouteJs.initExtention = function () {}
})()