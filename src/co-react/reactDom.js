function render(vnode, container) {
    console.log('vnode', vnode)
    const node = createNode(vnode)

    container.appendChild(node)
}

function isString(s) {
    return typeof s === 'string'
}

function createNode(vnode) {
    let node
    // todo 根据vode生成node
    const {type, props} = vnode
    if(isString(type)) {
        node = document.createElement(type)
        reconcileChildren(node, props.children)
    } else {
        node = document.createTextNode(vnode)
    }
    return node
}

function reconcileChildren(parentNode, children) {
    const newChildren = Array.isArray(children) ? children : [children]
    for(let i = 0; i < newChildren.length; i++) {
        const child = newChildren[i]
        // child是vnode
        // vnode => node，然后插入到container中
        render(child, parentNode)
    }
}

export default { render }
