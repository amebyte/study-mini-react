import { updateFunctionComponent, updateHostComponent } from "./ReactFiberReconciler";
import { isFn, isStringOrNumber } from "./utils";

// 更新vnode
// 更新dom
let wipRoot = null;
let nextUnitOfWork = null;
export function scheduleUpdateOnFiber(fiber) {
    wipRoot = fiber;
    nextUnitOfWork = fiber;
}

function performUnitOfWork(wip) {
    const { type } = wip
    // 1. 更新当前 fiber
    if(isStringOrNumber(type)) {
        updateHostComponent(wip)
    } else if(isFn(type)) {
        updateFunctionComponent(wip)
    }
    // 2. 返回下一个要更新的fiber
    // 深度优先
    if (wip.child) {
        return wip.child
    }

    while(wip) {
        if(wip.sibling) {
            return wip.sibling
        }
        wip = wip.return
    }

    return null;
}

function workLoop(IdleDeadline) {
    while(nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    if(!nextUnitOfWork && wipRoot) {
        // vnode 更新完了
        commitRoot()
    }
}

requestIdleCallback(workLoop)

function commitRoot() {
    commitWorker(wipRoot.child)
}

function commitWorker(wip) {
    if(!wip) {
        return
    }
    // 1. commit 自己
    const { stateNode } = wip
    const parentNode = getParentNode(wip.return)
    if(stateNode) {
        parentNode.appendChild(stateNode)
    }

    // 2. commit child
    commitWorker(wip.child)
    // 3. commit sibling
    commitWorker(wip.sibling)
}

function getParentNode(wip) {
    while(wip) {
        if(wip.stateNode) {
            return wip.stateNode
        }
        wip = wip.return
    }
}