import { createEl } from "../shared/utils/createEl.js";

export function InputField({value=0, label='', min=0, max=100, onInput}) {
    const input = createEl('input',
        {
            className: 'app__control field__input',
            type: 'number',
            min: String(min),
            max: String(max),
            step: '1',
            value: String(value)
        }
    )

    const el = createEl('label', 
        {
            className: 'field',
            name: 'number_input'
        },
        input,
        (label) ? createEl('span', {className: 'field__label'}, label) : null
    )

    const parse = (s) => {
        if (s.trim() === '') {
            return null;
        }

        const n = Number(s);
        if (!Number.isFinite(n)) {
            return null;
        }

        return n;
    }

    const handler = () => onInput?.(parse(input.value));
    input.addEventListener('input', handler);

    return {
        el,
        mount(container) {
            container.appendChild(el);
        },
        destroy() {
            input.removeEventListener('input', handler);
            el.remove();
        },
        getValue() {
            return parse(input.value);
        },
        setValue(value) {
            input.value = String(value);
        }
    }
}