import { createFiber } from "./createFiber"
import { isArray, isStringOrNumber, Update } from "./utils"

function deleteChild(returnFiber, childToDelete) {
    if(returnFiber.deletions) {
        returnFiber.deletions.push(childToDelete)
    }else{
        returnFiber.deletions = [childToDelete]
    }
}

export function reconcileChildren(returnFiber, children) {
    if(isStringOrNumber(children)) {
        return
    }
    const newChildren = isArray(children) ? children : [children]

    let previousNewFiber = null
    let oldFiber = returnFiber.alternate && returnFiber.alternate.child
    for(let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        if(newChild === null) {
            continue
        }
        const newFiber = createFiber(newChild, returnFiber)
        const same = sameNode(newFiber, oldFiber)
        if(same) {
            Object.assign(newFiber, {
                alternate: oldFiber,
                flags: Update,
                stateNode: oldFiber.stateNode
            })
        }

        if(!same && oldFiber) {
            deleteChild(returnFiber, oldFiber)
        }

        if(oldFiber) {
            oldFiber = oldFiber.sibling
        }

        if(previousNewFiber === null) {
            returnFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }

        previousNewFiber = newFiber
    }

}

function sameNode(a, b) {
    return a && b && a.key===b.key && a.type===b.type
}