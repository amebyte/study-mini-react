import { isStr } from './utils'
import { updateHostComponent } from './ReactFiberReconciler'
// 更新vnode
// 更新dom
// work in progress 当前正在工作当中的 wip
let wipRoot = null;
let nextUnitOfWork = null;
export function scheduleUpdateOnFiber(fiber) {
    wipRoot = fiber
    nextUnitOfWork = wipRoot
}

function performUnitOfWork(wip) {
    // 1. 更新当前fiber
    const { type } = wip
    
    if(isStr(type)) {
        updateHostComponent(wip)
    }

    // 2. 返回下一个更新的fiber
    // 深度优先
    if(wip.child) {
        return wip.child
    }

    while(wip){
        if(wip.sibling) {
            return wip.sibling
        }

        wip = wip.return
    }

    return null
}

function workLoop(IdleDeadline) {
    while(nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    if(!nextUnitOfWork && wipRoot) {
        // vnode更新完了
        commitRoot()
    }
}

requestIdleCallback(workLoop)

function commitRoot() {
    commitWork(wipRoot.child)
}

function commitWork(wip) {
    if(!wip) {
        return
    }
    // 1. commit 自己
    const { stateNode } = wip
    let parentNode = wip.return.stateNode
    if(stateNode) {
        parentNode.appendChild(stateNode)
    }
    // 2. commit child
    commitWork(wip.child)
    // 3. cmmit sibling
    commitWork(wip.sibling)
}