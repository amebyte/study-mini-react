let tashQueue = []
let deadline = 0
let yieldInterval = 5

export function scheduleCallback(callback) {
    const newTask = {callback}
    tashQueue.push(newTask)
}

function flushWork() {
    deadline = getCurrentTime() + yieldInterval;
    let currentTask = tashQueue[0]
    while(currentTask) {
        currentTask.callback()
        tashQueue.shift()
        currentTask = tashQueue[0]
    }
}

export function shouldYield() {
    return getCurrentTime() >= deadline
}

export function getCurrentTime() {
    return performance.now()
}