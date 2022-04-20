import { createFiber } from "./createFiber"
import { isArray, isStr, updateNode } from "./utils"

export function updateHostComponent(wip) {
    // 更新自己
    // 协调子节点
    if(!wip.stateNode) {
        wip.stateNode = document.createElement(wip.type)
        // 属性
        updateNode(wip.stateNode, wip.props)
    }

    // 协调子节点
    reconcileChildren(wip, wip.props.children)
    console.log('wip', wip)
}

function reconcileChildren(returnFiber, children) {
    if(isStr(children)) {
        return
    }
    const newChildren = isArray(children) ? children : [children]

    let previousNewFiber = null
    for(let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        const newFiber = createFiber(newChild, returnFiber)
        if(previousNewFiber === null) {
            returnFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }

        previousNewFiber = newFiber
    }

}