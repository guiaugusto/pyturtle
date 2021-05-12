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
        this._canvas = new turtle.TurtleComponent(this.el);
        this._canvas.width = 400;
        this._canvas.height = 400;
        this._canvas.canvasStyle = 'border: solid 1px black; position: absolute !important;';
        this._canvas.initializeCanvas(this.el);

        // Observe changes in the value traitlet in Python, and define
        // a custom callback.
        // this.model.on('change:value', this.value_changed, this);
    },

});


module.exports = {
    TurtleModel: TurtleModel,
    TurtleView: TurtleView
};
