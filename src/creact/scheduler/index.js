let tashQueue = []
let timerQueue = []
let deadline = 0
let yieldInterval = 5

export function scheduleCallback(callback) {
    const newTask = {callback}
    tashQueue.push(newTask)
    schedule(flushWork)
}

function schedule(callback) {
    timerQueue.push(callback)
    postMessage()
}

const postMessage = () => {
    const {port1, port2} = new MessageChannel()
    port1.onmessage = () => {
        let tem = timerQueue.splice(0, timerQueue.length)
        tem.forEach(c => c())
    }
    port2.postMessage(null)
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