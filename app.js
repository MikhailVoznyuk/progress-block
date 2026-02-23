import { ToggleButton } from "./components/ToggleButton.js";
import { InputField } from "./components/InputField.js";
import { Progress } from "./components/Progress.js";
import { createEl } from "./shared/utils/createEl.js";
import { clampPercent } from "./shared/utils/clampPercent.js";

class App {
    constructor(root) {
        this.root = root;
        this.state = {
            progress: 0,
            animating: false,
            hidden: false
        }
        
        this._buildLayout();
        this._mountComponents();
    }

    setProgress(progress) {
        if (progress === null) {
            progress = 0;
        }

        this.state.progress = clampPercent(progress);
        this.progressBlock.setProgress(this.state.progress);
        this._syncControls();
    }

    setAnimating(animating) {
        this.state.animating = !!animating;
        this.progressBlock.setAnimating(this.state.animating);
        this._syncControls();
    }

    setHidden(hidden) {
        this.state.hidden = !!hidden;
        this.progressBlock.setHidden(this.state.hidden);
        this._syncControls();
    }

    destroy() {
        this.root.textContent = '';
        this.progressBlock.destroy();
        this.progressInput.destroy();
        this.animatedToggle.destroy();
        this.hiddenToggle.destroy();
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
                className: 'app__controls',
                data: {'slot': 'controls'}
            }
        )

        const appBody = createEl('div', 
            {className: 'app__body'},
            progressSlot, 
            createEl('div',
                {className: 'app__col'},
                controlsSlot
            )   
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

        this.progressBlock = new Progress({
            value: this.state.progress,
            animating: this.state.animating,
            hidden: this.state.hidden,
        });

        this.progressInput = InputField({
            progress: this.state.progress,
            label: 'Value',
            min: 0,
            max: 100,
            onInput: (progress) => this.setProgress(progress)
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

        this.progressBlock.mount(this.progressSlotEl);
        this.progressInput.mount(this.controlsSlotEl);
        this.animatedToggle.mount(this.controlsSlotEl);
        this.hiddenToggle.mount(this.controlsSlotEl);
    }

     _syncControls() {
        this.progressInput.setValue(this.state.progress);
        this.animatedToggle.setChecked(this.state.animating);
        this.hiddenToggle.setChecked(this.state.hidden);
    }
}

export {App};