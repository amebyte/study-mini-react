function render(vnode, container) {
    console.log('vnode', vnode)
    const fiberRoot = {
        type: container.nodeName.toLocaleLowerCase(),
        props: {children: vnode},
        stateNode: container
    }
}

export default { render }