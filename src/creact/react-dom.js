function render(vnode, container) {
    const fiberRoot = {
        type: container.nodeName.toLocaleLowerCase(),
        props: {children: vnode},
        stateNode: container,
    }
}

export default { render }