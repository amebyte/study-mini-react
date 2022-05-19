import { createFiber } from "./createFiber"
import { isArray, isStringOrNumber } from "./utils"

export function updateHostComponent(wip) {
    // 更新自己
    if(!wip.stateNode) {
        wip.stateNode = document.createComment(wip.type)
        // 属性
    }
    // 协调子节点
    reconcileChildren(wip, wip.props.children)
    console.log('wip', wip)
}

function reconcileChildren(returnFiber, children) {
    if(isStringOrNumber(children)) {
        return
    }
    const newChildren = isArray(children) ? children : [children]
    let previousNewFiber = null;
    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        const newFiber = createFiber(newChild, returnFiber)
        if(previousNewFiber === null) {
            returnFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber;
        }

        previousNewFiber = newFiber
    }
}