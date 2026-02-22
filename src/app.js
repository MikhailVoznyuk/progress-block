import { ToggleButton } from "./components/ToggleButton.js";
import { InputField } from "./components/InputField.js";
import { createEl } from "./shared/utils/createEl.js";
import { clampPercent } from "./shared/utils/clampPercent.js";

class App {
    constructor(root) {
        this.root = root;
        this.state = {
            value: 0,
            animating: false,
            hidden: false
        }
        
        this._buildLayout();
        this._mountComponents();
    }

    setValue(value) {
        if (value === null) return;

        this.state.value = clampPercent(value);
        // обновить стейт Progress
        this._syncUI();
    }

    setAnimating(animating) {
        this.state.animating = !!animating;
        
        // обновить стейт Progress
        this._syncUI();
    }

    setHidden(hidden) {
        this.state.hidden = !!hidden;

        // обновить стейт Progress
        this._syncUI();
    }

    destroy() {
        this.root.textContent = '';

        //Дальнейшая очистка компонентов
    }

   

    _buildLayout() {
        const appTop = createEl('div', 
            {className: 'app__top'},
            createEl('h1', 
                {className: 'app__label'},
                'Progress'
            )
        );

        const progressSlot = createEl(
            'div', 
            {
                className: 'app__col',
                data: {'slot': 'progress'}
            }
        )

        const controlsSlot = createEl(
            'div', 
            {
                className: 'app__col',
                data: {'slot': 'controls'}
            }
        )

        const appBody = createEl('div', 
            {className: 'app__body'},
            progressSlot, 
            controlsSlot
        )

        const layout = createEl('section',
            {
                className: 'app'
            },
            appTop, 
            appBody
        )

        this.progressSlotEl = progressSlot;
        this.controlsSlotEl = controlsSlot;

        this.root.appendChild(layout);
    }

    _mountComponents() {
        this.valueInput = InputField({
            value: this.state.value,
            label: 'Value',
            min: 0,
            max: 100,
            onInput: (value) => this.setValue(value)
        });

        this.animatedToggle = ToggleButton({
            checked: this.state.animating,
            label: 'Animate',
            onChange: (animating) => this.setAnimating(animating)
        });

        this.hiddenToggle = ToggleButton({
            checked: this.state.hidden,
            label: 'Hidden',
            onChange: (hidden) => this.setHidden(hidden)
        });

        this.valueInput.mount(this.controlsSlotEl);
        this.animatedToggle.mount(this.controlsSlotEl);
        this.hiddenToggle.mount(this.controlsSlotEl);
    }

     _syncUI() {
        console.log(this.state.animating)
        this.valueInput.setValue(this.state.value);
        this.animatedToggle.setChecked(this.state.animating);
        this.hiddenToggle.setChecked(this.state.hidden);
    }
}

export {App};