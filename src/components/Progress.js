import { createEl } from "../shared/utils/createEl.js";
import { clampPercent } from "../shared/utils/clampPercent.js";

class Progress {
    constructor({progress = 0, animating = false, hidden = false, size = 120, stroke = 10}) {
        // clamp уже используется в App, но дублируется здесь на случай если компонент будет использоваться вне App
        this.progress = clampPercent(progress);
        this.animating = !!animating;
        this.hidden = !!hidden;

        this.size = size;
        this.stroke = stroke; 

        const ring = createEl('div', {className: 'progress__ring'});
        const center = createEl('div', {className: 'progress__center'});

        this.el = createEl(
            'div',
            {className: 'progress'},
            ring,
            center
        );
        this.ring = ring;
        this.center = center;

        this.el.style.setProperty('--size', `${this.size}px`);
        this.el.style.setProperty('--stroke', `${this.stroke}px`);

        this.setProgress(this.progress);
        this.setAnimating(this.animating);
        this.setHidden(this.hidden);
    }

    setProgress(progress) {
        // clamp здесь по той же причине что и в конструкторе
        this.progress = clampPercent(progress);
        console.log(this.progress);
        this.ring.style.setProperty('--p', String(this.progress));
    }

    setAnimating(animating) {
        this.animating = !!animating;
        this.el.classList.toggle('progress--animated', !!this.animating);
    }

    setHidden(hidden) {
        this.hidden = !!hidden;
        this.el.classList.toggle('progress--hidden', !!this.hidden)
    }

    mount(container) {
        if (!container) return;
        container.appendChild(this.el);
    }

    destroy() {
        this.el?.remove();
        this.el = null;
        this.ring = null;
        this.center = null;
    }
}

export {Progress}