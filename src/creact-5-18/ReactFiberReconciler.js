import { isArray } from "./utils"

export function updateHostComponent(wip) {
    // 更新自己
    if(!wip.stateNode) {
        wip.stateNode = document.createComment(wip.type)
        // 属性
    }
    // 协调子节点
    reconcileChildren(wip, wip.props.children)
}

function reconcileChildren(returnFiber, children) {
    const newChildren = isArray(children) ? children : [children]
    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        
    }
}