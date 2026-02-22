export function createEl(tag, props, ...children) {
    const el = document.createElement(tag);

    for (const [key, value] of Object.entries(props)) {
        if (!value) continue;

        if (key === 'class' && typeof(value) === 'string') {
            el.className = value;
        } else if (key === 'style' && typeof(value) === 'object') {
            Object.assign(el.style, value)
        } else if (key === 'data' && typeof(value) === 'object') {
            for (const [dataKey, dataValue] of Object.entries(value)) {
                el.dataset[dataKey] = String(dataValue);
            }
        } 
        else if (key.startWith('on') && typeof(value) === 'function') {
            el.addEventListener(key.slice(2), value);
        }
    }

    const addChild = (child) => {
        if (!child) return;

        if (Array.isArray(child)) {
            item.forEach(addChild);
        } else if (child.instanceOf(Node)) {
            el.appendChild(child);
        }
    }

    addChild(children)
    return el;
}