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
    
}