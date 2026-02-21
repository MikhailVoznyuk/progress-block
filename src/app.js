export class App {
    consturctor(root) {
        this.root = root;
        this.state = {
            value: 0,
            animating: false,
            hidden: false
        }
        
        this._buildLayout();
        this._mountCompomponents()
    }

    setValue(value) {
        this.state.value = _clamp(value);
        // обновить стейт Progress
    }

    setAnimating(animating) {
        this.state.animating = !!animating;
        // обновить стейт Progress
    }

    setHidden(hidden) {
        this.state.hidden = !!hidden;
    }

    _buildLayout() {
        // Сборка layout приложения
    }

    _mountCompomponents() {
        // Монтирование прогресса и тогглеров в layout
    }

    _clamp(p) {
        if (!Number.isFinite(p)) {
            return 0;
        }

        return Math.max(0, Math.min(p, 100));
    } 
}