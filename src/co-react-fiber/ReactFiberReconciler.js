import { createFiber } from "./createFiber"
import { isStr } from "./utils"

export function updateHostComponent(wip) {
    // 更新自己
    if(!wip.stateNode) {
        wip.stateNode = document.createElement(wip.type)
        // 属性
    }
    // 协调子节点
    reconileChildren(wip, wip.props.children)
    console.log('wip', wip)
}

function reconileChildren(returnFiber, children) {
    if(isStr(children)) {
        return
    }
    const newChildren = Array.isArray(children) ? children : [children]
    let previousNewsFiber = null
    for(let i = 0; i < newChildren.length; i ++) {
        const newChild = newChildren[i]
        const newFiber = createFiber(newChild, returnFiber)
        if(previousNewsFiber === null) {
            returnFiber.child = newFiber
        } else {
            previousNewsFiber.sibling = newFiber
        }
    }
}