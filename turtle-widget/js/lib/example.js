var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');
var turtleComponent = require('../node_modules/turtle-component');

var TurtleCanvasModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'TurtleCanvasModel',
        _view_name : 'TurtleCanvasView',
        _model_module : 'turtle-widget',
        _view_module : 'turtle-widget',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0'
    })
});

var TurtleCanvasView = widgets.DOMWidgetView.extend({
    render: function() {
        this.turtles = {};
        this.create_canvas();

        this.model.on('change:command', this.execute, this);
        this.model.on('change:last_turtle', this.create_turtle, this);
    },

    create_turtle: function() {
        let turtle = this.model.get('last_turtle');

        if (Number.isInteger(turtle.id)) this.turtles[turtle.id] = this.canvas.getTurtle();
    },

    create_canvas: function() {
        let backgroundCanvas = document.createElement('canvas');
        this.canvas = new turtleComponent.TurtleComponent();

        this.canvas.width = this.model.get('width');
        this.canvas.height = this.model.get('height');

        backgroundCanvas.setAttribute('width', this.canvas.width);
        backgroundCanvas.setAttribute('height', this.canvas.height);

        this.canvas.canvasStyle = this.model.get('canvas_style');
        this.canvas.spriteScale = this.model.get('sprite_scale');
        this.canvas.initializeCanvas(this.el);
        this.el.appendChild(backgroundCanvas);

        this.set_canvas();
    },

    set_canvas: function() {
        this.model.set('canvas', { 'element': this.canvas });
        this.model.save_changes();
    },

    set_turtle: function() {
        this.model.set('turtle', { 'element': this.turtle });
        this.model.save_changes();
    },

    get_canvas: function() {
        let canvas = this.model.get('canvas');

        if (canvas) return canvas.element;
    },

    get_turtle: function() {
        let turtle = this.model.get('turtle');

        if (turtle) return turtle.element;
    },

    execute: function () {
        this.command = this.model.get('command');

        if (this.command.function_name) {
            this.run();
            this.model.set('command', {});
            this.model.save_changes();
        }
    },

    run: function () {
        let turtle_id = this.command.turtle_id;
        let turtle = this.turtles[turtle_id];

        if (turtle) {
            turtle[this.command['function_name']](...this.command['args']);
            this.set_turtle();
            this.model.save_changes();
        }
    },
});

module.exports = {
    TurtleCanvasModel: TurtleCanvasModel,
    TurtleCanvasView: TurtleCanvasView
};
