// 更新vnode
// 更新dom

// work in progress  当前正在工作当中的 wip
let wipRoot = null
let nextUnitOfWork = null
export function scheduleUpdateOnFiber(fiber) {
    wipRoot = fiber
    nextUnitOfWork = wipRoot

}

function performUnitOfWork(wip) {
// 1. 更新当前fiber
// 2. 返回下一个要更新的fiber
}

function workLoop(idleDeadline) {

}

requestIdleCallback(workLoop)