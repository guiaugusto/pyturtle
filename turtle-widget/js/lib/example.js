var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');
var turtle = require('../node_modules/turtle-component');

// See example.py for the kernel counterpart to this file.


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var TurtleModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'TurtleModel',
        _view_name : 'TurtleView',
        _model_module : 'turtle-widget',
        _view_module : 'turtle-widget',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0'
    })
});


// Custom View. Renders the widget model.
var TurtleView = widgets.DOMWidgetView.extend({
    // Defines how the widget gets rendered into the DOM
    render: function() {
        this.create_canvas();
        this.turtle = this.canvas.getTurtle();

        this.set_turtle();

        this.model.on('change:command', this.execute, this);
    },

    create_canvas: function() {
        // console.log('create canvas');

        this.canvas = new turtle.TurtleComponent(this.el);
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.canvas.canvasStyle = 'border: solid 1px black; position: absolute !important;';
        this.canvas.initializeCanvas(this.el);

        this.set_canvas();
    },

    execute: function() {
        // console.log('execute canvas');
        // console.log(this.model.get('command'));
        this.command = this.model.get('command');

        if (this.command.function_name) {
            // console.log(this.command.function_name);
            this.run();
            this.model.set('command', {});
            this.model.save_changes();
        }
    },

    set_canvas: function() {
        // console.log('set_canvas');
        this.model.set('canvas', { 'element': this.canvas });
        this.model.save_changes();
    },

    set_turtle: function() {
        // console.log('set_turtle');
        this.model.set('turtle', { 'element': this.turtle });
        this.model.save_changes();
    },

    get_canvas: function() {
        // console.log('get_canvas');
        let canvas = this.model.get('canvas');

        if (canvas) return canvas.element;
    },

    get_turtle: function() {
        // console.log('get_turtle');
        let turtle = this.model.get('turtle');

        if (turtle) return turtle.element;
    },

    run: function() {
        // console.log('run forward');

        if (this.turtle) {
            this.turtle[this.command['function_name']](...this.command['args']);
            this.set_turtle();
            this.model.save_changes();
        }
    },

});


module.exports = {
    TurtleModel: TurtleModel,
    TurtleView: TurtleView
};
