import { jsPlumbDOMElement} from './element-facade'
import {Dictionary, fastTrim, forEach, isArray, log, PointXY, Size} from "@jsplumb/core"


// These are utility functions for use inside a Browser.

export function matchesSelector (el:jsPlumbDOMElement, selector:string, ctx?:HTMLElement) {
    ctx = (ctx || el.parentNode) as HTMLElement
    let possibles = ctx.querySelectorAll(selector)
    for (let i = 0; i < possibles.length; i++) {
        if (possibles[i] === el) {
            return true
        }
    }
    return false
}

export function consume (e:Event, doNotPreventDefault?:boolean) {
    if (e.stopPropagation) {
        e.stopPropagation()
    }
    else {
        (<any>e).returnValue = false
    }

    if (!doNotPreventDefault && e.preventDefault){
        e.preventDefault()
    }
}

export function findParent(el:jsPlumbDOMElement, selector:string, container:HTMLElement):jsPlumbDOMElement {
    while (el != null && el !== container) {
        if (matchesSelector(el, selector)) {
            return el
        } else {
            el = el.parentNode
        }
    }
}

export function getEventSource(e:Event):jsPlumbDOMElement {
    return (e.srcElement || e.target) as jsPlumbDOMElement
}

function _setClassName (el:Element, cn:string, classList:Array<string>):void {
    cn = fastTrim(cn)

    if (typeof (<any>el.className).baseVal !== "undefined") {
        (<any>el.className).baseVal = cn
    }
    else {
        el.className = cn
    }

    // recent (i currently have  61.0.3163.100) version of chrome do not update classList when you set the base val
    // of an svg element's className. in the long run we'd like to move to just using classList anyway
    try {
        let cl = el.classList
        if (cl != null) {
            while (cl.length > 0) {
                cl.remove(cl.item(0))
            }
            for (let i = 0; i < classList.length; i++) {
                if (classList[i]) {
                    cl.add(classList[i])
                }
            }
        }
    }
    catch(e) {
        // not fatal
        log("JSPLUMB: cannot set class list", e)
    }
}

//
// get the class name for either an html element or an svg element.
function _getClassName (el:Element):string {
    return (<any>el).className != null ? (typeof (<any>el.className).baseVal === "undefined") ? el.className : (<any>el.className).baseVal as string : ""
}

function _classManip(el:Element, classesToAdd:string | Array<string>, classesToRemove?:string | Array<String>) {
    const cta:Array<string> = classesToAdd == null ? [] : isArray(classesToAdd) ? classesToAdd as string[] : (classesToAdd as string).split(/\s+/)
    const ctr:Array<string> = classesToRemove == null ? [] : isArray(classesToRemove) ? classesToRemove as string[] : (classesToRemove as string).split(/\s+/)

    let className = _getClassName(el),
        curClasses = className.split(/\s+/)

    const _oneSet =  (add:boolean, classes:Array<string>) => {
        for (let i = 0; i < classes.length; i++) {
            if (add) {
                if (curClasses.indexOf(classes[i]) === -1) {
                    curClasses.push(classes[i])
                }
            }
            else {
                let idx = curClasses.indexOf(classes[i])
                if (idx !== -1) {
                    curClasses.splice(idx, 1)
                }
            }
        }
    }

    _oneSet(true, cta)
    _oneSet(false, ctr)

    _setClassName(el, curClasses.join(" "), curClasses)
}

export function getClass(el:Element):string { return _getClassName(el); }

export function addClass(el:Element, clazz:string):void {

    if (el != null && clazz != null && clazz.length > 0) {
        if (el.classList) {
            const parts = fastTrim(clazz).split(/\s+/)
            forEach(parts, (part) => {
                el.classList.add(part)
            })
        } else {
            _classManip(el, clazz)
        }
    }
}

export function hasClass(el:Element, clazz:string):boolean {
    if (el.classList) {
        return el.classList.contains(clazz)
    }
    else {
        return _getClassName(el).indexOf(clazz) !== -1
    }
}

export function removeClass(el:Element, clazz:string):void {
    if (el != null && clazz != null && clazz.length > 0) {
        if (el.classList) {
            const parts = fastTrim(clazz).split(/\s+/)
            parts.forEach((part) => {
                el.classList.remove(part)
            })
        } else {
            _classManip(el, null, clazz)
        }
    }
}

export function toggleClass(el:Element, clazz:string):void {
    if (el != null && clazz != null && clazz.length > 0) {
        if (el.classList) {
            el.classList.toggle(clazz)
        }
        else {
            if (this.hasClass(el, clazz)) {
                this.removeClass(el, clazz)
            } else {
                this.addClass(el, clazz)
            }
        }
    }
}

export function createElement(tag:string, style?:Dictionary<any>, clazz?:string, atts?:Dictionary<string>):jsPlumbDOMElement {
    return createElementNS(null, tag, style, clazz, atts)
}

export function createElementNS(ns:string, tag:string, style?:Dictionary<any>, clazz?:string, atts?:Dictionary<string|number>):jsPlumbDOMElement{
    let e = (ns == null ? document.createElement(tag) : document.createElementNS(ns, tag)) as jsPlumbDOMElement
    let i

    style = style || {}

    for (i in style) {
        e.style[i] = style[i]
    }

    if (clazz) {
        e.className = clazz
    }

    atts = atts || {}
    for (i in atts) {
        e.setAttribute(i, "" + atts[i])
    }

    return e
}

export function offsetRelativeToRoot(el:Element):PointXY {
    const box = el.getBoundingClientRect(),
        body = document.body,
        docElem = document.documentElement,
        // (2)
        scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        // (3)
        clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        // (4)
        top  = box.top +  scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft

    return {
        x:Math.round(left),
        y:Math.round(top)
    }
}

export function size(el:HTMLElement):Size {
    return { w:el.offsetWidth, h:el.offsetHeight }
}

