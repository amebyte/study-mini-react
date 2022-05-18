import { updateHostComponent } from "./ReactFiberReconciler";
import { isStringOrNumber } from "./utils";

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
    if(isStringOrNumber) {
        updateHostComponent()
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
    }
}

requestIdleCallback(workLoop)