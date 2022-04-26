import { createFiber } from "./createFiber"
import { isArray, isStringOrNumber, Placement, Update } from "./utils"

function deleteChild(returnFiber, childToDelete) {
    if(returnFiber.deletions) {
        returnFiber.deletions.push(childToDelete)
    }else{
        returnFiber.deletions = [childToDelete]
    }
}

function placeChild(
    newFiber,
    lastPlacedIndex,
    newIndex,
    shouldTrackSideEffects // 初次渲染（false）还是更新（true）
  ) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) {
      return lastPlacedIndex;
    }
    const current = newFiber.alternate;
  
    if (current) {
      const oldIndex = current.index;
      if (oldIndex < lastPlacedIndex) {
        // move
        newFiber.flags = Placement;
        return lastPlacedIndex;
      } else {
        return oldIndex;
      }
    } else {
      newFiber.flags = Placement;
      return lastPlacedIndex;
    }
}

export function reconcileChildren(returnFiber, children) {
    if(isStringOrNumber(children)) {
        return
    }
    const newChildren = isArray(children) ? children : [children]

    let previousNewFiber = null
    let shouldTrackSideEffects = !!returnFiber.alternate
    let oldFiber = returnFiber.alternate && returnFiber.alternate.child
    let nextOldFiber = null
    let lastPlacedIndex = 0
    let newIndex = 0

    // * 1. 找到能复用的节点，如果碰到不能复用的，那就停止
    for(; newIndex < newChildren.length; newIndex++) {
        const newChild = newChildren[newIndex]
        if(newChild === null) {
            continue
        }

        if(oldFiber.index > newIndex) {
            nextOldFiber = oldFiber
            oldFiber = null
        } else {
            nextOldFiber = oldFiber.sibling
        }

        const same = sameNode(newChild, oldFiber)
        if(!same) {
            if(oldFiber === null) {
                oldFiber = nextOldFiber
            }
            break
        }

    }

    if(!oldFiber) {

        for(; newIndex < newChildren.length; newIndex++) {
            const newChild = newChildren[newIndex]
            if(newChild === null) {
                continue
            }
            const newFiber = createFiber(newChild, returnFiber)
            
            lastPlacedIndex = placeChild(
                newFiber,
                lastPlacedIndex,
                newIndex,
                shouldTrackSideEffects // 初次渲染（false）还是更新（true）
            )            
            
            // const same = sameNode(newFiber, oldFiber)
            // if(same) {
            //     Object.assign(newFiber, {
            //         alternate: oldFiber,
            //         flags: Update,
            //         stateNode: oldFiber.stateNode
            //     })
            // }
    
            // if(!same && oldFiber) {
            //     deleteChild(returnFiber, oldFiber)
            // }
    
            // if(oldFiber) {
            //     oldFiber = oldFiber.sibling
            // }
    
            if(previousNewFiber === null) {
                returnFiber.child = newFiber
            } else {
                previousNewFiber.sibling = newFiber
            }
    
            previousNewFiber = newFiber
        }

        return 
    }

}

// export function reconcileChildren(returnFiber, children) {
//     if(isStringOrNumber(children)) {
//         return
//     }
//     const newChildren = isArray(children) ? children : [children]

//     let previousNewFiber = null
//     let oldFiber = returnFiber.alternate && returnFiber.alternate.child
//     for(let i = 0; i < newChildren.length; i++) {
//         const newChild = newChildren[i]
//         if(newChild === null) {
//             continue
//         }
//         const newFiber = createFiber(newChild, returnFiber)
//         const same = sameNode(newFiber, oldFiber)
//         if(same) {
//             Object.assign(newFiber, {
//                 alternate: oldFiber,
//                 flags: Update,
//                 stateNode: oldFiber.stateNode
//             })
//         }

//         if(!same && oldFiber) {
//             deleteChild(returnFiber, oldFiber)
//         }

//         if(oldFiber) {
//             oldFiber = oldFiber.sibling
//         }

//         if(previousNewFiber === null) {
//             returnFiber.child = newFiber
//         } else {
//             previousNewFiber.sibling = newFiber
//         }

//         previousNewFiber = newFiber
//     }

// }

function sameNode(a, b) {
    return a && b && a.key===b.key && a.type===b.type
}