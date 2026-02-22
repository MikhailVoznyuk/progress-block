export function createEl(tag, props, ...children) {
    const el = document.createElement(tag);
    if (props) {
        for (const [key, value] of Object.entries(props)) {
            if (value === null || value === undefined || value === false) continue;

            if (key === 'className' && typeof(value) === 'string') {
                el.className = value;
            } else if (key === 'style' && typeof(value) === 'object') {
                Object.assign(el.style, value)
            } else if (key === 'data' && typeof(value) === 'object') {
                for (const [dataKey, dataValue] of Object.entries(value)) {
                    el.dataset[dataKey] = String(dataValue);
                }
            } else if (key.startsWith('on') && typeof(value) === 'function') {
                el.addEventListener(key.slice(2).toLowerCase(), value);
            } else {
                if (key in el) {
                    el[key] = value;
                } else {
                    el.setAttribute(key, String(value))
                }
            }
    }
    }

    const addChild = (child) => {
        if (child === null || child === undefined || child === false) return;

        if (Array.isArray(child)) {
            child.forEach(addChild);
        } else if (child instanceof Node) {
            el.appendChild(child);
        } else if (typeof(child) === 'string' || typeof(child) === 'number') {
            el.appendChild(document.createTextNode(String(child)));
        } else {
             throw new Error('Unexpected type of child')
        } 
    }

    children.forEach(addChild);
    return el;
}