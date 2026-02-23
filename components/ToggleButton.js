import { createEl } from "../shared/utils/createEl.js"

export function ToggleButton({checked=false, label='',  onChange}) {

    const input = createEl('input',
        {
            className: 'toggle__input',
            type: 'checkbox',
            checked: !!checked,
            name: 'toggler'
        }
    )

    const handler = () => onChange?.(input.checked);
    input.addEventListener('change', handler);

    const el = createEl('label', 
        {className: 'app__control toggle'},
        input,
        createEl('span', {className: 'toggle__slider'}),
        (label) ? createEl('span', {className: 'toggle__label'}, label) : null
    )

    return {
        el,
        mount(container) {
            container.appendChild(el);
        },
        destroy() {
            input.removeEventListener('change', handler);
            el.remove();
        },
        getChecked() {
            return input.checked;
        },
        setChecked(checked) {
            input.checked = !!checked;
        }
    }
}