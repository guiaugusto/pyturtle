import { TurtleComponent } from 'turtle-component';
import * as widgets from '@jupyter-widgets/base';

export class TurtleCanvasModel extends widgets.DOMWidgetModel {
    defaults() {
        return {
            ...super.defaults(),
            _model_name: 'TurtleCanvasModel',
            _view_name: 'TurtleCanvasView',
            _model_module: 'pyturtle',
            _view_module: 'pyturtle',
            _model_module_version: '0.1.0',
            _view_module_version: '0.1.0'
        }
    }
}

export class TurtleCanvasView extends widgets.DOMWidgetView {
    render() {
        this.turtles = {};
        this.create_canvas();

        this.model.on('change:command', this.execute, this);
        this.model.on('change:last_turtle', this.create_turtle, this);
    }

    create_turtle() {
        const turtle = this.model.get('last_turtle');

        if (Number.isInteger(turtle.id)) {
            this.turtles[turtle.id] = this.canvas.createTurtle();
        }
    }

    create_canvas() {
        let backgroundCanvas = document.createElement('canvas');
        this.canvas = new TurtleComponent();

        this.canvas.width = this.model.get('width');
        this.canvas.height = this.model.get('height');

        backgroundCanvas.setAttribute('width', this.canvas.width);
        backgroundCanvas.setAttribute('height', this.canvas.height);

        this.canvas.canvasStyle = this.model.get('canvas_style');
        this.canvas.spriteScale = this.model.get('sprite_scale');
        this.canvas.initializeCanvas(this.el);
        this.el.appendChild(backgroundCanvas);

        this.set_canvas();
    }

    set_canvas() {
        this.model.set('canvas', { 'element': this.canvas });
        this.model.save_changes();
    }

    set_turtle() {
        this.model.set('turtle', { 'element': this.turtle });
        this.model.save_changes();
    }

    get_canvas() {
        let canvas = this.model.get('canvas');

        if (canvas) return canvas.element;
    }

    get_turtle() {
        let turtle = this.model.get('turtle');

        if (turtle) return turtle.element;
    }

    execute() {
        this.command = this.model.get('command');

        if (this.command.function_name) {
            this.run();
            this.command = {};
        }
    }

    run() {
        let turtle_id = this.command.turtle_id;
        let turtle = this.turtles[turtle_id];

        if (turtle) turtle[this.command['function_name']](...this.command['args']);
    }
}
